const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const summarizeText = require('./summarize.js');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/api/summarize', async (req, res) => {
  try {
    const text = req.body.text_to_summarize;
    if (!text) {
      return res.status(400).json({ error: 'No text provided for summarization.' });
    }
    console.log('Received text for summarization:', text.substring(0, 100) + '...');
    const summary = await summarizeText(text);
    console.log('Summary generated successfully');
    res.json({ summary });
  } catch (error) {
    console.error('Error in /api/summarize:', error);
    res.status(500).json({ error: 'An error occurred while summarizing the text.', details: error.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

