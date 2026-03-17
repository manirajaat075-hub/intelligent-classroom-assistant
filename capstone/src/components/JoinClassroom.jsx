import React, { useState } from 'react';
import { KeyRound, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const JoinClassroom = ({ onJoin }) => {
  const [classId, setClassId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (classId.trim()) {
      onJoin(classId);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden text-left">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-10 md:p-14 rounded-[3rem] w-full max-w-lg shadow-2xl border-white/10 relative z-10"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-3xl flex items-center justify-center mb-10 shadow-lg shadow-purple-500/20 mx-auto md:mx-0">
          <KeyRound size={40} className="text-white" />
        </div>

        <div className="space-y-2 mb-10 text-center md:text-left">
          <h2 className="text-4xl font-black tracking-tight text-white uppercase italic">Join Room</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">Enter authorized Classroom Identifier</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label htmlFor="classId" className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Classroom ID</label>
            <input 
              id="classId"
              type="text" 
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              placeholder="e.g. CR-101"
              autoFocus
              className="w-full bg-slate-900 border-2 border-slate-800 rounded-2xl py-5 px-6 font-mono font-bold text-xl text-center md:text-left focus:border-purple-500 focus:bg-slate-900/50 outline-none transition-all placeholder:text-slate-700 text-purple-400"
            />
          </div>

          <button 
            type="submit"
            disabled={!classId.trim()}
            className={`w-full group relative overflow-hidden py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
              classId.trim() 
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl shadow-purple-900/40 hover:scale-[1.02] active:scale-[0.98]' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              Submit Access Code <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </form>

        <p className="mt-8 text-center md:text-left text-[10px] font-bold text-slate-600 uppercase tracking-widest">
          Classroom ID is provided by your department.
        </p>
      </motion.div>
    </div>
  );
};

export default JoinClassroom;
