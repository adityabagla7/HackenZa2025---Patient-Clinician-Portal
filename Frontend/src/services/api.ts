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

// Add notification interfaces and functions
export interface Notification {
  id: string;
  type: 'new_query' | 'doctor_response';
  timestamp: number;
  relatedId: string;
  text: string;
  isRead: boolean;
}

// Save notifications to localStorage
export const saveNotification = (notification: Notification, forRole: 'doctor' | 'patient') => {
  const storageKey = forRole === 'doctor' ? 'doctorNotifications' : 'patientNotifications';
  try {
    // Get existing notifications
    const existingData = localStorage.getItem(storageKey);
    const notifications: Notification[] = existingData ? JSON.parse(existingData) : [];
    
    // Add new notification
    notifications.unshift(notification);
    
    // Save to localStorage
    localStorage.setItem(storageKey, JSON.stringify(notifications));
    
    // Trigger a custom event so other tabs/windows can be notified
    window.dispatchEvent(new CustomEvent('notifications-updated', { 
      detail: { role: forRole } 
    }));
    
    return true;
  } catch (error) {
    console.error(`Error saving ${forRole} notification:`, error);
    return false;
  }
};

// Get notifications count
export const getUnreadNotificationsCount = (forRole: 'doctor' | 'patient'): number => {
  const storageKey = forRole === 'doctor' ? 'doctorNotifications' : 'patientNotifications';
  try {
    const existingData = localStorage.getItem(storageKey);
    if (!existingData) return 0;
    
    const notifications: Notification[] = JSON.parse(existingData);
    return notifications.filter(n => !n.isRead).length;
  } catch (error) {
    console.error(`Error getting ${forRole} notifications count:`, error);
    return 0;
  }
};

// Mark notification as read
export const markNotificationAsRead = (notificationId: string, forRole: 'doctor' | 'patient'): boolean => {
  const storageKey = forRole === 'doctor' ? 'doctorNotifications' : 'patientNotifications';
  try {
    const existingData = localStorage.getItem(storageKey);
    if (!existingData) return false;
    
    const notifications: Notification[] = JSON.parse(existingData);
    const updatedNotifications = notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, isRead: true } 
        : notification
    );
    
    localStorage.setItem(storageKey, JSON.stringify(updatedNotifications));
    
    // Trigger a custom event
    window.dispatchEvent(new CustomEvent('notifications-updated', { 
      detail: { role: forRole } 
    }));
    
    return true;
  } catch (error) {
    console.error(`Error marking ${forRole} notification as read:`, error);
    return false;
  }
};

// Get all notifications
export const getNotifications = (forRole: 'doctor' | 'patient'): Notification[] => {
  const storageKey = forRole === 'doctor' ? 'doctorNotifications' : 'patientNotifications';
  try {
    const existingData = localStorage.getItem(storageKey);
    if (!existingData) return [];
    
    return JSON.parse(existingData);
  } catch (error) {
    console.error(`Error getting ${forRole} notifications:`, error);
    return [];
  }
};

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
            
            // Create a notification for the patient if the doctor is approving the response
            if (isApproved) {
              const queryText = prompt.text || '';
              const notificationText = `Doctor has verified your query: "${queryText.length > 40 ? queryText.substring(0, 40) + '...' : queryText}"`;
              
              saveNotification({
                id: `notification-${Date.now()}`,
                type: 'doctor_response',
                timestamp: Date.now(),
                relatedId: queryId,
                text: notificationText,
                isRead: false
              }, 'patient');
            }
            
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