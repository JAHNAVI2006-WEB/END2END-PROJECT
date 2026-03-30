import { Brain, BookOpen, Sparkles, Mail, Lock, ArrowRight, BarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen w-full font-sans">
      {/* Left Column - Dark Theme */}
      <div className="hidden lg:flex flex-1 flex-col bg-slate-900 px-12 py-12 text-white justify-between">
        <div>
          <div className="flex items-center gap-3 mb-16">
            <Brain className="text-blue-400 w-8 h-8" />
            <span className="text-xl font-bold tracking-tight">Smart Interview</span>
          </div>
          
          <h1 className="text-5xl font-bold leading-tight mb-6 pr-10">
            Master Your Interview Skills with AI
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-md">
            Real-time feedback, sentiment analysis, and unlimited practice sessions tailored to your domain.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-5 mb-10">
          {[
             { icon: <Sparkles className="text-blue-400 mb-3" size={24} />, title: 'AI Feedback', desc: 'Get instant, actionable insights on your answers and delivery.' },
             { icon: <BookOpen className="text-blue-400 mb-3" size={24} />, title: 'Domain Specific', desc: 'Practice with questions tailored to your exact industry and role.' },
             { icon: <BarChart className="text-blue-400 mb-3" size={24} />, title: 'Sentiment Analysis', desc: 'Analyze your vocal tone and confidence in real-time.' },
             { icon: <Brain className="text-blue-400 mb-3" size={24} />, title: 'Unlimited Practice', desc: 'Hone your skills with endless mock interview scenarios.' }
          ].map((feature, idx) => (
             <div key={idx} className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/60 transition-colors">
               {feature.icon}
               <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
               <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
             </div>
          ))}
        </div>
        
        <div className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Smart Interview. All rights reserved.
        </div>
      </div>

      {/* Right Column - Light Theme */}
      <div className="flex flex-1 flex-col bg-slate-50 items-center justify-center p-8 sm:p-12 lg:p-16">
        <div className="w-full max-w-sm">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h2>
            <p className="text-slate-500">Enter your credentials to access your dashboard</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 block" htmlFor="email">Email</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 text-slate-400" size={18} />
                <input 
                  type="email" 
                  id="email" 
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 block" htmlFor="password">Password</label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 text-slate-400" size={18} />
                <input 
                  type="password" 
                  id="password" 
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                <span className="text-sm text-slate-600 group-hover:text-slate-900">Remember me</span>
              </label>
              <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">Forgot Password?</a>
            </div>

            <button type="submit" className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm shadow-blue-600/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
              Sign In
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-8">
            Don't have an account? <a href="#" className="font-bold text-blue-600 hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
