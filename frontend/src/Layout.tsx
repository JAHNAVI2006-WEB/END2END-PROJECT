import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, FileText, LogOut } from 'lucide-react';
import { useAuth } from './context/AuthContext';

export default function Layout() {
  const navigate = useNavigate();
  // Using dummy values since auth logic isn't fully set up with backend right now
  const userName = "jahnavibolla06";
  const userEmail = "jahnavibolla06@gmail.com";

  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      {/* Sidebar fixed */}
      <aside className="fixed left-0 top-0 flex flex-col h-screen w-[260px] bg-slate-900 border-r border-slate-800 px-6 py-6 z-20">
        
        {/* Logo */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center">
            <MessageSquare size={18} className="text-blue-500" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">Smart Interview</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>
          
          <NavLink
            to="/interview"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <MessageSquare size={18} />
            <span>Practice</span>
          </NavLink>

          <NavLink
            to="/report"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <FileText size={18} />
            <span>Reports</span>
          </NavLink>
        </nav>

        {/* User Profile Footer */}
        <div className="pt-6 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-orange-500 flex shrink-0">
              <img src="https://api.dicebear.com/7.x/notionists/svg?seed=jahnavi" alt="avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-white truncate">{userName}</span>
              <span className="text-xs text-slate-400 truncate">{userEmail}</span>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/auth')}
            className="flex items-center gap-3 text-red-500 font-medium text-sm hover:text-red-400 transition-colors px-1"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-[260px] min-h-screen max-w-7xl mx-auto flex flex-col">
        {/* Header inside main content */}
        <header className="h-20 flex items-center justify-between px-10 shrink-0">
          <h2 className="text-slate-800 text-lg font-medium">Welcome back, {userName}</h2>
          <div className="flex items-center gap-4">
             <div className="w-9 h-9 rounded-full bg-orange-100 border border-orange-200 overflow-hidden flex items-center justify-center shrink-0 shadow-sm cursor-pointer">
               <img src="https://api.dicebear.com/7.x/notionists/svg?seed=jahnavi" alt="avatar top right" className="w-full h-full object-cover" />
             </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 px-10 pb-10 overflow-x-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
