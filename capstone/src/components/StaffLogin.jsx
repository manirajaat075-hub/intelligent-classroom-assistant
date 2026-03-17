import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Lock, UserPlus, Mail, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StaffLogin = ({ onAuthenticate }) => {
  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate authentication
    if (mode === 'signin') {
      if (form.password === '1234') { // Default staff passcode
        onAuthenticate({ name: 'Staff Member', email: form.email, classroomId: 'CR-7788' });
      } else {
        setError(true);
        setTimeout(() => setError(false), 2000);
      }
    } else {
      // Signup success simulation - Generate dynamic ID
      const generatedId = "CR-" + Math.floor(1000 + Math.random() * 9000);
      onAuthenticate({ name: form.name, email: form.email, classroomId: generatedId });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden text-left">
      {/* Dynamic Background */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[150px] -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <motion.div 
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-10 md:p-14 rounded-[3.5rem] w-full max-w-lg shadow-2xl border-white/10 relative z-10"
      >
        <AnimatePresence mode="wait">
          <motion.div 
            key={mode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center md:text-left"
          >
            <div className="w-20 h-20 bg-slate-900 border border-purple-500/20 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl mx-auto md:mx-0">
              {mode === 'signin' ? <Lock size={32} className="text-purple-400" /> : <UserPlus size={32} className="text-purple-400" />}
            </div>

            <div className="space-y-1 mb-10">
              <h2 className="text-4xl font-black tracking-tight text-white uppercase italic">
                {mode === 'signin' ? 'Sign.' : 'Staff.'}<span className="text-purple-500">{mode === 'signin' ? 'In' : 'Up'}</span>
              </h2>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
                {mode === 'signin' ? 'Secure Console Access' : 'Create Administrative ID'}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="popLayout">
            {mode === 'signup' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2 overflow-hidden"
              >
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-700" size={18} />
                  <input 
                    type="text" required
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    placeholder="Enter your name"
                    className="w-full bg-slate-900 border-2 border-slate-800 rounded-2xl py-5 px-14 font-bold focus:border-purple-500 focus:bg-slate-900/50 outline-none transition-all placeholder:text-slate-800"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Work Email</label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-700" size={18} />
              <input 
                type="email" required
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                placeholder="staff@ai-x.edu"
                className="w-full bg-slate-900 border-2 border-slate-800 rounded-2xl py-5 px-14 font-bold focus:border-purple-500 focus:bg-slate-900/50 outline-none transition-all placeholder:text-slate-800 font-mono"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-end px-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Passcode</label>
              {error && <span className="text-[10px] font-black text-red-500 animate-bounce">Access Denied</span>}
            </div>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-700" size={18} />
              <input 
                type="password" required
                value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value})}
                placeholder="••••••••"
                className={`w-full bg-slate-900 border-2 rounded-2xl py-5 px-14 font-mono font-bold tracking-widest focus:bg-slate-900/50 outline-none transition-all placeholder:text-slate-800 ${
                  error ? 'border-red-500/50' : 'border-slate-800 focus:border-purple-500'
                }`}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full group relative overflow-hidden py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl shadow-purple-900/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="flex items-center justify-center gap-3">
              {mode === 'signin' ? 'Verify Identity' : 'Register Profile'} 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </form>

        <div className="mt-10 text-center">
          <button 
            onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(false); }}
            className="text-[10px] font-black uppercase text-slate-500 hover:text-purple-400 transition-colors tracking-widest"
          >
            {mode === 'signin' ? 'New Member? Create Account' : 'Already Staff? Sign In'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default StaffLogin;
