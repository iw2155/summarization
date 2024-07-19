"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import CollapsiblePanel from './collapsePanel';
import ProgressBar from './progressBar';

const Home = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 90) return 90;
          return Math.min(oldProgress + 10, 90);
        });
      }, 500);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSubmit = async () => {
    setIsLoading(true);
    setSummary('');

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/summarize', { text }, { 
        withCredentials: true, 
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(response.data);
      setSummary(response.data.summary);
    } catch (error) {
      console.error('Error:', error);
      setSummary('An error occurred while summarizing the text.');
    } finally {
      setIsLoading(false);
      setProgress(100);
    }
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
            disabled={isLoading}
          >
            {isLoading ? 'Summarizing...' : 'Summarize'}
          </button>
        </div>
      </CollapsiblePanel>
      <CollapsiblePanel title="Summary" side="right">
        <div className="h-full p-4 flex flex-col">
          {isLoading && <ProgressBar progress={progress} />}
          <div className="flex-grow border p-2 overflow-auto mt-2">
            {summary ? (
              <p>{summary}</p>
            ) : (
              <p className="text-gray-500">
                {isLoading ? 'Generating summary...' : 'The summary will appear here after you click "Summarize".'}
              </p>
            )}
          </div>
        </div>
      </CollapsiblePanel>
    </div>
  );
};

export default Home;