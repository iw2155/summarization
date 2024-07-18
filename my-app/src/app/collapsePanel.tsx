import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface CollapsiblePanelProps {
  children: React.ReactNode;
  title: string;
  side: 'left' | 'right';
}

const CollapsiblePanel: React.FC<CollapsiblePanelProps> = ({ children, title, side }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`flex flex-col ${isCollapsed ? 'w-12' : 'w-1/2'} transition-all duration-300 ease-in-out`}>
      <div className="flex items-center justify-between bg-gray-200 p-2">
        {!isCollapsed && <h2 className="text-xl font-bold">{title}</h2>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded hover:bg-gray-300"
        >
          {isCollapsed ? 
            (side === 'left' ? <ChevronRightIcon className="w-6 h-6" /> : <ChevronLeftIcon className="w-6 h-6" />) : 
            (side === 'left' ? <ChevronLeftIcon className="w-6 h-6" /> : <ChevronRightIcon className="w-6 h-6" />)
          }
        </button>
      </div>
      <div className={`flex-grow overflow-hidden ${isCollapsed ? 'hidden' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default CollapsiblePanel;