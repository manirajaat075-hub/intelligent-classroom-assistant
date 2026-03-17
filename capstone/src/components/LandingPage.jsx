import React, { useState } from 'react';
import { Shield, GraduationCap, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthModals from './AuthModals';

const LandingPage = ({ onLogin }) => {
  const [authModal, setAuthModal] = useState({ isOpen: false, type: 'signin' });

  const openModal = (type) => setAuthModal({ isOpen: true, type });
  const closeModal = () => setAuthModal({ ...authModal, isOpen: false });

  return (
    <div className="relative min-h-screen overflow-hidden bg-mesh flex flex-col items-center justify-center p-6 sm:p-12">
      <AnimatePresence>
        {authModal.isOpen && (
          <AuthModals 
            isOpen={authModal.isOpen} 
            type={authModal.type} 
            onClose={closeModal} 
            onAuthSuccess={onLogin}
          />
        )}
      </AnimatePresence>

      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header / Branding */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 z-10"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex gap-4">
            <button onClick={() => openModal('signin')} className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Sign In</button>
            <div className="w-[1px] bg-white/10"></div>
            <button onClick={() => openModal('signup')} className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Sign Up</button>
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
          Intelligent <span className="gradient-text">Classroom</span> Assistant
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Smart Rules for Smarter Classrooms. Experience the future of collaborative education with our AI-driven management system.
        </p>
      </motion.div>

      {/* Hero Split Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl z-10">
        {/* Staff Login Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => openModal('signin')}
          className="glass-card p-8 rounded-3xl flex flex-col items-center text-center cursor-pointer group transition-all"
        >
          <div className="w-20 h-20 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-colors">
            <Shield size={40} className="text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Staff Portal</h2>
          <p className="text-slate-400 mb-8">Manage students, track attendance, and automate assignments with AI-driven rules.</p>
          <button 
            className="w-full py-4 px-6 bg-purple-600 hover:bg-purple-500 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-900/20"
          >
            Enter as Staff <ArrowRight size={18} />
          </button>
        </motion.div>

        {/* Student Login Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => openModal('signin')}
          className="glass-card p-8 rounded-3xl flex flex-col items-center text-center cursor-pointer group transition-all"
        >
          <div className="w-20 h-20 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-6 group-hover:bg-cyan-500/30 transition-colors">
            <GraduationCap size={40} className="text-cyan-400" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Student Portal</h2>
          <p className="text-slate-400 mb-8">Access your timetable, view marks, and stay updated with real-time class notifications.</p>
          <button 
            className="w-full py-4 px-6 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-900/20"
          >
            Enter as Student <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>

      {/* Footer / Tech Stack */}
      <div className="mt-20 flex flex-wrap justify-center gap-6 opacity-40 grayscale group-hover:grayscale-0 transition-all">
        <span className="text-sm font-medium border border-slate-700 px-3 py-1 rounded-full">React</span>
        <span className="text-sm font-medium border border-slate-700 px-3 py-1 rounded-full">Tailwind</span>
        <span className="text-sm font-medium border border-slate-700 px-3 py-1 rounded-full">Node.js</span>
        <span className="text-sm font-medium border border-slate-700 px-3 py-1 rounded-full">Firebase</span>
        <span className="text-sm font-medium border border-slate-700 px-3 py-1 rounded-full">MongoDB</span>
      </div>
    </div>
  );
};

export default LandingPage;
