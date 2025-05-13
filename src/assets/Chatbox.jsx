import React, { useState } from 'react';
import axios from 'axios';

const Chatbox = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const generateAns = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("🤔 Thinking...");
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDq_j0cBFJN7qNuYiZqxM7UkMuVCzQXeP8`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          contents: [
            {
              parts: [{ text: question }],
            },
          ],
        },
      });

      const reply = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response found.";
      setAnswer(reply);
      setQuestion(""); // ✅ Clear the text area after response
    } catch (error) {
      console.error("API Error:", error);
      setAnswer("❌ Sorry, something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔑 Press Enter to submit, Shift+Enter for newline
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      generateAns();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg shadow-2xl p-6 w-full max-w-2xl border border-white">
        <h1 className="text-3xl font-bold text-center text-white mb-6">🔍 Ask Anything</h1>

        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-3 bg-transparent text-white focus:outline-none placeholder-gray-400 resize-none"
            placeholder="Type your question here... (Press Enter to send, Shift+Enter for newline)"
            rows="3"
          ></textarea>

          {answer && (
            <div className="mt-4 p-3 bg-gray-700 rounded-lg border border-gray-600 max-h-[300px] overflow-y-auto">
              <p className="text-white whitespace-pre-line">{answer}</p>
            </div>
          )}
        </div>

        <button
          onClick={generateAns}
          disabled={loading || !question.trim()}
          className={`w-full mt-4 py-2 px-4 rounded-lg border border-gray-500 transition-all transform 
            ${loading || !question.trim()
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gray-700 hover:bg-gray-600 hover:scale-105 active:scale-95'
            } text-white`}
        >
          {loading ? "Generating..." : "Get Answer"}
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
