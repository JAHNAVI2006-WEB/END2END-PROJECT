import { useState } from 'react';
import { Bot, Activity, Send, Volume2, Mic } from 'lucide-react';

interface Message {
  id: number;
  sender: 'user' | 'bot';
  text: string;
}

export default function InterviewPage() {
  const [mode, setMode] = useState<'setup' | 'session'>('setup');
  const [domain, setDomain] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [inputText, setInputText] = useState('');
  
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleStart = async () => {
    const course = domain || 'JavaScript';
    setDomain(course);
    
    setIsTyping(true);
    setMode('session');
    
    try {
      const response = await fetch(`http://localhost:5000/api/interview/questions?course=${encodeURIComponent(course)}&count=${numQuestions}`);
      const data = await response.json();
      
      const fetchedQuestions = data.questions || [];
      if (fetchedQuestions.length > 0) {
        setQuestions(fetchedQuestions);
        setMessages([{ id: Date.now(), sender: 'bot', text: fetchedQuestions[0] }]);
      } else {
        setMessages([{ id: Date.now(), sender: 'bot', text: "Welcome! Let's begin the interview." }]);
      }
    } catch (err) {
      setMessages([{ id: Date.now(), sender: 'bot', text: "Error connecting to the backend. Please check your Node.js server." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendResponse = () => {
    if (!inputText.trim()) return;
    const userMsg = inputText;
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userMsg }]);
    setInputText('');
    
    const nextIndex = currentQuestionIndex + 1;
    
    setIsTyping(true);

    setTimeout(() => {
      if (nextIndex < questions.length) {
        setMessages(prev => [...prev, { id: Date.now()+1, sender: 'bot', text: questions[nextIndex] }]);
        setCurrentQuestionIndex(nextIndex);
      } else {
        setMessages(prev => [...prev, { id: Date.now()+1, sender: 'bot', text: "Thank you! That completes our interview process today. Your performance report will be generated shortly." }]);
      }
      setIsTyping(false);
    }, 1200);
  };

  if (mode === 'setup') {
    return (
      <div className="flex justify-center items-start pt-8 pb-16">
        <div className="bg-white rounded-2xl w-full max-w-2xl p-10 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.06)] border border-slate-200/60 flex flex-col items-center">
          
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
            <Bot size={32} />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-1 tracking-tight">Interview Setup</h2>
          <p className="text-slate-500 mb-10 text-sm">Configure your real-time practice session</p>

          <div className="w-full space-y-8">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-800">Target Domain</label>
              <input 
                value={domain}
                onChange={e => setDomain(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm shadow-sm"
                placeholder="e.g. React, C++, Hotel Management, Business, DevOps"
              />
              <p className="text-xs text-slate-400 pl-1 font-medium">Try "React", "Node.js", "Java", "Python", "DevOps", "C++", "Hotel Management", "Business", "Marketing", "Finance", "C", "CSS", "HTML", "PHP", or "Go"</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-800">Number of Questions</label>
              <div className="flex gap-2">
                {[5, 10, 15, 20, 25].map(num => (
                  <button 
                    key={num}
                    onClick={() => setNumQuestions(num)}
                    className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                      numQuestions === num 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/20' 
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-blue-50/80 border border-blue-100 rounded-xl p-5 flex items-start gap-4">
              <Activity className="text-blue-500 mt-0.5 shrink-0" size={20} />
              <div>
                <h4 className="text-sm font-bold text-blue-900 mb-1">Real-time Analysis Enabled</h4>
                <p className="text-sm leading-relaxed text-blue-600">
                  Your answers will be analyzed instantly for sentiment and confidence using our AI engine. Voice input and audio feedback are available.
                </p>
              </div>
            </div>

            <button 
              onClick={handleStart}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-[15px] flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all active:scale-[0.98]"
            >
              Start Interview
              <Send size={18} />
            </button>
          </div>
          
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] border border-slate-200/60 shadow-sm rounded-2xl bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 bg-white z-10">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 capitalize">{domain} Interview</h2>
          <p className="text-sm text-slate-500 mt-0.5 font-medium">Question {Math.min(currentQuestionIndex + 1, questions.length || 1)} of {questions.length || numQuestions}</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-bold hover:bg-blue-100 transition-colors">
            <Volume2 size={16} />
            Voice On
          </button>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <span className="relative flex h-2 w-2">
              <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${currentQuestionIndex >= questions.length ? 'bg-slate-400' : 'animate-ping bg-red-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${currentQuestionIndex >= questions.length ? 'bg-slate-500' : 'bg-red-500'}`}></span>
            </span>
            {currentQuestionIndex >= questions.length ? 'Completed' : 'Live Session'}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 bg-slate-50/50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 max-w-[85%] ${msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}>
            {msg.sender === 'bot' && (
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Bot size={22} />
              </div>
            )}
            <div className={`p-4 text-[15px] leading-relaxed shadow-sm ${
              msg.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm' 
                : 'bg-white border border-slate-200 text-slate-800 rounded-2xl rounded-tl-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
           <div className="flex gap-4 max-w-[85%] self-start">
             <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Bot size={22} />
             </div>
             <div className="px-5 py-4 bg-white border border-slate-200 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5">
               <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></span>
               <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{animationDelay: "0.15s"}}></span>
               <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{animationDelay: "0.3s"}}></span>
             </div>
           </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-slate-50 border-t border-slate-100 z-10 shrink-0">
        <div className="bg-white border border-slate-200 rounded-xl p-2 flex items-center shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
          <input 
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendResponse()}
            disabled={currentQuestionIndex >= questions.length}
            className="flex-1 bg-transparent border-none px-4 py-2 outline-none text-[15px] placeholder:text-slate-400 disabled:opacity-50"
            placeholder={currentQuestionIndex >= questions.length ? "Interview finished..." : "Type your answer here..."}
          />
          <div className="flex items-center gap-2 pr-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition-colors disabled:opacity-50" disabled={currentQuestionIndex >= questions.length}>
              <Mic size={20} />
            </button>
            <button 
              onClick={handleSendResponse}
              disabled={!inputText.trim() || currentQuestionIndex >= questions.length}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-300 text-white transition-colors"
            >
              <Send size={18} className="translate-x-[1px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
