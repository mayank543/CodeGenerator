# Copilot - AI Code Generator

This repository is submitted as part of a Frontend assignment. The goal is to build a lightweight “Mini Code Copilot” web app where users enter natural‑language prompts and receive generated code suggestions.

---

## Quick Setup
Getting Copilot up and running is a easy. Follow these simple steps:

### Prerequisites
-   Node.js installed on your machine.
-   A Google Gemini API Key (Get one [here](https://aistudio.google.com/app/apikey)).

### Installation

1.  **Clone the repository** (if applicable) or navigate to the project folder.

2.  **Backend Setup**:
    ```bash
    cd server
    npm install
    # Create a .env file in the server directory
    echo "GEMINI_API_KEY=your_api_key_here" > .env
    npm run dev
    ```
    *The server will start on `http://localhost:5001`.*

3.  **Frontend Setup**:
    Open a new terminal window.
    ```bash
    cd client
    npm install
    npm run dev
    ```
    *The application will open in your browser, typically at `http://localhost:5173`.*

---

## Design & Architecture

I built this assignment(copilot) with a focus on **usability** and **clean aesthetics**.

*   **Frontend**: Built with **React** and **TypeScript** for type safety and component modularity. I used **Tailwind CSS** for styling to achieve a modern, responsive look with dark mode support. The UI is split into a collapsible history sidebar and a main workspace for prompting and code output.
*   **Backend**: A lightweight **Express.js** server handles API requests. It acts as a secure bridge to the **Google Gemini API**, keeping your API keys safe on the server side.
*   **State Management**: Local state (`useState`) handles immediate interactions, while `localStorage` is used to persist your history, theme preferences, and font size settings, so you can pick up right where you left off.

---

## ✨ Features

### Core Functionality
*   **Multi-Language Support**: Generate code in **JavaScript, Python, C++, Java, and C**.
*   **Smart History**: Your prompts and generated code are automatically saved. Access them anytime from the sidebar.
*   **Persistent Storage**: History, theme, and font settings are saved to your browser's local storage.
*   **Search & Filter**: Easily find past prompts by searching text or filtering by language or favourite prompts. or favourite prompts.

### User Experience
*   **Copy to Clipboard**: Copy generated code with a single click.
*   **Adjustable Font Size**: Customize the code viewer text size for better readability.
*   **Theme Toggle**: Switch between a crisp **Light Mode** and a sleek **Dark Mode**.
*   **Responsive Design**: Fully optimized for mobile devices. Code on the go!

### Bonus & Custom Additions
*   **Favorites**: Mark your most-used prompts as "Favourites" for quick access via the star button in the input area.
*   **Manual Code Editing**: This is important very useful bonus feature. we can directly edit the generated code in the output panel and copy the modified version.
*   **Smooth Animations**:
    *   Slide-in/out animations for the history panel.
    *   Satisfying half-rotation animation on the sidebar toggle button.
    *   Minimalistic, fading scrollbars that don't clutter the UI(default scroll bar styling didn't match with the UI).

---

## API Referenceault scroll bar styling didn't match with the UI).

---

## API Reference

The backend exposes a simple endpoint to generate code.

### `POST /generate`

**Endpoint**: `http://localhost:5001/generate`

**Payload Format**:
```json
{
  "prompt": "Write a function to calculate the factorial of a number",
  "language": "python"
}
```

**Response Format**:
```json
{
  "code": "def factorial(n):\n    if n == 0:\n        return 1\n    else:\n        return n * factorial(n-1)"
}
```

---

## What else I could have done?



1. I could have worked on a feature that lets you automatically switch to correct language based on the prompt.
2. I could have added more smooth animations depending on the user's preference.
3. Instead of just simple dark and light mode, I could have added more color themes.

Happy Coding!
