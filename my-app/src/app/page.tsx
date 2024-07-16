"use client"

import { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  // const textRef = useRef('')

  const handleSubmit = async () => {
    const response = await axios.post('http://127.0.0.1:5000/api/summarize', { withCredentials: true });
    console.log(response)
    setSummary(response.data.summary)
  };

  return (
    <div className="container">
      <input className="text-black text-opacity-100 border p-2 w-full"
        placeholder="Paste or type your text here..." 
        value={text} 
        onChange={e => setText(e.target.value)}
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