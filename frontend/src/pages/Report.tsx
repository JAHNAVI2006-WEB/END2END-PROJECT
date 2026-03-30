import { FileText, Download, CheckCircle2 } from 'lucide-react';

export default function ReportPage() {
  return (
    <div className="flex justify-center pt-10">
      <div className="w-full max-w-4xl bg-white border border-slate-200/60 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.06)] rounded-2xl p-10 flex flex-col">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center rounded-xl">
              <FileText size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Performance Reports</h1>
              <p className="text-sm text-slate-500 font-medium">Review your past interview feedback</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg text-sm shadow-sm transition-all active:scale-95">
            <Download size={16} />
            Export CSV
          </button>
        </div>

        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 size={32} className="text-green-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">You're all up to date.</h3>
          <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">
            You haven't completed any new mock interviews yet. Your detailed performance analysis will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}
