import React, { useState, useCallback } from 'react';
import { DataInput } from './components/DataInput';
import { DataPreview } from './components/DataPreview';
import { extractDataFromText } from './services/geminiService';
import { StudentEntry } from './types';

export default function App() {
  const [inputText, setInputText] = useState<string>('');
  const [data, setData] = useState<StudentEntry[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasRun, setHasRun] = useState<boolean>(false);

  const handleProcess = useCallback(async () => {
    if (!inputText.trim()) return;

    setIsProcessing(true);
    setError(null);
    setData([]);

    try {
      const results = await extractDataFromText(inputText);
      setData(results);
      setHasRun(true);
    } catch (err) {
      console.error(err);
      setError("Failed to process data. Please check your API Key and ensure the input text is valid.");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText]);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-blue-800 text-white shadow-lg z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="bg-white/10 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
             </div>
             <h1 className="text-xl font-bold tracking-tight">BDS Data Auto-Formatter</h1>
          </div>
          <div className="text-sm text-blue-200 hidden sm:block">
            Powered by Gemini 2.5 Flash
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 overflow-hidden h-[calc(100vh-4rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          {/* Left Column: Input */}
          <div className="h-full flex flex-col">
            <DataInput 
              value={inputText}
              onChange={setInputText}
              onProcess={handleProcess}
              isProcessing={isProcessing}
            />
            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-start gap-3 shadow-sm animate-fade-in">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                 <div>
                   <p className="font-semibold">Error</p>
                   <p className="text-sm">{error}</p>
                 </div>
              </div>
            )}
          </div>

          {/* Right Column: Output */}
          <div className="h-full overflow-hidden">
            <DataPreview data={data} hasRun={hasRun} />
          </div>
        </div>
      </main>
    </div>
  );
}