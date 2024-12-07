const express = require('express');
const app = express();
require('dotenv').config();
const summarizeText = require('./summarize.js');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/api/summarize', async (req, res) => {
  try {
    const text = req.body.text_to_summarize;
    const summary = await summarizeText(text);
    res.json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while summarizing the text.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

