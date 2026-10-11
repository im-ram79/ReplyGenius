require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { generateReply } = require('./services/gemini');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ReplyGenius',
    timestamp: new Date().toISOString(),
    apiKeyConfigured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '')
  });
});

// Main generate reply endpoint
app.post('/api/generate', async (req, res) => {
  try {
    const { message, language = 'english', tone = 'friendly' } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide a valid customer message.'
      });
    }

    if (message.length > 3000) {
      return res.status(400).json({
        status: 'error',
        message: 'Message is too long. Please keep under 3000 characters.'
      });
    }

    const validLanguages = ['english', 'hindi', 'gujarati'];
    const validTones = ['friendly', 'professional', 'apologetic'];

    const selectedLang = validLanguages.includes(language.toLowerCase()) ? language.toLowerCase() : 'english';
    const selectedTone = validTones.includes(tone.toLowerCase()) ? tone.toLowerCase() : 'friendly';

    const result = await generateReply({
      message: message.trim(),
      language: selectedLang,
      tone: selectedTone
    });

    return res.json({
      status: 'success',
      reply: result.reply,
      language: result.language,
      tone: result.tone,
      isSimulated: result.isSimulated
    });
  } catch (error) {
    console.error('API /api/generate error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to generate response. Please try again.'
    });
  }
});

// Fallback to index.html for single-page app routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(` ReplyGenius Server Running`);
    console.log(` URL: http://localhost:${PORT}`);
    console.log(` Gemini Key: ${process.env.GEMINI_API_KEY ? 'Configured ✓' : 'Using Zero-Cost Smart Fallback Mode'}`);
    console.log(`===============================================`);
  });
}

module.exports = app;
