import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, ArrowRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthModals = ({ isOpen, type, onClose, onAuthSuccess }) => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('student');
  const [formData, setFormData] = useState({
    identifier: '', // Email or Phone
    username: '',
    password: ''
  });

  if (!isOpen) return null;

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuthSuccess(role);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-card w-full max-w-md rounded-3xl overflow-hidden relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-10">
          <h2 className="text-3xl font-bold mb-2">
            {type === 'signup' ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-slate-400 mb-8">
            {type === 'signup' ? 'Ready to start your smart learning journey?' : 'Please enter your credentials to continue.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {type === 'signup' ? (
              <>
                {step === 1 && (
                  <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-500 mb-2 uppercase tracking-wider">Email or Phone</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input 
                          type="text" 
                          required
                          placeholder="name@example.com"
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl py-4 pl-12 pr-4 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={handleNext}
                      className="w-full py-4 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                    >
                      Continue <ArrowRight size={18} />
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-500 mb-2 uppercase tracking-wider">Username & Password</label>
                      <div className="space-y-4">
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                          <input 
                            type="text" 
                            required
                            placeholder="Pick a username"
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-4 pl-12 pr-4 focus:border-purple-500 outline-none transition-all"
                          />
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                          <input 
                            type="password" 
                            required
                            placeholder="Create a password"
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-4 pl-12 pr-4 focus:border-purple-500 outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={handleBack} type="button" className="p-4 border border-slate-800 rounded-xl text-slate-500 hover:text-white transition-all"><ChevronLeft /></button>
                      <button 
                        type="button"
                        onClick={handleNext}
                        className="flex-1 py-4 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold transition-all"
                      >
                        Almost there
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                    <label className="block text-sm font-medium text-slate-500 mb-2 uppercase tracking-wider">Select Your Role</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div 
                        onClick={() => setRole('staff')}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center gap-2 ${role === 'staff' ? 'border-purple-500 bg-purple-500/10' : 'border-slate-800 bg-slate-900 hover:border-slate-700'}`}
                      >
                        <User size={24} className={role === 'staff' ? 'text-purple-400' : 'text-slate-500'} />
                        <span className="font-bold">Staff</span>
                      </div>
                      <div 
                        onClick={() => setRole('student')}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center gap-2 ${role === 'student' ? 'border-cyan-500 bg-cyan-500/10' : 'border-slate-800 bg-slate-900 hover:border-slate-700'}`}
                      >
                        <User size={24} className={role === 'student' ? 'text-cyan-400' : 'text-slate-500'} />
                        <span className="font-bold">Student</span>
                      </div>
                    </div>
                    <button 
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:opacity-90 rounded-xl font-bold transition-all shadow-lg"
                    >
                      Complete Sign Up
                    </button>
                  </motion.div>
                )}
              </>
            ) : (
              <div className="space-y-6">
                <div>
                  <div className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                      <input 
                        type="text" 
                        required
                        placeholder="Username"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl py-4 pl-12 pr-4 focus:border-cyan-500 outline-none transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                      <input 
                        type="password" 
                        required
                        placeholder="Password"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl py-4 pl-12 pr-4 focus:border-cyan-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-800 bg-slate-900 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-950" />
                    <span className="text-sm text-slate-500">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300 font-medium">Forgot Password?</a>
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-bold transition-all"
                >
                  Sign In
                </button>
              </div>
            )}
          </form>

          <p className="mt-8 text-center text-slate-500 text-sm">
            {type === 'signup' ? 'Already have an account?' : "Don't have an account?"} {' '}
            <button className="text-white font-bold hover:underline">
              {type === 'signup' ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthModals;
