require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 8000;

const minUser  = 5;
const minPass = 8;

const RECAPTCHA_SECRET_KEY = process.env.CAP_SECRET_KEY;
if (!RECAPTCHA_SECRET_KEY) {
    console.error('ERROR: CAP_SECRET_KEY is not defined in .env');
    process.exit(1);
}

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:4173", "http://localhost:3000"],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));
app.use(express.json()); // Body parser for JSON requests

const getClientIp = (req) => {
  // 1. Check for 'x-forwarded-for' header (common with proxies like Nginx)
  const forwardedFor = req.headers['x-forwarded-for'];
  
  // 2. If header exists, take the first IP (comma-separated list)
  if (forwardedFor) {
    return typeof forwardedFor === 'string' 
      ? forwardedFor.split(',')[0].trim() 
      : forwardedFor[0].trim();
  }
  
  // 3. Fallback to Express's req.ip
  if (req.ip) return req.ip;
  
  // 4. Final fallback to legacy connection remoteAddress
  return req.connection?.remoteAddress || 'unknown';
};

// --- Routes ---

// Test endpoint (optional)
app.get('/', (req, res) => {
    res.send('Express server is running!');
});

// reCAPTCHA and Form Submission Endpoint
app.post('/cap', async (req, res) => {
    const { name, password, recaptchaToken } = req.body;
    const userIp = req.ip || req.connection.remoteAddress; // Get user's IP

    console.log('Received form submission:');
    console.log('Name:', name);
    console.log('reCAPTCHA Token:', recaptchaToken ? 'Received' : 'Missing');
    console.log('User IP:', userIp);

    // 1. Server-side data validation
    if (!name || name.length < minUser) {  
        return res.status(400).json({ success: false, error: `Name must be at least ${minUser} characters.` });
    }
    if (!password || password.length < minPass) {
        return res.status(400).json({ success: false, error: `Password must be at least ${minPass} characters.` });
    }
    if (!recaptchaToken) {
        return res.status(400).json({ success: false, error: 'reCAPTCHA token is missing.' });
    }

    // 2. Verify reCAPTCHA token with Google
    try {
        const userIp = getClientIp(req);
        const googleResponse = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify`,
            null, // No data in the request body, send as URL parameters
            {
                params: {
                    secret: RECAPTCHA_SECRET_KEY,
                    response: recaptchaToken,
                    remoteip: userIp,
                },
            }
        );

        const { success, 'error-codes': errorCodes } = googleResponse.data;

        if (success) {
            console.log(`Successfully validated and received: Name=${name}`);
            return res.status(200).json({ success: true, message: 'Form submitted and reCAPTCHA verified!' });
        } else {
            console.error('reCAPTCHA Verification Failed. Error codes:', errorCodes);
            return res.status(403).json({
                success: false,
                error: 'reCAPTCHA verification failed. Are you a robot?',
                details: errorCodes || ['unknown_error']
            });
        }

    } catch (error) {
        console.error('Error during reCAPTCHA verification or backend processing:', error.message);
        if (error.response) {
            console.error('Google reCAPTCHA API error response:', error.response.data);
            return res.status(500).json({ success: false, error: 'Failed to verify reCAPTCHA with Google.', details: error.response.data });
        }
        return res.status(500).json({ success: false, error: 'Internal server error during form submission.' });
    }
});

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});