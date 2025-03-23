# Clinician-Patient Portal

## Overview
A comprehensive healthcare platform that connects clinicians and patients, enabling secure medical consultations, record management, and healthcare monitoring.

## Features

### Authentication
- Multi-role login system (Clinician, Patient)
- Secure authentication with role-based access control
- Password-protected accounts

### Patient Dashboard
- AI-powered medical queries with file attachment support
- Voice recognition for medical queries
- Real-time notification system
- Medical appointment tracking
- Prescription management

### Clinician Dashboard
- Patient management
- Task management system
- Patient query review and response
- AI-generated response verification
- Urgent patient query for efficient response times

### Medical Records
- Comprehensive medical history tracking
- Record categorization (visits, tests, prescriptions, reports)
- Document storage and retrieval
- Searchable medical records
- Filtering by record type and date

### Medical Details
- Patient health profile management
- Medical history documentation
- Allergy and condition tracking
- Height, weight, and vital statistics


### Communication
- Secure messaging between patients and clinicians
- Notification system for important updates
- Response verification system

### Profile Management
- User profile customization
- Contact information management
- Security settings

### Appointment Management (to be implemented later)
- Appointment scheduling and tracking
- Status updates (upcoming, pending, completed, canceled)
- Appointment details with clinician information
- Calendar integration

### Prescription Management (to be implemented later)
- Digital prescription tracking
- Medication details and instructions
- Refill status monitoring
- Searchable prescription history

### Billing (to be implemented later)
- Medical expense tracking
- Payment history
- Invoice management
- Insurance claim status


## Technical Stack
- **Frontend:** React with TypeScript
- **Backend:** Node.js with Express
- **Database:** PostgreSQL
- **Authentication:** JWT-based authentication

## How to Run
1. **Frontend:**
    - Navigate to the `Frontend` directory: `cd Frontend`
    - Install all npm modules: `npm install`
    - Start the frontend server: `npm start`
2. **Backend:**
    - Navigate to the `Backend` directory: `cd Backend`
    - Install the dotenv library: `npm install dotenv`
    - Start the backend servers:
      - `nodemon index.js`
      - `nodemon server.js`

Use three terminals simultaneously to run the frontend and backend servers.

## Important Note
Please ensure you have the `.env` file with the necessary private keys and configurations. This file is not included in the GitHub repository for security reasons. Without these keys, the APIs will not function correctly. You can obtain the required keys from the project administrator.

- Place the `.env` file in the `Backend` directory.
- Ensure it contains all the necessary environment variables.

Example `.env` file:
```
GOOGLE_CLIENT_ID=YOUR_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_SECRET_KEY
PG_USER="postgres"
PG_HOST="localhost"
PG_DATABASE="Patient-Clinician Portal"
PG_PASSWORD="YOUR_PG_PASSWORD"
PG_PORT="5432"
GOOGLE_GEMINI_KEY=YOUR_GEMINI_KEY
```
