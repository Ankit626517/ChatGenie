import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const Chatbox = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  async function generateAns() {
    setAnswer("Ruko jra me soch rha hu...");
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDq_j0cBFJN7qNuYiZqxM7UkMuVCzQXeP8",
        method: "POST",
        data: {
          contents: [{
            parts: [{ text: question }]
          }]
        }
      });
      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      setAnswer("Sorry, something went wrong. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg shadow-2xl p-6 w-full max-w-2xl border border-white">
        <h1 className="text-3xl font-bold text-center text-white mb-6"> 🔍 Ask Anything</h1>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-3 bg-transparent text-white focus:outline-none placeholder-gray-400 resize-none"
            placeholder="Type your question here..."
            rows="3"
          ></textarea>
          {answer && (
            <div className="mt-4 p-3 bg-gray-700 rounded-lg border border-gray-600">
              <p className="text-white">{answer}</p>
            </div>
          )}
        </div>
        <button
          onClick={generateAns}
          className="w-full mt-4 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-all transform hover:scale-105 active:scale-95 border border-gray-500"
        >
          Get Answer
        </button>
      </div>
    </div>
  );
};

export default Chatbox;



















































// import React from 'react';
// import axios from 'axios';
// import { useState } from 'react';

// const Chatbox = () => {
//   const [question, setQuestion] = useState('');
//   const [answer, setAnswer] = useState('');

//   async function generateAns() {
//     setAnswer("Ruko jra me soch rha hu...");
//     try {
//       const response = await axios({
//         url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDq_j0cBFJN7qNuYiZqxM7UkMuVCzQXeP8",
//         method: "POST",
//         data: {
//           contents: [{
//             parts: [{ text: question }]
//           }]
//         }
//       });
//       setAnswer(response.data.candidates[0].content.parts[0].text);
//     } catch (error) {
//       setAnswer("Sorry, something went wrong. Please try again.");
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
//       <div className="bg-gray-900 rounded-lg shadow-2xl p-6 w-full max-w-2xl border border-blue-600">
//         <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">Ask Anything</h1>
//         <div className="bg-gray-800 rounded-lg p-4">
//           <textarea
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             className="w-full p-3 bg-transparent text-white focus:outline-none placeholder-gray-400 resize-none"
//             placeholder="Type your question here..."
//             rows="3"
//           ></textarea>
//           {answer && (
//             <div className="mt-4 p-3 bg-gray-700 rounded-lg">
//               <p className="text-blue-200">{answer}</p>
//             </div>
//           )}
//         </div>
//         <button
//           onClick={generateAns}
//           className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 active:scale-95"
//         >
//           Get Answer
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chatbox;



// import React from 'react';
// import axios from 'axios';
// import { useState } from 'react';

// const Chatbox = () => {
//   const [question, setQuestion] = useState('');
//   const [conversation, setConversation] = useState([]);

//   async function generateAns() {
//     if (!question.trim()) return; // Don't send empty questions

//     // Add the user's question to the conversation
//     setConversation((prev) => [...prev, { type: 'question', text: question }]);

//     // Show a loading message
//     setConversation((prev) => [...prev, { type: 'answer', text: 'Ruko jra me soch rha hu...' }]);

//     try {
//       const response = await axios({
//         url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDq_j0cBFJN7qNuYiZqxM7UkMuVCzQXeP8",
//         method: "POST",
//         data: {
//           contents: [{
//             parts: [{ text: question }]
//           }]
//         }
//       });

//       // Remove the loading message and add the actual answer
//       setConversation((prev) => [
//         ...prev.filter((msg) => msg.text !== 'Ruko jra me soch rha hu...'),
//         { type: 'answer', text: response.data.candidates[0].content.parts[0].text }
//       ]);
//     } catch (error) {
//       // Handle errors
//       setConversation((prev) => [
//         ...prev.filter((msg) => msg.text !== 'Ruko jra me soch rha hu...'),
//         { type: 'answer', text: "Sorry, something went wrong. Please try again." }
//       ]);
//     }

//     // Clear the input field
//     setQuestion('');
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
//       <div className="bg-gray-900 rounded-lg shadow-2xl p-6 w-full max-w-2xl border border-blue-600 flex flex-col h-[600px]">
//         <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">Ask Anything</h1>
//         <div className="flex-1 overflow-y-auto mb-4 space-y-4">
//           {conversation.map((msg, index) => (
//             <div
//               key={index}
//               className={`flex ${msg.type === 'question' ? 'justify-end' : 'justify-start'}`}
//             >
//               <div
//                 className={`max-w-[80%] p-3 rounded-lg ${
//                   msg.type === 'question'
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-gray-800 text-blue-200'
//                 }`}
//               >
//                 <p>{msg.text}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="flex gap-2">
//           <textarea
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             className="w-full p-3 bg-gray-800 text-white border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all placeholder-gray-400"
//             placeholder="Type your question here..."
//             rows="1"
//             onKeyPress={(e) => {
//               if (e.key === 'Enter' && !e.shiftKey) {
//                 e.preventDefault();
//                 generateAns();
//               }
//             }}
//           ></textarea>
//           <button
//             onClick={generateAns}
//             className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 active:scale-95"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chatbox;






