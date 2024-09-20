require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

// console.log('Hugging Face API Key:', process.env.HUGGING_FACE_API_KEY);

app.use(cors()); 
app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.post('/summarize', async (req, res) => {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
        return res.status(400).json({ error: 'Text is required for summarization.' });
    }

    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
            { inputs: text },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.data && response.data[0].summary_text) {
            res.json({ summary: response.data[0].summary_text });
        } else {
            res.status(500).json({ error: 'Unexpected response from API' });
        }
    } catch (error) {
        console.error('Error with Hugging Face API:', error.message);
        res.status(500).json({ error: 'Failed to summarize the text. Try again later.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
