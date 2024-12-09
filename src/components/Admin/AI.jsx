import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Typography, Card, CardContent, Box } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';  // Importing toast from react-toastify
import 'react-toastify/dist/ReactToastify.css';  // Import the default CSS for Toastify

const AI = () => {
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  // Generate content using AI
  const handleChatSubmit = async () => {
    if (!chatInput) return;

    setLoading(true);

    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCuZBNCAGVW-aXfNQPSKUl_UHhIkaNNN4k',
        {
          "contents": [{"parts": [{"text": chatInput}]}]
        }
      );

      // Extract and set AI response if available
      if (response.data?.candidates?.length > 0) {
        const aiResponse = response.data.candidates[0]?.content?.parts[0]?.text;
        setChatResponse(aiResponse || 'No response from AI.');
      } else {
        setChatResponse('Error: No valid response from AI.');
      }
    } catch (error) {
      console.error('Error fetching response:', error);
      setChatResponse('Sorry, something went wrong. Please try again.');
    }

    setLoading(false);
  };

  // Send the email
  const handleSendEmail = async () => {
    if (!receiverEmail || !emailSubject || !chatResponse) {
      toast.error('Please fill in all fields and generate the content before sending.');
      return;
    }

    setSendingEmail(true);

    try {
      // POST request to send email
      const response = await axios.post('http://localhost:3000/api/admin/send-email', {
        recipient: receiverEmail,
        subject: emailSubject,
        content: chatResponse,
      });

      if (response.data.success) {
        toast.success('Email sent successfully!');
      } else {
        toast.error('Failed to send email. Please try again.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send email.');
    }

    setSendingEmail(false);
  };

  // Render paragraphs with bold text detection
  const renderParagraph = (paragraph, index) => {
    return (
      <Typography key={index} variant="body1" component="p" sx={{ textAlign: 'left' }}>
        {paragraph}
      </Typography>
    );
  };

  return (
    <Box>
      <Box sx={{ padding: '20px', marginBottom: "40vh" }}>
        <Typography variant="h4" gutterBottom style={{ fontFamily: '"Outfit", sans-serif' }}>
          Send Announcement through AI.
        </Typography>

        {/* Recipient Email Field */}
        <TextField
          label="Recipient Email"
          variant="outlined"
          value={receiverEmail}
          onChange={(e) => setReceiverEmail(e.target.value)}
          fullWidth
          margin="normal"
        />

        {/* Email Subject Field */}
        <TextField
          label="Email Subject"
          variant="outlined"
          value={emailSubject}
          onChange={(e) => setEmailSubject(e.target.value)}
          fullWidth
          margin="normal"
        />

        {/* AI Content Generation Prompt */}
        <TextField
          label="Prompt for Email Content Generation"
          variant="outlined"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          fullWidth
          margin="normal"
        />

        <div className="mt-6 flex items-center gap-6">
          {/* Generate Button */}
          <Button
            variant="contained"
            style={{ border: "none", background: "#41B06E" }}
            onClick={handleChatSubmit}
            disabled={loading}
          >
            Generate
          </Button>

          {/* Send Email Button */}
          <Button
            variant="contained"
            style={{ border: "none", background: "#41B06E" }}
            onClick={handleSendEmail}
            disabled={sendingEmail || loading}
          >
            {sendingEmail ? 'Sending...' : 'Send Email'}
          </Button>
        </div>

        {loading && <CircularProgress sx={{ marginTop: '10px' }} />}

        {/* Display AI Response */}
        {chatResponse && !loading && (
          <Card sx={{ marginTop: '20px' }}>
            <div style={{ border: "2px solid black", margin: "2vw", borderRadius: "5px" }}>
              <CardContent sx={{ padding: '2vw', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" gutterBottom>
                  Generated Email Content:
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'left' }}>
                  {chatResponse}
                </Typography>
              </CardContent>
            </div>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default AI;
