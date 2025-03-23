import { useEffect, useRef, useState } from 'react'
import { FaBell, FaCheckCircle, FaClock, FaCommentMedical, FaFile, FaFileUpload, FaMicrophone, FaPaperPlane, FaStop, FaTimes } from 'react-icons/fa'
import styled from 'styled-components'
import { useAuth } from '../context/AuthContext'
import { getAIResponse, getNotifications, getUnreadNotificationsCount, markNotificationAsRead, saveNotification } from '../services/api'
// import ReactMarkdown from 'react-markdown' // Uncomment after package is installed

const PageTitle = styled.h1`
  margin-bottom: 2rem;
  color: #2d3748;
`

const SubTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
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

const Card = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`

const AppointmentCard = styled(Card)`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`

const AppointmentIcon = styled.div<{ status: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  background-color: ${({ status }) => {
    switch (status) {
      case 'upcoming':
        return '#3182ce10';
      case 'pending':
        return '#ed8a1910';
      case 'completed':
        return '#38a16910';
      case 'canceled':
        return '#e53e3e10';
      default:
        return '#3182ce10';
    }
  }};
  color: ${({ status }) => {
    switch (status) {
      case 'upcoming':
        return '#3182ce';
      case 'pending':
        return '#ed8a19';
      case 'completed':
        return '#38a169';
      case 'canceled':
        return '#e53e3e';
      default:
        return '#3182ce';
    }
  }};
`

const AppointmentContent = styled.div`
  flex: 1;
`

const AppointmentTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2d3748;
`

const AppointmentDetails = styled.div`
  font-size: 0.875rem;
  color: #4a5568;
  margin-bottom: 1rem;
`

const Detail = styled.div`
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
    color: #718096;
  }
`

const Status = styled.span<{ status: string }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: ${({ status }) => {
    switch (status) {
      case 'upcoming':
        return '#3182ce20';
      case 'pending':
        return '#ed8a1920';
      case 'completed':
        return '#38a16920';
      case 'canceled':
        return '#e53e3e20';
      default:
        return '#3182ce20';
    }
  }};
  color: ${({ status }) => {
    switch (status) {
      case 'upcoming':
        return '#3182ce';
      case 'pending':
        return '#ed8a19';
      case 'completed':
        return '#38a169';
      case 'canceled':
        return '#e53e3e';
      default:
        return '#3182ce';
    }
  }};
`

const MedicalCard = styled(Card)`
  display: flex;
  flex-direction: column;
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const CardIcon = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
  font-size: 1.25rem;
  margin-right: 1rem;
  background-color: ${({ color }) => `${color}10`};
  color: ${({ color }) => color};
`

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #2d3748;
`

const PrescriptionItem = styled.div`
  padding: 0.75rem 0;
  border-bottom: 1px solid #e2e8f0;
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`

const MedicationName = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: #2d3748;
`

const MedicationDetails = styled.div`
  font-size: 0.875rem;
  color: #718096;
`

const RecordItem = styled.div`
  padding: 0.75rem;
  border-radius: 0.375rem;
  background-color: #f7fafc;
  margin-bottom: 0.75rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const RecordTitle = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: #2d3748;
`

const RecordDate = styled.div`
  font-size: 0.75rem;
  color: #718096;
`

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'outline' }>`
  padding: 0.5rem 1rem;
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

const VitalsCard = styled(Card)`
  padding: 1.5rem;
`

const VitalsTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2d3748;
`

const VitalsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`

const VitalItem = styled.div`
  text-align: center;
`

const VitalValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #3182ce;
  margin-bottom: 0.25rem;
`

const VitalLabel = styled.div`
  font-size: 0.875rem;
  color: #718096;
`

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  background-color: white;
  border-radius: 0.5rem 0.5rem 0 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`

const Tab = styled.button<{ active: boolean }>`
  padding: 1rem 1.5rem;
  background-color: ${({ active }) => (active ? 'white' : 'transparent')};
  color: ${({ active }) => (active ? '#3182ce' : '#4a5568')};
  font-weight: ${({ active }) => (active ? '600' : '400')};
  border: none;
  border-bottom: ${({ active }) => (active ? '2px solid #3182ce' : '2px solid transparent')};
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;
  
  &:hover {
    color: #3182ce;
    background-color: ${({ active }) => (active ? 'white' : '#f7fafc')};
  }
`

const PromptSection = styled.section`
  margin-bottom: 3rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`

const PromptTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2d3748;
`

const PromptDescription = styled.p`
  color: #718096;
  margin-bottom: 1.5rem;
`

const PromptForm = styled.form`
  width: 100%;
`

const PromptTextarea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  margin-bottom: 1rem;
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`

const FormActions = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`

const PromptButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #3182ce;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #2b6cb0;
  }
  
  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
`

const FileUploadButton = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: transparent;
  color: #3182ce;
  font-weight: 600;
  border: 1px solid #3182ce;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #ebf8ff;
  }
`

const HiddenFileInput = styled.input`
  display: none;
`

const AttachmentsContainer = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
`

const AttachmentItem = styled.div`
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  aspect-ratio: 1;
  background-color: #f7fafc;
`

const AttachmentPreview = styled.div<{ type: 'image' | 'video' | 'file' }>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  svg {
    font-size: 2rem;
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
  }
`

const AttachmentName = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const RemoveAttachmentButton = styled.button`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`

const ErrorMessage = styled.div`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`

const PromptHistory = styled.div`
  margin-top: 2rem;
  border-top: 1px solid #e2e8f0;
  padding-top: 1.5rem;
`

const PromptHistoryTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #2d3748;
`

const PromptHistoryItem = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #f7fafc;
  margin-bottom: 0.75rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const PromptHistoryText = styled.p`
  color: #4a5568;
  margin-bottom: 0.5rem;
`

const PromptHistoryDate = styled.div`
  font-size: 0.75rem;
  color: #718096;
`

// Interface for prompt history items
interface PromptHistoryItem {
  id: string;
  text: string;
  timestamp: number;
  attachments?: AttachmentFile[];
  aiResponse?: string;
  responseStatus?: 'loading' | 'success' | 'error';
  isApproved?: boolean;
  isUrgent?: boolean;
}

// Interface for attachment files
interface AttachmentFile {
  id: string;
  file: File;
  previewUrl?: string;
  type: 'image' | 'video' | 'file';
}

// Add these new styled components
const AIResponseContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  border-left: 3px solid #3182ce;
`

const AIResponseHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #4a5568;
  font-weight: 500;
`

const VerifiedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  background-color: #38a16920;
  color: #38a169;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  margin-left: 0.5rem;
`

const AIResponseContent = styled.div`
  margin-top: 1rem;
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
`

const LoadingText = styled.div`
  color: #3182ce;
  font-size: 0.875rem;
  font-style: italic;
`

const ResponseCard = styled(Card)`
  margin-bottom: 1.5rem;
  padding: 0;
  overflow: hidden;
`

const ResponseCardHeader = styled.div`
  padding: 1.25rem;
  border-bottom: 1px solid #e2e8f0;
  background-color: #f7fafc;
`

const ResponseCardBody = styled.div`
  padding: 1.25rem;
`

// Add a notification badge component
const NotificationBadge = styled.span`
  background-color: #e53e3e;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 9999px;
  padding: 0.125rem 0.5rem;
  margin-left: 0.5rem;
`

// Add an "Unverified" badge component
const UnverifiedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  background-color: #71809620;
  color: #718096;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  margin-left: 0.5rem;
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

// Fix ResponseStatusBadge type by adding missing type
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

// Voice Button styles
const VoiceButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
  background-color: ${props => props.disabled ? '#a0aec0' : props.color || '#3182ce'};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;
  font-size: 0.875rem;
  
  &:hover {
    background-color: ${props => props.disabled ? '#a0aec0' : '#2c5282'};
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

const UrgencyToggle = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

const UrgencyLabel = styled.label`
  font-size: 0.875rem;
  color: #4a5568;
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const UrgencySwitch = styled.div<{ isUrgent: boolean }>`
  width: 3rem;
  height: 1.5rem;
  background-color: ${props => props.isUrgent ? '#e53e3e' : '#cbd5e0'};
  border-radius: 1rem;
  position: relative;
  transition: all 0.2s;
  cursor: pointer;
  
  &:after {
    content: '';
    position: absolute;
    width: 1.25rem;
    height: 1.25rem;
    background-color: white;
    border-radius: 50%;
    top: 0.125rem;
    left: ${props => props.isUrgent ? 'calc(100% - 1.375rem)' : '0.125rem'};
    transition: all 0.2s;
  }
`;

const UrgencyBadge = styled.span`
  background-color: #e53e3e;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  margin-left: 0.5rem;
  display: inline-flex;
  align-items: center;
`;

const RecordingIndicator = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #f56565;
  color: white;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  animation: pulse 1.5s infinite;
  
  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
    100% {
      opacity: 1;
    }
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

// Add a notification bell icon component
const NotificationBell = styled.div<{ hasNotifications: boolean }>`
  position: relative;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ hasNotifications }) => (hasNotifications ? '#3182ce' : '#718096')};
  transition: color 0.2s;
  
  &:hover {
    color: #3182ce;
  }
`

const NotificationCounter = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #e53e3e;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
`

const NotificationsContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 320px;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  z-index: 100;
  max-height: 400px;
  overflow-y: auto;
`

const NotificationItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  cursor: pointer;
  
  &:hover {
    background-color: #f7fafc;
  }
  
  &:last-child {
    border-bottom: none;
  }
`

const NotificationHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background-color: #f7fafc;
  border-bottom: 1px solid #e2e8f0;
`

const NotificationTitle = styled.div`
  font-weight: 600;
  color: #2d3748;
`

const NotificationClearAll = styled.button`
  background: none;
  border: none;
  color: #3182ce;
  font-size: 0.875rem;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`

const NotificationText = styled.div`
  font-size: 0.875rem;
  color: #4a5568;
`

const NotificationTime = styled.div`
  font-size: 0.75rem;
  color: #718096;
  margin-top: 0.25rem;
`

const NotificationEmpty = styled.div`
  padding: 2rem;
  text-align: center;
  color: #a0aec0;
`

const PatientDashboard = () => {
  const { user } = useAuth()
  const [prompt, setPrompt] = useState<string>('')
  const [promptHistory, setPromptHistory] = useState<PromptHistoryItem[]>([])
  const [attachments, setAttachments] = useState<AttachmentFile[]>([])
  const [fileError, setFileError] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Voice recognition state
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [recognitionSupported, setRecognitionSupported] = useState<boolean>(true)
  const recognitionRef = useRef<any>(null)
  const [interimTranscript, setInterimTranscript] = useState<string>('')
  
  // Allowed file types
  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg'];
  const allowedFileTypes = [...allowedImageTypes, ...allowedVideoTypes, 'application/pdf'];
  const maxFileSize = 10 * 1024 * 1024; // 10MB
  
  // Add state for active tab
  const [activeTab, setActiveTab] = useState<'ask' | 'responses'>('ask');
  
  // Add state to track seen responses
  const [seenResponses, setSeenResponses] = useState<Set<string>>(new Set());
  
  // Add state for tracking unseen approved responses count
  const [unseenResponseCount, setUnseenResponseCount] = useState<number>(0);
  
  // Add state for notifications
  const [notificationCount, setNotificationCount] = useState<number>(0);
  
  // Add state for notifications panel
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  
  // Add state for isUrgent
  const [isUrgent, setIsUrgent] = useState(false);
  
  // Load prompt history from localStorage on component mount
  useEffect(() => {
    console.log('Setting up storage event listeners and periodic checks');
    
    const handleStorageChangeWithState = (event: StorageEvent) => {
      if (event.key === 'patientPromptHistory') {
        console.log('Storage event detected, reloading prompt history');
        loadPromptHistory();
      }
    };
    
    const periodicCheck = () => {
      console.log('Performing periodic localStorage check');
      loadPromptHistory();
    };
    
    // Initial load
    loadPromptHistory();
    
    // Set up a storage event listener to detect changes made by the doctor
    window.addEventListener('storage', handleStorageChangeWithState);
    
    // Also set up a periodic check for changes (every 5 seconds)
    const intervalId = setInterval(periodicCheck, 5000);
    
    // Clean up on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChangeWithState);
      clearInterval(intervalId);
    };
  }, []);
  
  // Load prompt history from localStorage
  const loadPromptHistory = () => {
    const savedPrompts = localStorage.getItem('patientPromptHistory');
    
    if (savedPrompts) {
      try {
        const parsedPrompts = JSON.parse(savedPrompts);
        console.log('Loaded prompts from localStorage:', parsedPrompts);
        
        // Ensure proper ordering - newest items first
        const sortedPrompts = [...parsedPrompts].sort((a, b) => b.timestamp - a.timestamp);
        console.log('Sorted prompts:', sortedPrompts.map(p => `${p.id}: ${p.timestamp}`));
        
        // Track if we found any new approved responses
        let foundNewApprovedResponses = false;
        
        // Debug each prompt's approval status
        sortedPrompts.forEach((item: any, index) => {
          // Convert to boolean explicitly
          const isApproved = item.isApproved === true;
          console.log(`Prompt ${index}:${item.id}: isApproved=${isApproved}, original=${item.isApproved}, type=${typeof item.isApproved}`);
          
          // Check if this is a new approved response the user hasn't seen yet
          if (isApproved && !seenResponses.has(item.id)) {
            foundNewApprovedResponses = true;
            console.log(`New approved response found: ${item.id}`);
          }
        });
        
        // Process prompts to recreate AttachmentFile objects with preview URLs
        const promptsWithFiles = sortedPrompts.map((prompt: any) => {
          // Explicitly handle isApproved as a boolean
          const isApproved = prompt.isApproved === true;
          console.log(`Processing prompt ${prompt.id}, isApproved=${isApproved}, original=${prompt.isApproved}, type=${typeof prompt.isApproved}`);
          
          // Count this as an unseen approved response if needed
          const isNewApproved = isApproved && !seenResponses.has(prompt.id);
          if (isNewApproved) {
            console.log(`Prompt ${prompt.id} is a new approved response`);
          }
          
          if (prompt.attachments && prompt.attachments.length > 0) {
            return {
              ...prompt,
              text: prompt.text || prompt.prompt,
              timestamp: typeof prompt.timestamp === 'string' ? new Date(prompt.timestamp).getTime() : prompt.timestamp,
              isApproved: isApproved, // Explicitly set as boolean
              attachments: prompt.attachments.map((att: any) => ({
                id: att.id || `${Date.now()}-${att.name || att.fileName}`,
                file: new File([], att.name || att.fileName || 'file', {
                  type: att.fileType || att.type
                }),
                previewUrl: att.previewUrl,
                type: att.type
              }))
            };
          }
          return {
            ...prompt,
            text: prompt.text || prompt.prompt,
            timestamp: typeof prompt.timestamp === 'string' ? new Date(prompt.timestamp).getTime() : prompt.timestamp,
            isApproved: isApproved // Explicitly set as boolean
          };
        });

        // Log the processed prompts to verify approval status
        console.log('Final processed prompts:', promptsWithFiles);
        promptsWithFiles.forEach((item, index) => {
          console.log(`Processed ${index}: ${item.id}, isApproved=${item.isApproved}, timestamp=${item.timestamp}`);
        });
        
        // Count unseen approved responses
        let unseenCount = 0;
        promptsWithFiles.forEach((item: PromptHistoryItem) => {
          console.log(`After processing: Prompt ${item.id}: isApproved=${item.isApproved}, type=${typeof item.isApproved}`);
          if (item.isApproved === true && !seenResponses.has(item.id)) {
            unseenCount++;
          }
        });
        
        // Update the unseen count
        setUnseenResponseCount(unseenCount);
        
        // If we found new approved responses and user is not on responses tab,
        // we could play a sound or show a notification here
        if (foundNewApprovedResponses && activeTab !== 'responses') {
          console.log("New approved responses found! Notifying user...");
          // You could play a sound or show a toast notification here
        }

        setPromptHistory(promptsWithFiles);
      } catch (error) {
        console.error('Failed to parse prompt history:', error);
      }
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    
    setFileError('')
    
    Array.from(files).forEach(file => {
      // Check file type
      if (!allowedFileTypes.includes(file.type)) {
        setFileError(`File type not supported: ${file.name}`)
        return
      }
      
      // Check file size
      if (file.size > maxFileSize) {
        setFileError(`File too large (max 10MB): ${file.name}`)
        return
      }
      
      // Determine file type
      let fileType: 'image' | 'video' | 'file' = 'file'
      if (allowedImageTypes.includes(file.type)) {
        fileType = 'image'
      } else if (allowedVideoTypes.includes(file.type)) {
        fileType = 'video'
      }
      
      // Create preview URL for images and videos
      let previewUrl: string | undefined
      if (fileType === 'image' || fileType === 'video') {
        previewUrl = URL.createObjectURL(file)
      }
      
      // Add to attachments
      setAttachments(prev => [
        ...prev,
        {
          id: `${Date.now()}-${file.name}`,
          file,
          previewUrl,
          type: fileType
        }
      ])
    })
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }
  
  const handleRemoveAttachment = (id: string) => {
    setAttachments(prev => {
      const attachment = prev.find(a => a.id === id)
      if (attachment?.previewUrl) {
        URL.revokeObjectURL(attachment.previewUrl)
      }
      return prev.filter(a => a.id !== id)
    })
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if ((!prompt.trim() && attachments.length === 0) || isSubmitting) return
    
    setIsSubmitting(true)
    
    // Create new prompt history item
    const newPromptId = Date.now().toString()
    const newPrompt: PromptHistoryItem = {
      id: newPromptId,
      text: prompt,
      timestamp: Date.now(),
      attachments: attachments.map(a => ({
        id: a.id,
        file: a.file,
        previewUrl: a.previewUrl,
        type: a.type
      })),
      responseStatus: 'loading',
      isApproved: false,
      isUrgent: isUrgent
    }
    
    // Create a notification for the doctor
    const patientName = user?.name || 'A patient';
    const notificationText = `${patientName} submitted a ${isUrgent ? 'URGENT ' : ''}query: "${prompt.length > 50 ? prompt.substring(0, 50) + '...' : prompt}"`;
    
    saveNotification({
      id: `notification-${Date.now()}`,
      type: 'new_query',
      timestamp: Date.now(),
      relatedId: newPromptId,
      text: notificationText,
      isRead: false,
      isUrgent: isUrgent
    }, 'doctor');
    
    // Update history state immediately with 'loading' status
    const updatedHistory = [newPrompt, ...promptHistory]
    setPromptHistory(updatedHistory)
    
    try {
      // Call the Gemini API for an AI response
      const aiResponse = await getAIResponse(prompt)
      
      // Update the history item with the AI response - set responseStatus to success immediately
      const updatedHistoryWithResponse = updatedHistory.map(item => 
        item.id === newPromptId 
          ? { 
              ...item, 
              aiResponse, 
              responseStatus: 'success' as const, 
              isApproved: false  // Initially unverified - doctor needs to approve
            } 
          : item
      )
      
      console.log(`AI response received and showing to patient immediately (unverified):`, aiResponse.substring(0, 100) + '...');
      
      setPromptHistory(updatedHistoryWithResponse)
      
      // Save to localStorage
      saveToSessionStorage(updatedHistoryWithResponse)
    } catch (error) {
      console.error('Error getting AI response:', error)
      
      // Update the item with error status
      const updatedHistoryWithError = updatedHistory.map(item => 
        item.id === newPromptId 
          ? { ...item, responseStatus: 'error' as const } 
          : item
      )
      
      setPromptHistory(updatedHistoryWithError)
      
      // Save to localStorage
      saveToSessionStorage(updatedHistoryWithError)
    } finally {
      // Clear the input, attachments, and isUrgent flag regardless of success/failure
      setPrompt('')
      setAttachments([])
      setIsUrgent(false)
      setIsSubmitting(false)
    }
  }
  
  // Helper function to save to localStorage
  const saveToSessionStorage = (history: PromptHistoryItem[]) => {
    // First get existing data to preserve approved status and edited responses
    const existingData = localStorage.getItem('patientPromptHistory');
    let existingItems: any[] = [];
    
    if (existingData) {
      try {
        existingItems = JSON.parse(existingData);
        console.log('Found existing items in localStorage:', existingItems.length);
        
        // Debug existing items approval status
        existingItems.forEach(item => {
          console.log(`Existing item ${item.id}: isApproved=${item.isApproved === true}, type=${typeof item.isApproved}`);
        });
      } catch (error) {
        console.error('Error parsing existing localStorage data:', error);
      }
    }
    
    // Create a map of existing items by ID for quick lookup
    const existingMap = new Map();
    existingItems.forEach(item => {
      // Store with explicit boolean conversion
      existingMap.set(item.id, {
        ...item,
        isApproved: item.isApproved === true,
        isUrgent: item.isUrgent === true
      });
    });
    
    // Create a simplified version suitable for storage
    const historyForStorage = history.map(item => {
      // Check if this item exists and has properties we want to preserve
      const existingItem = existingMap.get(item.id);
      
      // IMPORTANT: Always prioritize doctor-approved status from existing storage
      // Only if the existing item was approved, keep it approved
      const wasApproved = existingItem && existingItem.isApproved === true;
      const isApproved = wasApproved || (item.isApproved === true);
      
      // Preserve urgent status
      const isUrgent = item.isUrgent === true;
      
      console.log(`Item ${item.id}: wasApproved=${wasApproved}, currentApproval=${item.isApproved}, finalApproval=${isApproved}, isUrgent=${isUrgent}`);
      
      // For edited responses, preserve what the doctor edited
      const aiResponse = existingItem?.editedResponse || 
                         existingItem?.aiResponse || 
                         item.aiResponse;
      
      return {
        id: item.id,
        text: item.text,
        timestamp: item.timestamp,
        aiResponse: aiResponse, 
        responseStatus: item.responseStatus || 'success',
        isApproved: isApproved, // Always boolean
        isUrgent: isUrgent, // Always boolean
        attachments: item.attachments ? item.attachments.map(a => ({
          id: a.id,
          fileName: a.file.name,
          fileType: a.file.type,
          type: a.type,
          previewUrl: a.previewUrl
        })) : undefined
      };
    });

    console.log('Saving to localStorage:', historyForStorage);
    historyForStorage.forEach(item => {
      console.log(`Saving item ${item.id}: isApproved=${item.isApproved}, type=${typeof item.isApproved}`);
    });

    // Sort by timestamp to ensure newest items are first
    const sortedHistory = [...historyForStorage].sort((a, b) => b.timestamp - a.timestamp);
    console.log('Sorted history for storage:', sortedHistory.map(item => `${item.id}: ${item.timestamp}`));

    // Use a temp variable to ensure storage event fires
    const historyJson = JSON.stringify(sortedHistory);
    localStorage.removeItem('patientPromptHistory');
    localStorage.setItem('patientPromptHistory', historyJson);
    
    // Verify what was saved
    const savedData = localStorage.getItem('patientPromptHistory');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      console.log('Verified saved data:', parsedData);
      parsedData.forEach((item: any) => {
        console.log(`Saved item ${item.id}: isApproved=${item.isApproved}, type=${typeof item.isApproved}`);
      });
    }
  }
  
  // Format date for display
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }
  
  // Clean up previews when component unmounts
  useEffect(() => {
    return () => {
      attachments.forEach(attachment => {
        if (attachment.previewUrl) {
          URL.revokeObjectURL(attachment.previewUrl)
        }
      })
    }
  }, [attachments])
  
  // Add logging right before rendering
  console.log('Current promptHistory state before rendering:', promptHistory);
  promptHistory.forEach(item => {
    console.log(`Rendering prompt ${item.id}: isApproved=${item.isApproved}, type=${typeof item.isApproved}`);
  });
  
  // Update the tab click handler to mark responses as seen
  const handleTabClick = (tab: 'ask' | 'responses') => {
    setActiveTab(tab);
    
    // If switching to responses tab, mark all approved responses as seen
    if (tab === 'responses') {
      const newSeenResponses = new Set(seenResponses);
      promptHistory.forEach(item => {
        if (item.isApproved === true) {
          newSeenResponses.add(item.id);
        }
      });
      setSeenResponses(newSeenResponses);
      setUnseenResponseCount(0); // Reset counter when viewing responses tab
    }
  };
  
  // Check if speech recognition is supported
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setRecognitionSupported(false);
      console.log('Speech recognition not supported in this browser');
    }
  }, []);
  
  // Function to start voice recognition
  const startVoiceRecognition = () => {
    if (!recognitionSupported) return;
    
    // Create recognition object with browser prefix if needed
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognitionAPI) {
      recognitionRef.current = new SpeechRecognitionAPI();
      const recognition = recognitionRef.current;
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsRecording(true);
        setInterimTranscript('');
        console.log('Voice recognition started');
      };
      
      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let currentInterimTranscript = '';
        
        // Process the results
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            currentInterimTranscript += transcript;
          }
        }
        
        // Update the prompt with final results
        if (finalTranscript) {
          setPrompt(prev => {
            const newValue = prev + ' ' + finalTranscript;
            return newValue.trim();
          });
        }
        
        // Update interim transcript for display
        setInterimTranscript(currentInterimTranscript);
      };
      
      recognition.onerror = (event: any) => {
        console.error('Voice recognition error:', event.error);
        stopVoiceRecognition();
      };
      
      recognition.onend = () => {
        // Add any remaining interim transcript as final when speech ends
        if (interimTranscript) {
          setPrompt(prev => {
            const newValue = prev + ' ' + interimTranscript;
            return newValue.trim();
          });
          setInterimTranscript('');
        }
        setIsRecording(false);
        console.log('Voice recognition ended');
      };
      
      recognition.start();
    }
  };
  
  // Function to stop voice recognition
  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
      setIsRecording(false);
    }
  };
  
  // Toggle voice recognition
  const toggleVoiceRecognition = () => {
    if (isRecording) {
      stopVoiceRecognition();
    } else {
      startVoiceRecognition();
    }
  };
  
  // Add handler for notifications
  const handleNotificationsUpdated = (event: CustomEvent) => {
    if (event.detail?.role === 'patient') {
      loadNotificationsCount();
    }
  };

  // Add event listener for custom notification events
  useEffect(() => {
    window.addEventListener('notifications-updated', 
      handleNotificationsUpdated as EventListener);

    // Initial load
    loadNotificationsCount();

    // Cleanup
    return () => {
      window.removeEventListener('notifications-updated', 
        handleNotificationsUpdated as EventListener);
    };
  }, []);

  // Add this function in the component
  const loadNotificationsCount = () => {
    const count = getUnreadNotificationsCount('patient');
    setNotificationCount(count);
  };

  // Add this function in the component
  const markNotificationsAsRead = () => {
    const notifications = getNotifications('patient');
    notifications.forEach(notification => {
      if (!notification.isRead) {
        markNotificationAsRead(notification.id, 'patient');
      }
    });
    loadNotificationsCount();
  };
  
  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '1.5rem' 
      }}>
        <PageTitle>Patient Dashboard</PageTitle>
        
        <div style={{ position: 'relative' }}>
          <NotificationBell 
            hasNotifications={notificationCount > 0}
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (!showNotifications && notificationCount > 0) {
                markNotificationsAsRead();
              }
            }}
          >
            <FaBell />
            {notificationCount > 0 && (
              <NotificationCounter>{notificationCount}</NotificationCounter>
            )}
          </NotificationBell>
          
          {showNotifications && (
            <NotificationsContainer>
              <NotificationHeader>
                <NotificationTitle>Notifications</NotificationTitle>
                <NotificationClearAll onClick={markNotificationsAsRead}>
                  Mark all as read
                </NotificationClearAll>
              </NotificationHeader>
              
              {(() => {
                const notifications = getNotifications('patient');
                
                if (notifications.length === 0) {
                  return (
                    <NotificationEmpty>
                      No notifications
                    </NotificationEmpty>
                  );
                }
                
                return notifications.map(notification => (
                  <NotificationItem 
                    key={notification.id}
                    onClick={() => {
                      markNotificationAsRead(notification.id, 'patient');
                      // If it's a doctor response, switch to responses tab
                      if (notification.type === 'doctor_response') {
                        handleTabClick('responses');
                      }
                      setShowNotifications(false);
                    }}
                    style={{
                      backgroundColor: notification.isRead ? 'transparent' : '#ebf8ff'
                    }}
                  >
                    <NotificationText>{notification.text}</NotificationText>
                    <NotificationTime>
                      {new Date(notification.timestamp).toLocaleString()}
                    </NotificationTime>
                  </NotificationItem>
                ));
              })()}
            </NotificationsContainer>
          )}
        </div>
      </div>
      
      {/* Add Tab Navigation */}
      <TabsContainer>
        <Tab 
          active={activeTab === 'ask'} 
          onClick={() => handleTabClick('ask')}
        >
          All Responses
        </Tab>
        <Tab 
          active={activeTab === 'responses'} 
          onClick={() => handleTabClick('responses')}
        >
          Doctor Verified Only
          {unseenResponseCount > 0 && (
            <NotificationBadge>{unseenResponseCount}</NotificationBadge>
          )}
        </Tab>
      </TabsContainer>
      
      {/* Ask Health Assistant Tab */}
      {activeTab === 'ask' && (
        <PromptSection>
          <PromptTitle>Health Assistant</PromptTitle>
          <PromptDescription>
            Ask health-related questions and receive AI-generated responses immediately. Doctors will verify responses for medical accuracy.
          </PromptDescription>
          
          {isRecording && (
            <RecordingIndicator>
              <FaMicrophone /> Recording your voice... Speak clearly into your microphone
            </RecordingIndicator>
          )}
          
          <PromptForm onSubmit={handleSubmit}>
            <PromptTextarea 
              value={isRecording ? `${prompt}${interimTranscript ? ' ' + interimTranscript : ''}` : prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your symptoms, ask about lab reports, request medicine recommendations, or any other health-related questions..."
            />
            
            {attachments.length > 0 && (
              <AttachmentsContainer>
                {attachments.map(attachment => (
                  <AttachmentItem key={attachment.id}>
                    <AttachmentPreview type={attachment.type}>
                      {attachment.type === 'image' && (
                        <img src={attachment.previewUrl} alt={attachment.file.name} />
                      )}
                      {attachment.type === 'video' && (
                        <video src={attachment.previewUrl} />
                      )}
                      {attachment.type === 'file' && (
                        <FaFile />
                      )}
                    </AttachmentPreview>
                    <AttachmentName>{attachment.file.name}</AttachmentName>
                    <RemoveAttachmentButton 
                      onClick={() => handleRemoveAttachment(attachment.id)}
                      type="button"
                    >
                      <FaTimes size={12} />
                    </RemoveAttachmentButton>
                  </AttachmentItem>
                ))}
              </AttachmentsContainer>
            )}
            
            {fileError && (
              <ErrorMessage>{fileError}</ErrorMessage>
            )}
            
            <UrgencyToggle>
              <UrgencyLabel onClick={() => setIsUrgent(!isUrgent)}>
                <FaBell style={{ color: isUrgent ? '#e53e3e' : '#718096', marginRight: '0.5rem' }} />
                Mark as urgent
              </UrgencyLabel>
              <UrgencySwitch isUrgent={isUrgent} onClick={() => setIsUrgent(!isUrgent)} />
            </UrgencyToggle>
            
            <ButtonContainer>
              <FormActions>
                <FileUploadButton>
                  <FaFileUpload />
                  Attach Files
                  <HiddenFileInput 
                    type="file" 
                    multiple 
                    accept=".jpg,.jpeg,.png,.gif,.webp,.mp4,.webm,.ogg,.pdf"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                  />
                </FileUploadButton>
                
                {recognitionSupported && (
                  <VoiceButton 
                    type="button"
                    onClick={toggleVoiceRecognition}
                    color={isRecording ? '#e53e3e' : '#3182ce'}
                  >
                    {isRecording ? (
                      <>
                        <FaStop />
                        Stop Recording
                      </>
                    ) : (
                      <>
                        <FaMicrophone />
                        Voice Input
                      </>
                    )}
                  </VoiceButton>
                )}
              </FormActions>
              
              <PromptButton type="submit" disabled={(!prompt.trim() && attachments.length === 0) || isSubmitting}>
                {isSubmitting ? 'Submitting...' : (
                  <>
                    <FaPaperPlane />
                    Submit
                  </>
                )}
              </PromptButton>
            </ButtonContainer>
          </PromptForm>
          
          {/* Display Submitted Questions with their AI responses */}
          {promptHistory.length > 0 && (
            <PromptHistory>
              <PromptHistoryTitle>Submitted Questions</PromptHistoryTitle>
              <div style={{ color: '#718096', fontSize: '0.875rem', marginBottom: '1rem' }}>
                AI responses are shown immediately but require doctor verification for medical accuracy.
              </div>
              {promptHistory
                // Sort unverified queries by urgency first, verified queries by timestamp
                .sort((a, b) => {
                  // First separate verified from unverified
                  if (a.isApproved && !b.isApproved) return 1; // Verified after unverified
                  if (!a.isApproved && b.isApproved) return -1; // Unverified before verified
                  
                  // If both are verified, sort by timestamp (newer first)
                  if (a.isApproved && b.isApproved) {
                    return b.timestamp - a.timestamp;
                  }
                  
                  // If both are unverified, first sort by urgency
                  if (a.isUrgent && !b.isUrgent) return -1;
                  if (!a.isUrgent && b.isUrgent) return 1;
                  
                  // If urgency is the same or both not urgent, sort by timestamp (newer first)
                  return b.timestamp - a.timestamp;
                })
                .map((item) => (
                <PromptHistoryItem key={item.id}>
                  <PromptHistoryDate>
                    <FaClock style={{ marginRight: '0.25rem' }} />
                    {formatDate(item.timestamp)}
                    {item.isUrgent && (
                      <UrgencyBadge>
                        <FaBell style={{ marginRight: '0.25rem' }} />
                        URGENT
                      </UrgencyBadge>
                    )}
                  </PromptHistoryDate>
                  <PromptHistoryText>{item.text}</PromptHistoryText>
                  
                  {item.attachments && item.attachments.length > 0 && (
                    <AttachmentsContainer>
                      {item.attachments.map(attachment => (
                        <AttachmentItem key={attachment.id}>
                          <AttachmentPreview type={attachment.type}>
                            {attachment.type === 'image' && attachment.previewUrl && (
                              <img src={attachment.previewUrl} alt={attachment.file.name} />
                            )}
                            {attachment.type === 'video' && attachment.previewUrl && (
                              <video src={attachment.previewUrl} />
                            )}
                            {attachment.type === 'file' || !attachment.previewUrl && (
                              <FaFile />
                            )}
                          </AttachmentPreview>
                          <AttachmentName>{attachment.file.name}</AttachmentName>
                        </AttachmentItem>
                      ))}
                    </AttachmentsContainer>
                  )}
                  
                  <AIResponseContainer>
                    <AIResponseHeader>
                      <FaCommentMedical style={{ marginRight: '0.5rem' }} />
                      AI Response
                      {item.responseStatus === 'loading' && (
                        <ResponseStatusBadge status="loading">Analyzing...</ResponseStatusBadge>
                      )}
                      {item.responseStatus === 'error' && (
                        <ResponseStatusBadge status="error">Failed</ResponseStatusBadge>
                      )}
                      {item.responseStatus === 'success' && !item.isApproved && (
                        <UnverifiedBadge>
                          <FaCommentMedical />
                          Unverified
                        </UnverifiedBadge>
                      )}
                      {item.responseStatus === 'success' && item.isApproved === true && (
                        <VerifiedBadge>
                          <FaCheckCircle />
                          Doctor Verified
                        </VerifiedBadge>
                      )}
                    </AIResponseHeader>
                    
                    {item.responseStatus === 'loading' && (
                      <LoadingText>Analyzing your query...</LoadingText>
                    )}
                    
                    {item.responseStatus === 'error' && (
                      <div>There was an error processing your query. Please try again.</div>
                    )}
                    
                    {item.responseStatus === 'success' && item.aiResponse && (
                      <AIResponseContent>
                        <SimpleMarkdown content={item.aiResponse} />
                      </AIResponseContent>
                    )}
                  </AIResponseContainer>
                </PromptHistoryItem>
              ))}
            </PromptHistory>
          )}
        </PromptSection>
      )}
      
      {/* Responses to Queries Tab */}
      {activeTab === 'responses' && (
        <Section>
          <SubTitle>Doctor Verified Responses</SubTitle>
          <div style={{ color: '#718096', fontSize: '0.875rem', marginBottom: '1rem' }}>
            These responses have been reviewed and verified by a doctor for medical accuracy.
          </div>
          <div>
            {(() => {
              console.log('All prompts before filtering for approved:', promptHistory);
              console.log('Prompts with approval status:', promptHistory.map(item => 
                `${item.id}: ${item.isApproved === true ? 'approved' : 'not-approved'} (${typeof item.isApproved})`
              ));
              
              // Sort again by timestamp and filter for approved responses - explicitly use === true for comparison
              const sortedHistory = [...promptHistory].sort((a, b) => b.timestamp - a.timestamp);
              const approvedResponses = sortedHistory.filter(item => item.isApproved === true);
              
              console.log('Sorted History:', sortedHistory.map(item => `${item.id}: ${item.timestamp}`));
              console.log('Filtered approved responses:', approvedResponses.map(item => item.id));
              console.log('Approved count:', approvedResponses.length);
              
              if (approvedResponses && approvedResponses.length > 0) {
                return approvedResponses.map((item) => (
                  <ResponseCard key={item.id}>
                    <ResponseCardHeader>
                      <PromptHistoryDate>
                        <FaClock style={{ marginRight: '0.25rem' }} />
                        {formatDate(item.timestamp)}
                      </PromptHistoryDate>
                      <PromptHistoryText style={{ fontSize: '1rem', fontWeight: '500', marginTop: '0.5rem' }}>
                        {item.text}
                      </PromptHistoryText>
                    </ResponseCardHeader>
                    
                    <ResponseCardBody>
                      {item.attachments && item.attachments.length > 0 && (
                        <AttachmentsContainer>
                          {item.attachments.map(attachment => (
                            <AttachmentItem key={attachment.id}>
                              <AttachmentPreview type={attachment.type}>
                                {attachment.type === 'image' && attachment.previewUrl && (
                                  <img src={attachment.previewUrl} alt={attachment.file.name} />
                                )}
                                {attachment.type === 'video' && attachment.previewUrl && (
                                  <video src={attachment.previewUrl} />
                                )}
                                {attachment.type === 'file' || !attachment.previewUrl && (
                                  <FaFile />
                                )}
                              </AttachmentPreview>
                              <AttachmentName>{attachment.file.name}</AttachmentName>
                            </AttachmentItem>
                          ))}
                        </AttachmentsContainer>
                      )}
                      
                      <AIResponseContainer>
                        <AIResponseHeader>
                          <FaCommentMedical style={{ marginRight: '0.5rem' }} />
                          Doctor's Assessment
                          <VerifiedBadge>
                            <FaCheckCircle />
                            Doctor Verified
                          </VerifiedBadge>
                        </AIResponseHeader>
                        
                        {item.aiResponse && (
                          <AIResponseContent>
                            <SimpleMarkdown content={item.aiResponse} />
                          </AIResponseContent>
                        )}
                      </AIResponseContainer>
                    </ResponseCardBody>
                  </ResponseCard>
                ));
              } else {
                return (
                  <Card>
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#718096' }}>
                      <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#a0aec0' }}>
                        <FaCommentMedical />
                      </div>
                      <h3 style={{ marginBottom: '0.5rem', color: '#4a5568' }}>No verified responses yet</h3>
                      <p>Your doctor will review and approve responses soon. Please check back later.</p>
                    </div>
                  </Card>
                );
              }
            })()}
          </div>
        </Section>
      )}
    </div>
  )
}

export default PatientDashboard 

// Add these TypeScript declarations for the Speech Recognition API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
} 