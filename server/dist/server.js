"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const generative_ai_1 = require("@google/generative-ai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 5001;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
app.post('/generate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prompt, language } = req.body;
    console.log(`Received prompt: "${prompt}" for language: ${language}`);
    try {
        const fullPrompt = `Write a ${language} code snippet for the following prompt: ${prompt}. Only return the code, no markdown formatting or explanation.`;
        const result = yield model.generateContent(fullPrompt);
        const response = yield result.response;
        let code = response.text();
        // Clean up potential markdown code blocks if the model returns them despite instructions
        code = code.replace(/^```[a-z]*\n/i, '').replace(/\n```$/, '');
        res.json({ code });
    }
    catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ error: "Failed to generate code" });
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
