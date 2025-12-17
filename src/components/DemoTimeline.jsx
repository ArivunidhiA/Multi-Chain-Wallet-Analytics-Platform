import React from 'react';

const DemoTimeline = ({ stages, currentStage }) => {
  const getStatusIcon = (stage) => {
    if (stage.id < currentStage) {
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white glow-icon transition-all duration-300 hover:scale-110">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      );
    } else if (stage.id === currentStage) {
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white animate-pulse glow-icon">
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-gray-400 transition-all duration-300">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        </div>
      );
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative">
      {stages.map((stage, index) => (
        <div 
          key={stage.id} 
          className="flex mb-8 last:mb-0 transition-all duration-500 animate-slide-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex flex-col items-center mr-4">
            {getStatusIcon(stage)}
            {index < stages.length - 1 && (
              <div
                className={`w-0.5 h-full mt-2 transition-all duration-500 ${
                  stage.id < currentStage ? 'bg-green-500' : 'bg-white/10'
                }`}
                style={{ minHeight: '2rem' }}
              ></div>
            )}
          </div>
          <div className="flex-1 pb-8 group">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-indigo-300">{stage.title}</h4>
              <span className="text-sm text-gray-300 transition-colors duration-300">{formatTime(stage.time)}</span>
            </div>
            {stage.description && (
              <p className="text-sm text-gray-300 mb-2 transition-colors duration-300 group-hover:text-gray-200">{stage.description}</p>
            )}
            {stage.data && stage.id < currentStage && (
              <div className="mt-3 bg-white/5 rounded p-3 border border-white/10 transition-all duration-300 group-hover:bg-white/10 group-hover:border-indigo-500/30">
                <pre className="text-xs text-gray-200 font-mono overflow-x-auto">
                  {JSON.stringify(stage.data, null, 2)}
                </pre>
              </div>
            )}
            {stage.id === currentStage && (
              <div className="mt-3 flex items-center space-x-2 text-indigo-400 glow-icon">
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span className="text-sm font-medium">Processing...</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DemoTimeline;

