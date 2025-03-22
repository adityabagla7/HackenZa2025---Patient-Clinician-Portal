import { useState, useEffect, useRef } from 'react'
import { FaCalendarAlt, FaClipboardList, FaFileInvoiceDollar, FaPills, FaPlus, FaUserMd, FaPaperPlane, FaFileUpload, FaImage, FaVideo, FaFile, FaTimes } from 'react-icons/fa'
import styled from 'styled-components'
import { useAuth } from '../context/AuthContext'

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
`

const Tab = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  background-color: ${({ active }) => (active ? 'white' : 'transparent')};
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
}

// Interface for attachment files
interface AttachmentFile {
  id: string;
  file: File;
  previewUrl?: string;
  type: 'image' | 'video' | 'file';
}

const PatientDashboard = () => {
  const { user } = useAuth()
  const [prompt, setPrompt] = useState<string>('')
  const [promptHistory, setPromptHistory] = useState<PromptHistoryItem[]>([])
  const [attachments, setAttachments] = useState<AttachmentFile[]>([])
  const [fileError, setFileError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Allowed file types
  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg'];
  const allowedFileTypes = [...allowedImageTypes, ...allowedVideoTypes, 'application/pdf'];
  const maxFileSize = 10 * 1024 * 1024; // 10MB
  
  // Load prompt history from localStorage on component mount
  useEffect(() => {
    const savedPrompts = localStorage.getItem('patientPromptHistory')
    if (savedPrompts) {
      try {
        setPromptHistory(JSON.parse(savedPrompts))
      } catch (error) {
        console.error('Failed to parse prompt history:', error)
      }
    }
  }, [])
  
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim() && attachments.length === 0) return
    
    // Create new prompt history item
    const newPrompt: PromptHistoryItem = {
      id: Date.now().toString(),
      text: prompt,
      timestamp: Date.now(),
      attachments: attachments.map(a => ({
        id: a.id,
        file: a.file,
        previewUrl: a.previewUrl,
        type: a.type
      }))
    }
    
    // Update history state
    const updatedHistory = [newPrompt, ...promptHistory]
    
    // For localStorage, we need a simplified version without actual File objects
    const historyForStorage = updatedHistory.map(item => ({
      id: item.id,
      text: item.text,
      timestamp: item.timestamp,
      attachments: item.attachments ? item.attachments.map(a => ({
        id: a.id,
        fileName: a.file.name,
        fileType: a.file.type,
        type: a.type
      })) : undefined
    }))
    
    setPromptHistory(updatedHistory)
    
    // Save to localStorage
    localStorage.setItem('patientPromptHistory', JSON.stringify(historyForStorage))
    
    // Clear the input and attachments
    setPrompt('')
    setAttachments([])
    
    console.log('Prompt submitted:', prompt, 'with attachments:', attachments)
  }
  
  // Format date for display
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }
  
  return (
    <div>
      <PageTitle>Patient Dashboard</PageTitle>
      
      <PromptSection>
        <PromptTitle>Health Assistant</PromptTitle>
        <PromptDescription>
          Enter your health-related questions, symptoms, lab report details, or medicine inquiries below. 
          You can also attach relevant images, videos, or documents.
        </PromptDescription>
        <PromptForm onSubmit={handleSubmit}>
          <PromptTextarea 
            value={prompt}
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
            </FormActions>
            
            <PromptButton type="submit" disabled={!prompt.trim() && attachments.length === 0}>
              <FaPaperPlane />
              Submit
            </PromptButton>
          </ButtonContainer>
        </PromptForm>
        
        {promptHistory.length > 0 && (
          <PromptHistory>
            <PromptHistoryTitle>Previous Queries</PromptHistoryTitle>
            {promptHistory.map((item) => (
              <PromptHistoryItem key={item.id}>
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
                <PromptHistoryDate>{formatDate(item.timestamp)}</PromptHistoryDate>
              </PromptHistoryItem>
            ))}
          </PromptHistory>
        )}
      </PromptSection>
    </div>
  )
}

export default PatientDashboard 