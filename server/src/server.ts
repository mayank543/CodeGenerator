import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

interface GenerateRequest {
    prompt: string;
    language: 'cpp' | 'javascript' | 'python' | 'java' | 'c';
}

app.post('/generate', async (req, res) => {
    const { prompt, language } = req.body as GenerateRequest;

    console.log(`Received prompt: "${prompt}" for language: ${language}`);

    try {
        const fullPrompt = `Write a ${language} code snippet for the following prompt: ${prompt}. Only return the code, no markdown formatting or explanation.`;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        let code = response.text();

        // Clean up potential markdown code blocks if the model returns them despite instructions
        code = code.replace(/^```[a-z]*\n/i, '').replace(/\n```$/, '');

        res.json({ code });
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ error: "Failed to generate code" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
