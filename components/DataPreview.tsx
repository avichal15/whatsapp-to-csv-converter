import React from 'react';
import { StudentEntry } from '../types';

interface DataPreviewProps {
  data: StudentEntry[];
  hasRun: boolean;
}

export const DataPreview: React.FC<DataPreviewProps> = ({ data, hasRun }) => {
  const downloadCSV = () => {
    if (data.length === 0) return;

    const headers = ["Name", "Course", "Year", "Subject", "Phone number"];
    const csvContent = [
      headers.join(","),
      ...data.map(row => 
        [
          `"${row.Name}"`, 
          `"${row.Course}"`, 
          `"${row.Year}"`, 
          `"${row.Subject}"`, 
          `"${row.PhoneNumber}"`
        ].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `bds_students_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!hasRun) {
    return (
      <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-slate-200 items-center justify-center text-slate-400 p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-lg font-medium">No data generated yet</p>
        <p className="text-sm mt-2">Paste your WhatsApp chat on the left and click "Convert to CSV"</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
        <div className="flex items-center gap-2">
           <h2 className="text-lg font-semibold text-slate-800">Preview</h2>
           <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">{data.length} Entries</span>
        </div>
        <button 
          onClick={downloadCSV}
          disabled={data.length === 0}
          className="text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-md transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download CSV
        </button>
      </div>
      
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 sticky top-0 z-10">
            <tr>
              <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">Name</th>
              <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">Course</th>
              <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">Year</th>
              <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">Subject</th>
              <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">Phone</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-slate-50 transition-colors">
                <td className="p-3 text-sm text-slate-700 whitespace-nowrap">{row.Name}</td>
                <td className="p-3 text-sm text-slate-600 whitespace-nowrap">{row.Course}</td>
                <td className="p-3 text-sm text-slate-600 whitespace-nowrap">{row.Year}</td>
                <td className="p-3 text-sm font-medium text-slate-800 whitespace-nowrap">{row.Subject}</td>
                <td className="p-3 text-sm font-mono text-slate-600 whitespace-nowrap">{row.PhoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && (
          <div className="p-8 text-center text-slate-400 text-sm">
            No valid entries extracted. Please check the input format.
          </div>
        )}
      </div>
    </div>
  );
};