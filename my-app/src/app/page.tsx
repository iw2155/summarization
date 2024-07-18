"use client"

import { useState } from 'react';
import axios from 'axios';
import CollapsiblePanel from './collapsePanel';

const Home = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');

  const handleSubmit = async () => {
    const response = await axios.post('http://127.0.0.1:5000/api/summarize', { withCredentials: true });
    console.log(response);
    setSummary(response.data.summary);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <CollapsiblePanel title="Input" side="left">
        <div className="h-full p-4 flex flex-col">
          <textarea
            className="flex-grow text-black text-opacity-100 border p-2 w-full resize-none mb-2"
            placeholder="Paste or type your text here..."
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <button
            className="p-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            onClick={handleSubmit}
          >
            Summarize
          </button>
        </div>
      </CollapsiblePanel>
      <CollapsiblePanel title="Summary" side="right">
        <div className="h-full p-4 flex flex-col">
          <div className="flex-grow border p-2 overflow-auto">
            {summary ? (
              <p>{summary}</p>
            ) : (
              <p className="text-gray-500">The summary will appear here after you click "Summarize".</p>
            )}
          </div>
        </div>
      </CollapsiblePanel>
    </div>
  );
};

export default Home;