import React from 'react';

interface DataInputProps {
  value: string;
  onChange: (value: string) => void;
  onProcess: () => void;
  isProcessing: boolean;
}

export const DataInput: React.FC<DataInputProps> = ({ value, onChange, onProcess, isProcessing }) => {
  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-slate-800">WhatsApp Data Input</h2>
        <span className="text-xs text-slate-500">Paste conversation below</span>
      </div>
      <div className="flex-1 p-4 relative">
        <textarea
          className="w-full h-full p-4 text-sm font-mono text-slate-700 bg-slate-50 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all"
          placeholder="Paste your WhatsApp text here...
Example:
Name, Course, Subject, Phone
John Doe, bds, Pharmacology, 9998887777"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={isProcessing}
        />
      </div>
      <div className="p-4 bg-white border-t border-slate-200">
        <button
          onClick={onProcess}
          disabled={!value.trim() || isProcessing}
          className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all shadow-md
            ${!value.trim() || isProcessing 
              ? 'bg-slate-300 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:scale-[0.99]'
            } flex items-center justify-center gap-2`}
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing via Gemini...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Convert to CSV
            </>
          )}
        </button>
      </div>
    </div>
  );
};