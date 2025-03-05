const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Replace with your own OpenAI API key
const OPENAI_API_KEY = 'sk-YourAPIKeyHere';

app.use(express.json());

app.post('/api/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userMessage }]
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        
        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch response from OpenAI' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
