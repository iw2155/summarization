"use client"

import { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  // const textRef = useRef('')

  const handleSubmit = async () => {
    const response = await axios.post('http://127.0.0.1:5000/api/summarize', { text });
    console.log(response.data.summary)
    setSummary(response.data.summary);
  };

  return (
    <div className="container mx-auto p-4">
      <textarea
        className="w-full h-48 p-2 border"
        placeholder="Paste or type your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="mt-2 p-2 bg-blue-500 text-white"
        onClick={handleSubmit}
      >
        Summarize
      </button>
      {summary && (
        <div className="mt-4 p-2 border">
          <h2 className="text-xl font-bold">Summary</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default Home;