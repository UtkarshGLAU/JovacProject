require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 5000;

const mongoUri = process.env.MONGO_URI; 
const client = new MongoClient(mongoUri);

let db;
client.connect()
    .then(() => {
        db = client.db('SummarAIze'); 
        console.log('Connected to MongoDB');
    })
    .catch(err => console.error('Failed to connect to MongoDB', err));

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/summarize', async (req, res) => {
    const text = req.body.text;
    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
            { inputs: text },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        if (response.data && response.data[0].summary_text) {
            const summary = response.data[0].summary_text;

            const historyItem = {
                text,
                summary,
                date: new Date(date.getTime() + 330 * 60 * 1000).toISOString(),
            };
            await db.collection('history').insertOne(historyItem);

            res.json({ summary });
        } else {
            res.status(500).json({ error: 'Unexpected response from API' });
        }
    } catch (error) {
        console.error('Error with Hugging Face API:', error.message);
        res.status(500).json({ error: 'Failed to summarize the text. Try again later.' });
    }
});

app.get('/history', async (req, res) => {
    try {
        const history = await db.collection('history').find().sort({ date: -1 }).limit(10).toArray();
        res.json({ history });
    } catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).json({ error: 'Failed to fetch history' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
