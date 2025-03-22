import { useState, useEffect } from 'react'
import {
    FaCalendarAlt,
    FaClipboardList,
    FaClock,
    FaEllipsisV,
    FaPills,
    FaPlus,
    FaSearch,
    FaUser,
    FaReply,
    FaFileAlt,
    FaCommentMedical,
    FaCheck,
    FaEdit,
    FaCheckCircle
} from 'react-icons/fa'
import styled from 'styled-components'
import { useAuth } from '../context/AuthContext'
import { updateApprovedResponses } from '../services/api'

const PageTitle = styled.h1`
  margin-bottom: 2rem;
  color: #2d3748;
`

const Section = styled.section`
  margin-bottom: 3rem;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const StatCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
  display: flex;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`

const StatIcon = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: ${({ color }) => `${color}10`};
  color: ${({ color }) => color};
  border-radius: 0.5rem;
  font-size: 1.5rem;
  margin-right: 1rem;
`

const StatContent = styled.div`
  flex: 1;
`

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
`

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #718096;
`

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #2d3748;
  margin: 0;
`

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
`

const Tab = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  background-color: transparent;
  color: ${({ active }) => (active ? '#3182ce' : '#4a5568')};
  font-weight: ${({ active }) => (active ? '600' : '400')};
  border: none;
  border-bottom: ${({ active }) => (active ? '2px solid #3182ce' : '2px solid transparent')};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    color: #3182ce;
  }
`

const SearchContainer = styled.div`
  position: relative;
  max-width: 300px;
  width: 100%;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 0.625rem 1rem 0.625rem 2.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.3);
  }
`

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
  font-size: 0.875rem;
`

const Card = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`

const TodayScheduleCard = styled(Card)`
  overflow: hidden;
`

const ScheduleHeader = styled.div`
  padding: 1.25rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ScheduleTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
`

const ScheduleDate = styled.div`
  font-size: 0.875rem;
  color: #718096;
`

const AppointmentList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`

const AppointmentItem = styled.div<{ status?: string }>`
  padding: 1.25rem;
  border-bottom: 1px solid #e2e8f0;
  background-color: ${({ status }) => 
    status === 'current' ? '#ebf8ff' : 'white'
  };
  
  &:last-child {
    border-bottom: none;
  }
`

const AppointmentTime = styled.div`
  display: flex;
  align-items: center;
  color: #4a5568;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  
  svg {
    margin-right: 0.5rem;
    font-size: 1rem;
    color: #718096;
  }
`

const AppointmentPatient = styled.div`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: #2d3748;
`

const AppointmentType = styled.div`
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 0.75rem;
`

const AppointmentActions = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
`

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' | 'outline' }>`
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  
  background-color: ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return '#3182ce';
      case 'secondary':
        return '#718096';
      case 'outline':
        return 'transparent';
      default:
        return '#3182ce';
    }
  }};
  
  color: ${({ variant }) => (variant === 'outline' ? '#3182ce' : 'white')};
  border: ${({ variant }) => (variant === 'outline' ? '1px solid #3182ce' : 'none')};
  
  &:hover {
    background-color: ${({ variant }) => {
      switch (variant) {
        case 'primary':
          return '#2b6cb0';
        case 'secondary':
          return '#4a5568';
        case 'outline':
          return '#ebf8ff';
        default:
          return '#2b6cb0';
      }
    }};
  }
`

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  margin-left: 0.5rem;
  background-color: ${({ status }) => {
    switch (status) {
      case 'checked-in':
        return '#38a16920';
      case 'waiting':
        return '#3182ce20';
      case 'no-show':
        return '#e53e3e20';
      default:
        return '#a0aec020';
    }
  }};
  color: ${({ status }) => {
    switch (status) {
      case 'checked-in':
        return '#38a169';
      case 'waiting':
        return '#3182ce';
      case 'no-show':
        return '#e53e3e';
      default:
        return '#a0aec0';
    }
  }};
`

const PatientCard = styled(Card)`
  padding: 1.25rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`

const PatientAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: #4a5568;
  flex-shrink: 0;
`

const PatientInfo = styled.div`
  flex: 1;
`

const PatientName = styled.div`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: #2d3748;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const PatientDetails = styled.div`
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 0.5rem;
`

const TaskItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  
  &:last-child {
    border-bottom: none;
  }
`

const TaskCheckbox = styled.input`
  width: 18px;
  height: 18px;
  margin-right: 1rem;
  cursor: pointer;
`

const TaskContent = styled.div`
  flex: 1;
`

const TaskTitle = styled.div<{ completed: boolean }>`
  font-weight: 500;
  color: ${({ completed }) => (completed ? '#a0aec0' : '#2d3748')};
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
  margin-bottom: 0.25rem;
`

const TaskMeta = styled.div`
  font-size: 0.75rem;
  color: #a0aec0;
`

const MenuButton = styled.button`
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  
  &:hover {
    background-color: #f7fafc;
    color: #4a5568;
  }
`

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  gap: 0.75rem;
`

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'outline' }>`
  padding: 0.625rem 1.25rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  
  background-color: ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return '#3182ce';
      case 'secondary':
        return '#718096';
      case 'outline':
        return 'transparent';
      default:
        return '#3182ce';
    }
  }};
  
  color: ${({ variant }) => (variant === 'outline' ? '#3182ce' : 'white')};
  border: ${({ variant }) => (variant === 'outline' ? '1px solid #3182ce' : 'none')};
  
  &:hover {
    background-color: ${({ variant }) => {
      switch (variant) {
        case 'primary':
          return '#2b6cb0';
        case 'secondary':
          return '#4a5568';
        case 'outline':
          return '#ebf8ff';
        default:
          return '#2b6cb0';
      }
    }};
  }
`

type TabType = 'patients' | 'tasks'

interface Task {
  id: string
  title: string
  patient: string
  due: string
  completed: boolean
}

// Interface for patient query items
interface PatientQuery {
  id: string;
  text: string;
  timestamp: number;
  patientName?: string;
  aiResponse?: string;
  responseStatus?: 'loading' | 'success' | 'error';
  isApproved?: boolean;
  isEditing?: boolean;
  editedResponse?: string;
  attachments?: {
    id: string;
    fileName: string;
    fileType: string;
    type: 'image' | 'video' | 'file';
  }[];
}

const QueryCard = styled(Card)`
  overflow: hidden;
`

const QueryHeader = styled.div`
  padding: 1.25rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const QueryTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
`

const QueryDate = styled.div`
  font-size: 0.875rem;
  color: #718096;
`

const QueryList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`

const QueryItem = styled.div`
  padding: 1.25rem;
  border-bottom: 1px solid #e2e8f0;
  
  &:last-child {
    border-bottom: none;
  }
`

const QueryTime = styled.div`
  display: flex;
  align-items: center;
  color: #4a5568;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  
  svg {
    margin-right: 0.5rem;
    font-size: 1rem;
    color: #718096;
  }
`

const QueryPatient = styled.div`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: #2d3748;
`

const QueryText = styled.div`
  font-size: 0.875rem;
  color: #4a5568;
  margin-bottom: 0.75rem;
  white-space: pre-line;
`

const AttachmentsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`

const AttachmentBadge = styled.div<{ type: string }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  background-color: ${({ type }) => {
    switch (type) {
      case 'image':
        return '#3182ce20';
      case 'video':
        return '#e53e3e20';
      default:
        return '#71809620';
    }
  }};
  color: ${({ type }) => {
    switch (type) {
      case 'image':
        return '#3182ce';
      case 'video':
        return '#e53e3e';
      default:
        return '#718096';
    }
  }};
`

const GeminiResponseContainer = styled.div`
  border-left: 3px solid #3182ce;
  padding-left: 1rem;
  margin: 0.75rem 0;
  background-color: #f8fafc;
  border-radius: 0 0.25rem 0.25rem 0;
`

const GeminiResponseTitle = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  color: #3182ce;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`

const GeminiResponseText = styled.div`
  font-size: 0.875rem;
  color: #4a5568;
  white-space: pre-line;
`

const ResponseStatusBadge = styled.span<{ status: 'loading' | 'success' | 'error' }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  margin-left: 0.5rem;
  background-color: ${({ status }) => {
    switch (status) {
      case 'success':
        return '#38a16920';
      case 'loading':
        return '#3182ce20';
      case 'error':
        return '#e53e3e20';
      default:
        return '#a0aec020';
    }
  }};
  color: ${({ status }) => {
    switch (status) {
      case 'success':
        return '#38a169';
      case 'loading':
        return '#3182ce';
      case 'error':
        return '#e53e3e';
      default:
        return '#a0aec0';
    }
  }};
`

// Update the SuccessMessage component to be more visible
const SuccessMessage = styled.div`
  margin-top: 0.75rem;
  padding: 0.75rem;
  background-color: #38a16920;
  color: #38a169;
  font-size: 0.875rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid #38a169;
  font-weight: 500;
`

// Simple Markdown renderer component 
const SimpleMarkdown = ({ content }: { content: string }) => {
  // Function to process markdown text
  const processMarkdown = (text: string) => {
    if (!text) return '';
    
    // Process code blocks
    let processedText = text.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>');
    
    // Process inline code
    processedText = processedText.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Process headers
    processedText = processedText.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    processedText = processedText.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    processedText = processedText.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    
    // Process bold
    processedText = processedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Process italic
    processedText = processedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Process lists
    processedText = processedText.replace(/^\s*\* (.*$)/gm, '<li>$1</li>');
    processedText = processedText.replace(/^\s*- (.*$)/gm, '<li>$1</li>');
    processedText = processedText.replace(/^\s*\d+\. (.*$)/gm, '<li>$1</li>');
    
    // Wrap lists with ul/ol
    processedText = processedText.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');
    
    // Process paragraphs - any line that's not already wrapped in an HTML tag
    processedText = processedText.replace(/^(?!<[a-z]).+$/gm, '<p>$&</p>');
    
    // Fix multiple paragraphs
    processedText = processedText.replace(/<\/p><p>/g, '</p>\n<p>');
    
    // Fix nested lists
    processedText = processedText.replace(/<\/ul><ul>/g, '');
    
    return processedText;
  };
  
  return (
    <div 
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: processMarkdown(content) }}
      style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        lineHeight: '1.5',
        color: '#333'
      }}
    />
  );
};

// Update response styling
const ResponseText = styled.div`
  font-size: 0.9rem;
  line-height: 1.5;
  white-space: pre-wrap;
  
  pre {
    background-color: #f5f5f5;
    padding: 0.5rem;
    border-radius: 0.25rem;
    overflow-x: auto;
  }
  
  code {
    background-color: #f5f5f5;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-family: monospace;
    font-size: 0.85em;
  }
  
  h1, h2, h3 {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
  
  h1 {
    font-size: 1.5rem;
  }
  
  h2 {
    font-size: 1.3rem;
  }
  
  h3 {
    font-size: 1.1rem;
  }
  
  ul, ol {
    padding-left: 1.5rem;
    margin: 0.5rem 0;
  }
  
  li {
    margin: 0.25rem 0;
  }
  
  p {
    margin: 0.5rem 0;
  }
`;

const DoctorDashboard = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<TabType>('patients')
  const [patientQueries, setPatientQueries] = useState<PatientQuery[]>([])
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Review blood test results for John Smith',
      patient: 'John Smith',
      due: 'Today',
      completed: false,
    },
    {
      id: '2',
      title: 'Write prescription for Jane Doe',
      patient: 'Jane Doe',
      due: 'Today',
      completed: false,
    },
    {
      id: '3',
      title: 'Finalize medical report for Robert Johnson',
      patient: 'Robert Johnson',
      due: 'Tomorrow',
      completed: false,
    },
    {
      id: '4',
      title: 'Call pharmacy about Michael Brown medication',
      patient: 'Michael Brown',
      due: '2 days ago',
      completed: true,
    },
  ])
  
  // Inside DoctorDashboard component, add state for approval feedback
  const [approvedQueries, setApprovedQueries] = useState<Set<string>>(new Set())
  const [successMessage, setSuccessMessage] = useState<string>('')
  
  // Load patient queries from localStorage
  useEffect(() => {
    const savedPrompts = localStorage.getItem('patientPromptHistory')
    
    if (savedPrompts) {
      try {
        const parsedPrompts = JSON.parse(savedPrompts)
        setPatientQueries(parsedPrompts)
      } catch (error) {
        console.error('Failed to parse patient queries:', error)
      }
    }
    
    // Set up a storage event listener to detect changes made by patients
    window.addEventListener('storage', handleStorageChange);
    
    // Clean up on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [])
  
  // Handle storage changes (when a patient submits a new query)
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === 'patientPromptHistory') {
      console.log('Storage event detected, reloading patient queries');
      const savedPrompts = localStorage.getItem('patientPromptHistory')
      if (savedPrompts) {
        try {
          const parsedPrompts = JSON.parse(savedPrompts)
          setPatientQueries(parsedPrompts)
        } catch (error) {
          console.error('Failed to parse patient queries:', error)
        }
      }
    }
  };

  // Save updated queries to localStorage
  const saveQueriesToLocalStorage = (): Promise<boolean> => {
    return new Promise((resolve) => {
      try {
        // Create a simplified version without file objects
        const simplifiedQueries = patientQueries.map(query => {
          // Explicitly ensure isApproved is a boolean true or false, not undefined or string
          const isApproved = query.isApproved === true;
          
          // Make a copy to avoid reference issues
          const result = {
            id: query.id,
            text: query.text,
            timestamp: query.timestamp,
            patientName: query.patientName,
            aiResponse: query.aiResponse,
            responseStatus: query.responseStatus,
            isApproved: isApproved, // Always a boolean
            attachments: query.attachments ? query.attachments.map(a => ({
              id: a.id,
              fileName: a.fileName,
              fileType: a.fileType,
              type: a.type
            })) : undefined
          };
          
          console.log(`Preparing query ${query.id} for storage, isApproved: ${isApproved}, type: ${typeof isApproved}`);
          
          return result;
        });
        
        console.log('Saving to localStorage:', simplifiedQueries);
        
        // Store in localStorage - make sure to use remove/set pattern
        // to ensure storage events fire properly
        const queriesJson = JSON.stringify(simplifiedQueries);
        localStorage.removeItem('patientPromptHistory');
        localStorage.setItem('patientPromptHistory', queriesJson);
        
        // Verify what was saved
        const savedData = localStorage.getItem('patientPromptHistory');
        const parsed = savedData ? JSON.parse(savedData) : null;
        console.log('Verified saved data:', parsed);
        
        // Double check that the approved status was saved correctly
        if (parsed) {
          for (const item of parsed) {
            console.log(`Stored query ${item.id}: isApproved=${item.isApproved}, type=${typeof item.isApproved}`);
          }
        }
        
        // Resolve the promise with success
        resolve(true);
      } catch (error) {
        console.error('Error saving to localStorage:', error);
        resolve(false);
      }
    });
  }
  
  // Handle approve AI response
  const handleApproveResponse = async (queryId: string) => {
    try {
      console.log(`Approving response for query ${queryId}`);
      
      // Find the query to approve
      const queryToUpdate = patientQueries.find(q => q.id === queryId);
      if (!queryToUpdate) {
        console.error(`Query with ID ${queryId} not found`);
        return;
      }
      
      // Update the query in our local state
      const updatedQueries = patientQueries.map(query => 
        query.id === queryId 
          ? { ...query, isApproved: true } 
          : query
      );
      
      setPatientQueries(updatedQueries);
      
      // Add this query to our approvedQueries state
      setApprovedQueries(prev => new Set(prev).add(queryId));
      
      // Save this update to localStorage and API
      console.log(`Sending approval to API for query ${queryId}`);
      const apiResult = await updateApprovedResponses(queryId, true);
      
      if (!apiResult) {
        console.error('API service failed to update approval status');
      }
      
      // Save to localStorage - make sure to await this
      console.log('Saving updated queries to localStorage...');
      const saveResult = await saveQueriesToLocalStorage();
      
      if (!saveResult) {
        console.error('Failed to save to localStorage');
      }
      
      console.log(`Response for query ${queryId} has been approved successfully`);
      
      // Show success message
      setSuccessMessage(`Response approved! Patients can now see it in the "Responses to Queries" tab`);
      
      // Hide the success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (error) {
      console.error('Error approving response:', error);
    }
  };
  
  const handleTaskToggle = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }
  
  // Format date for display
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }
  
  return (
    <div>
      <PageTitle>Doctor Dashboard</PageTitle>
      
      <StatsGrid>
        <StatCard>
          <StatIcon color="#3182ce">
            <FaCommentMedical />
          </StatIcon>
          <StatContent>
            <StatValue>{patientQueries.length}</StatValue>
            <StatLabel>Patient Queries</StatLabel>
          </StatContent>
        </StatCard>
        
        <StatCard>
          <StatIcon color="#38a169">
            <FaUser />
          </StatIcon>
          <StatContent>
            <StatValue>3</StatValue>
            <StatLabel>New Patients</StatLabel>
          </StatContent>
        </StatCard>
        
        <StatCard>
          <StatIcon color="#e53e3e">
            <FaClipboardList />
          </StatIcon>
          <StatContent>
            <StatValue>5</StatValue>
            <StatLabel>Pending Reports</StatLabel>
          </StatContent>
        </StatCard>
        
        <StatCard>
          <StatIcon color="#805ad5">
            <FaPills />
          </StatIcon>
          <StatContent>
            <StatValue>12</StatValue>
            <StatLabel>Prescriptions</StatLabel>
          </StatContent>
        </StatCard>
      </StatsGrid>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Section>
            <QueryCard>
              <QueryHeader>
                <QueryTitle>Patient Queries</QueryTitle>
                <QueryDate>{new Date().toLocaleDateString()}</QueryDate>
              </QueryHeader>
              
              <QueryList>
                {patientQueries.length > 0 ? (
                  patientQueries.map((query) => (
                    <QueryItem key={query.id}>
                      <QueryTime>
                        <FaClock />
                        {formatDate(query.timestamp)}
                      </QueryTime>
                      <QueryPatient>
                        {query.patientName || 'Anonymous Patient'}
                      </QueryPatient>
                      <QueryText>{query.text}</QueryText>
                      
                      {query.attachments && query.attachments.length > 0 && (
                        <AttachmentsList>
                          {query.attachments.map(attachment => (
                            <AttachmentBadge key={attachment.id} type={attachment.type}>
                              {attachment.type === 'image' && <FaFileAlt />}
                              {attachment.type === 'video' && <FaFileAlt />}
                              {attachment.type === 'file' && <FaFileAlt />}
                              {attachment.fileName}
                            </AttachmentBadge>
                          ))}
                        </AttachmentsList>
                      )}
                      
                      {/* Display Gemini's AI Response */}
                      {query.responseStatus && (
                        <GeminiResponseContainer>
                          <GeminiResponseTitle>
                            <FaCommentMedical />
                            AI Analysis
                            {query.responseStatus && (
                              <ResponseStatusBadge status={query.responseStatus}>
                                {query.responseStatus === 'loading' ? 'Analyzing...' : 
                                 query.responseStatus === 'success' ? 'Complete' : 'Failed'}
                              </ResponseStatusBadge>
                            )}
                            {query.isApproved && (
                              <ResponseStatusBadge status="success">Doctor Approved</ResponseStatusBadge>
                            )}
                          </GeminiResponseTitle>
                          {/* Response Status */}
                          {query.responseStatus === 'loading' && <GeminiResponseText>Analyzing patient query...</GeminiResponseText>}
                          {query.responseStatus === 'error' && <GeminiResponseText>Error analyzing query. Please try again later.</GeminiResponseText>}
                          {query.responseStatus === 'success' && query.aiResponse && (
                            <ResponseText>
                              <SimpleMarkdown content={query.aiResponse || ''} />
                            </ResponseText>
                          )}
                          
                          {/* Show success message after approval */}
                          {approvedQueries.has(query.id) && (
                            <SuccessMessage>
                              <FaCheckCircle />
                              Response approved! Patients can now see it in the "Responses to Queries" tab.
                            </SuccessMessage>
                          )}
                        </GeminiResponseContainer>
                      )}
                      
                      <AppointmentActions>
                        {query.responseStatus === 'success' && !query.isApproved && (
                          <ActionButton variant="primary" onClick={() => handleApproveResponse(query.id)}>
                            <FaCheck />
                            Approve Response
                          </ActionButton>
                        )}
                        {query.isApproved && (
                          <ActionButton variant="secondary" disabled>
                            <FaCheck />
                            Approved
                          </ActionButton>
                        )}
                        <ActionButton variant="primary">
                          <FaReply />
                          Respond
                        </ActionButton>
                        <ActionButton variant="outline">View Patient Records</ActionButton>
                      </AppointmentActions>
                    </QueryItem>
                  ))
                ) : (
                  <QueryItem>
                    <QueryText>No patient queries available at this time.</QueryText>
                  </QueryItem>
                )}
              </QueryList>
            </QueryCard>
          </Section>
        </div>
        
        <div>
          <Section>
            <SectionHeader>
              <TabsContainer>
                <Tab 
                  active={activeTab === 'patients'} 
                  onClick={() => setActiveTab('patients')}
                >
                  Recent Patients
                </Tab>
                <Tab 
                  active={activeTab === 'tasks'} 
                  onClick={() => setActiveTab('tasks')}
                >
                  Tasks
                </Tab>
              </TabsContainer>
              
              <SearchContainer>
                <SearchIcon>
                  <FaSearch />
                </SearchIcon>
                <SearchInput placeholder="Search..." />
              </SearchContainer>
            </SectionHeader>
            
            {activeTab === 'patients' && (
              <div>
                <Grid>
                  <PatientCard>
                    <PatientAvatar>
                      <FaUser />
                    </PatientAvatar>
                    <PatientInfo>
                      <PatientName>
                        John Smith
                        <MenuButton>
                          <FaEllipsisV />
                        </MenuButton>
                      </PatientName>
                      <PatientDetails>
                        Last Visit: October 18, 2023
                      </PatientDetails>
                      <PatientDetails>
                        Diagnosis: Hypertension, Type 2 Diabetes
                      </PatientDetails>
                      <ActionButton variant="outline">
                        View Records
                      </ActionButton>
                    </PatientInfo>
                  </PatientCard>
                  
                  <PatientCard>
                    <PatientAvatar>
                      <FaUser />
                    </PatientAvatar>
                    <PatientInfo>
                      <PatientName>
                        Sarah Johnson
                        <MenuButton>
                          <FaEllipsisV />
                        </MenuButton>
                      </PatientName>
                      <PatientDetails>
                        Last Visit: October 16, 2023
                      </PatientDetails>
                      <PatientDetails>
                        Diagnosis: Gestational Diabetes
                      </PatientDetails>
                      <ActionButton variant="outline">
                        View Records
                      </ActionButton>
                    </PatientInfo>
                  </PatientCard>
                  
                  <PatientCard>
                    <PatientAvatar>
                      <FaUser />
                    </PatientAvatar>
                    <PatientInfo>
                      <PatientName>
                        Emily Wilson
                        <MenuButton>
                          <FaEllipsisV />
                        </MenuButton>
                      </PatientName>
                      <PatientDetails>
                        Last Visit: October 15, 2023
                      </PatientDetails>
                      <PatientDetails>
                        Diagnosis: Migraine, Anxiety
                      </PatientDetails>
                      <ActionButton variant="outline">
                        View Records
                      </ActionButton>
                    </PatientInfo>
                  </PatientCard>
                </Grid>
                
                <ButtonRow>
                  <Button variant="primary">
                    <FaPlus />
                    Add New Patient
                  </Button>
                </ButtonRow>
              </div>
            )}
            
            {activeTab === 'tasks' && (
              <Card>
                {tasks.map(task => (
                  <TaskItem key={task.id}>
                    <TaskCheckbox 
                      type="checkbox" 
                      checked={task.completed}
                      onChange={() => handleTaskToggle(task.id)}
                    />
                    <TaskContent>
                      <TaskTitle completed={task.completed}>{task.title}</TaskTitle>
                      <TaskMeta>
                        {task.patient} • Due {task.due}
                      </TaskMeta>
                    </TaskContent>
                    <MenuButton>
                      <FaEllipsisV />
                    </MenuButton>
                  </TaskItem>
                ))}
                
                <ButtonRow style={{ padding: '1rem' }}>
                  <Button variant="outline">
                    <FaPlus />
                    Add Task
                  </Button>
                </ButtonRow>
              </Card>
            )}
          </Section>
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard 