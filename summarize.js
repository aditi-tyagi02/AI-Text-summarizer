const axios = require('axios');
require('dotenv').config();

async function summarizeText(text) {
  const data = JSON.stringify({
    "inputs": text,
    "parameters": {
      "max_length": 100,
      "min_length": 30
    }
  });

  const config = {
    method: 'post',
    url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
    },
    data: data
  };

  try {
    const response = await axios(config);
    return response.data[0].summary_text;
  } catch (error) {
    console.error('Error in summarizeText:', error);
    throw error;
  }
}

module.exports = summarizeText;

