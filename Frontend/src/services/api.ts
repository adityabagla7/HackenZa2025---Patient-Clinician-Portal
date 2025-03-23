import axios from 'axios';

// API base URL
const API_URL = 'http://localhost:4000';

// Configure axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interface for patient query history item
export interface QueryHistoryItem {
  id: string;
  text: string;
  timestamp: number;
  aiResponse?: string;
  responseStatus?: 'loading' | 'success' | 'error';
  isApproved?: boolean;
  attachments?: {
    id: string;
    fileName: string;
    fileType: string;
    type: string;
  }[];
}

// Function to get AI-generated response for a patient prompt
export const getAIResponse = async (prompt: string): Promise<string> => {
  try {
    // Updated to match the expected format in the backend
    const response = await apiClient.post('/ai/get-review', { prompt });
    return response.data;
  } catch (error) {
    console.error('Error getting AI response:', error);
    throw error;
  }
};

// Function to share doctor-approved responses with patients
export const updateApprovedResponses = (queryId: string, isApproved: boolean): Promise<boolean> => {
  console.log(`API: Updating verification status for query ${queryId} to ${isApproved ? 'VERIFIED' : 'UNVERIFIED'}, type: ${typeof isApproved}`);
  
  return new Promise((resolve) => {
    try {
      // Get current history from localStorage
      const savedPrompts = localStorage.getItem('patientPromptHistory');
      console.log('API: Current saved prompts:', savedPrompts);
      
      if (savedPrompts) {
        const prompts = JSON.parse(savedPrompts);
        
        // Debug the parsed prompts
        prompts.forEach((prompt: any) => {
          console.log(`API: Prompt ${prompt.id}: isApproved=${prompt.isApproved}, type=${typeof prompt.isApproved}`);
        });
        
        // Find the query that needs updating
        const queryToUpdate = prompts.find((p: any) => p.id === queryId);
        if (!queryToUpdate) {
          console.error(`API: Could not find query with ID ${queryId}`);
          resolve(false);
          return;
        }
        
        console.log(`API: Found query to update:`, queryToUpdate);
        
        // Update the specific query's approval status
        const updatedPrompts = prompts.map((prompt: any) => {
          if (prompt.id === queryId) {
            console.log(`API: Updating query ${queryId} verification status from ${prompt.isApproved ? 'VERIFIED' : 'UNVERIFIED'} to ${isApproved ? 'VERIFIED' : 'UNVERIFIED'}`);
            
            // Create a new object to avoid reference issues
            return { 
              ...prompt, 
              isApproved: isApproved === true, // Strict boolean comparison
              // Preserve edited response if present
              aiResponse: prompt.editedResponse || prompt.aiResponse 
            };
          }
          // For other items, maintain their existing approval status as boolean
          return { ...prompt, isApproved: prompt.isApproved === true };
        });
        
        // Double-check the updated prompt
        const updatedPrompt = updatedPrompts.find((p: any) => p.id === queryId);
        console.log(`API: Verification updated for ${queryId}:`, updatedPrompt);
        console.log(`API: Verification status type: ${typeof updatedPrompt?.isApproved}`);
        
        // Save back to localStorage - we need to use a temporary variable first
        // to ensure the storage event is fired for different windows/tabs
        const updatedPromptsJson = JSON.stringify(updatedPrompts);
        
        localStorage.removeItem('patientPromptHistory');
        localStorage.setItem('patientPromptHistory', updatedPromptsJson);
        
        // Verify the saved data
        const savedData = localStorage.getItem('patientPromptHistory');
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          const savedQuery = parsedData.find((p: any) => p.id === queryId);
          console.log(`API: Verified saved query ${queryId}:`, savedQuery);
          console.log(`API: Saved verification status: ${savedQuery?.isApproved ? 'VERIFIED' : 'UNVERIFIED'}, type: ${typeof savedQuery?.isApproved}`);
          
          // Sort all saved items by timestamp (descending) to verify order
          const sortedQueries = [...parsedData].sort((a, b) => b.timestamp - a.timestamp);
          sortedQueries.forEach((q, index) => {
            console.log(`API: Item ${index}: id=${q.id}, timestamp=${q.timestamp}, isApproved=${q.isApproved}`);
          });
        }
        
        console.log('API: Successfully updated localStorage with new verification status');
        
        // In a real application, this would be sent to the backend via an API call
        resolve(true);
        return;
      }
      
      resolve(false);
    } catch (error) {
      console.error('Error updating verification status:', error);
      resolve(false);
    }
  });
};

export default apiClient; 