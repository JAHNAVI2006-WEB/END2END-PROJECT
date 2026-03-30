import { BarChart, Clock, Briefcase, Play, Globe, Database, Code, FolderGit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col gap-10 max-w-[1000px]">
      
      {/* Banner */}
      <div className="w-full rounded-2xl bg-blue-600 text-white p-10 relative overflow-hidden flex flex-col items-start gap-6 shadow-md shadow-blue-600/10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/50 to-transparent pointer-events-none" />
        <h1 className="text-[32px] font-bold tracking-tight leading-tight z-10 w-3/4">Ready to Ace Your Next Interview?</h1>
        <p className="text-blue-100 text-[17px] z-10 w-3/4 leading-relaxed">
          Choose a domain below to start a realistic mock interview session powered by AI.
        </p>
        <button 
          onClick={() => navigate('/interview')}
          className="z-10 bg-white text-blue-600 hover:bg-slate-50 border-none px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-sm transition-all active:scale-95"
        >
          Start Practice
          <Play size={18} className="fill-blue-600 text-blue-600 ml-1" />
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Stat 1 */}
        <div className="bg-white border text-sm border-slate-200/60 shadow-sm rounded-2xl p-6 flex items-start gap-4 hover:border-slate-300 transition-colors">
          <div className="w-12 h-12 rounded-full bg-green-100/50 flex items-center justify-center shrink-0">
            <BarChart className="text-green-600" size={22} />
          </div>
          <div className="flex-1 pt-1">
             <h3 className="text-slate-500 font-medium mb-1">Average Score</h3>
             <div className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">85%</div>
             <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
             </div>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white border text-sm border-slate-200/60 shadow-sm rounded-2xl p-6 flex items-start gap-4 hover:border-slate-300 transition-colors">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <Clock className="text-blue-600" size={22} />
          </div>
          <div className="flex-1 pt-1">
             <h3 className="text-slate-500 font-medium mb-1">Practice Time</h3>
             <div className="text-3xl font-bold text-slate-900 mb-1 tracking-tight">12h 30m</div>
             <p className="text-xs text-slate-400 mt-2 font-medium">Total time spent in interviews</p>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white border text-sm border-slate-200/60 shadow-sm rounded-2xl p-6 flex items-start gap-4 hover:border-slate-300 transition-colors">
          <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
            <Briefcase className="text-purple-600" size={22} />
          </div>
          <div className="flex-1 pt-1">
             <h3 className="text-slate-500 font-medium mb-1">Interviews Completed</h3>
             <div className="text-3xl font-bold text-slate-900 mb-1 tracking-tight">24</div>
             <p className="text-xs text-slate-400 mt-2 font-medium">Across 3 different domains</p>
          </div>
        </div>

      </div>

      {/* Select Domain Section */}
      <div className="flex flex-col gap-5 mt-2">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-slate-900">Select a Domain</h2>
          <div className="px-2.5 py-1 bg-slate-100 text-slate-500 text-xs font-semibold rounded-full tracking-wide">
            Step 1
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { name: 'Frontend Development', icon: <Globe size={22}/>, color: 'text-blue-500', bg: 'bg-blue-50' },
            { name: 'Backend Development', icon: <Database size={22}/>, color: 'text-green-500', bg: 'bg-green-50' },
            { name: 'Full Stack Development', icon: <Code size={22}/>, color: 'text-purple-500', bg: 'bg-purple-50' },
            { name: 'Project Management', icon: <FolderGit2 size={22}/>, color: 'text-orange-500', bg: 'bg-orange-50' }
          ].map((domain, i) => (
             <div 
               key={i}
               onClick={() => navigate('/interview')}
               className="bg-white group cursor-pointer border border-slate-200/80 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] rounded-2xl p-6 flex flex-col items-start gap-4 hover:border-blue-200 hover:shadow-md transition-all hover:-translate-y-0.5"
             >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${domain.bg} ${domain.color} group-hover:scale-105 transition-transform`}>
                  {domain.icon}
                </div>
                <h3 className="font-semibold text-slate-800 leading-snug">{domain.name}</h3>
             </div>
          ))}
        </div>
      </div>

    </div>
  );
}
