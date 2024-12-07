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
    console.log('Sending request to Hugging Face API');
    const response = await axios(config);
    console.log('Received response from Hugging Face API');
    if (response.data && response.data[0] && response.data[0].summary_text) {
      return response.data[0].summary_text;
    } else {
      throw new Error('Unexpected response format from Hugging Face API');
    }
  } catch (error) {
    console.error('Error in summarizeText:', error.response ? error.response.data : error.message);
    throw error;
  }
}

module.exports = summarizeText;

