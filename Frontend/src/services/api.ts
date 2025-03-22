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
export const updateApprovedResponses = (queryId: string, isApproved: boolean) => {
  console.log(`API: Updating approval status for query ${queryId} to ${isApproved}`);
  
  try {
    // Get current history from localStorage
    const savedPrompts = localStorage.getItem('patientPromptHistory');
    console.log('API: Current saved prompts:', savedPrompts);
    
    if (savedPrompts) {
      const prompts = JSON.parse(savedPrompts);
      
      // Update the specific query's approval status
      const updatedPrompts = prompts.map((prompt: any) => {
        if (prompt.id === queryId) {
          console.log(`API: Updating query ${queryId} approval status from ${prompt.isApproved} to ${isApproved}`);
          return { ...prompt, isApproved: isApproved === true };
        }
        return prompt;
      });
      
      console.log('API: Updated prompt:', updatedPrompts.find((p: any) => p.id === queryId));
      
      // Save back to localStorage - we need to use a temporary variable first
      // to ensure the storage event is fired for different windows/tabs
      const updatedPromptsJson = JSON.stringify(updatedPrompts);
      
      localStorage.removeItem('patientPromptHistory');
      localStorage.setItem('patientPromptHistory', updatedPromptsJson);
      
      console.log('API: Successfully updated localStorage');
      
      // In a real application, this would be sent to the backend via an API call
      return true;
    }
  } catch (error) {
    console.error('Error updating approval status:', error);
  }
  
  return false;
};

export default apiClient; 