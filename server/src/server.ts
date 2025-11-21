import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());

interface GenerateRequest {
    prompt: string;
    language: 'cpp' | 'javascript' | 'python';
}

const MOCK_RESPONSES: Record<string, string> = {
    cpp: `#include <iostream>
#include <algorithm>
#include <string>

std::string reverseString(std::string str) {
    std::reverse(str.begin(), str.end());
    return str;
}

int main() {
    std::string s = "Hello World";
    std::cout << reverseString(s) << std::endl;
    return 0;
}`,
    javascript: `function reverseString(str) {
  return str.split('').reverse().join('');
}

console.log(reverseString("Hello World"));`,
    python: `def reverse_string(s):
    return s[::-1]

print(reverse_string("Hello World"))`
};

app.post('/generate', (req, res) => {
    const { prompt, language } = req.body as GenerateRequest;

    console.log(`Received prompt: "${prompt}" for language: ${language}`);

    // Simple mock logic: always return the reverse string example for now,
    // but respecting the requested language.
    // In a real app, this would call an LLM.

    const code = MOCK_RESPONSES[language] || '// Language not supported';

    // Simulate delay
    setTimeout(() => {
        res.json({ code });
    }, 500);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
