require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { Pool } = require('pg')

const app = express()
const PORT = process.env.PORT || 3001

// Configure PostgreSQL connection
const pool = new Pool({
      user: process.env.PG_USER,
     host: process.env.PG_HOST,
     database: process.env.PG_DATABASE,
     password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT        // Default PostgreSQL port (change if needed)
})

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection error:', err.stack)
  } else {
    console.log('✅ Connected to PostgreSQL database:', res.rows[0].now)
  }
})

// Configure CORS to allow requests from your frontend
app.use(cors({
  origin: 'http://localhost:3000', // Your React app's address
  credentials: true
}))

app.use(bodyParser.json())

// Add simple logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Test endpoint
app.get('/api/test', (req, res) => {
  console.log('Test endpoint accessed');
  res.json({ message: 'API server is working!' });
})

// Registration endpoint
app.post('/api/register', async (req, res) => {
  console.log('Registration endpoint accessed');
  
  // Check if we received data
  if (!req.body) {
    console.log('No request body received');
    return res.status(400).json({ success: false, message: 'No data received' });
  }
  
  console.log('Request body:', req.body);
  
  // Extract registration data
  const { name, email, password, phone, healthInfo } = req.body;
  
  try {
    // Parse name to extract first name and surname (assuming format is "First Last")
    let firstName = name;
    let surname = '';
    
    if (name.includes(' ')) {
      const nameParts = name.split(' ');
      firstName = nameParts[0];
      // Join the rest as surname in case there are multiple parts
      surname = nameParts.slice(1).join(' ');
    }
    
    // Format allergies for database storage
    const allergies = healthInfo.allergies || 'None';
    
    // Log the data being saved
    console.log('\n===== SAVING USER TO DATABASE =====');
    console.log('Name:', firstName);
    console.log('Surname:', surname);
    console.log('Phone:', phone);
    console.log('Age:', healthInfo.age);
    console.log('Height:', healthInfo.height);
    console.log('Weight:', healthInfo.weight);
    console.log('Blood Group:', healthInfo.bloodGroup);
    console.log('Allergies:', allergies);
    console.log('===================================\n');
    
    // Insert data into the Patients_Table
    const insertQuery = `
      INSERT INTO Patients_Table (
        phone_number, name, surname, age, height, weight, BloodGrp, prevAllergy
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id;
    `;
    
    const values = [
      phone,
      firstName,
      surname,
      healthInfo.age,
      healthInfo.height,
      healthInfo.weight,
      healthInfo.bloodGroup,
      allergies
    ];
    
    const result = await pool.query(insertQuery, values);
    const patientId = result.rows[0].id;
    
    console.log(`✅ Patient saved to database with ID: ${patientId}`);
    
    // Send success response with the new patient ID
    res.status(201).json({
      success: true,
      message: 'User registered successfully!',
      userId: patientId
    });
  } catch (error) {
    console.error('❌ Database error:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving patient data to database',
      error: error.message
    });
  }
})

// Handle 404 errors
app.use((req, res) => {
  console.log(`404 - Not Found: ${req.method} ${req.url}`);
  res.status(404).json({ success: false, message: 'API endpoint not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
  console.log(`- Test endpoint: http://localhost:${PORT}/api/test`);
  console.log(`- Registration endpoint: http://localhost:${PORT}/api/register`);
});