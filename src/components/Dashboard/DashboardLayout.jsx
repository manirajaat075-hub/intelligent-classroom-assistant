import React, { useState } from 'react';
import { 
  Home, Users, ClipboardList, BookOpen, Calendar, 
  LogOut, Settings, Bell, Search, Menu, X, Copy, Check
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      active 
        ? 'bg-white/10 text-white shadow-lg' 
        : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

const DashboardLayout = ({ role, onLogout, activeTab, setActiveTab, children, classroomId }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const copyId = () => {
    navigator.clipboard.writeText(classroomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const menuItems = [
    { icon: Home, label: 'Home' },
    { icon: Users, label: 'Students' },
    { icon: ClipboardList, label: 'Attendance' },
    { icon: BookOpen, label: 'Assignment' },
    { icon: Calendar, label: 'Timetable' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transition-transform duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center gap-3 px-2 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center font-bold text-white">IA</div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Assistant</span>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <SidebarItem 
                key={item.label} 
                {...item} 
                active={activeTab === item.label}
                onClick={() => setActiveTab(item.label)}
              />
            ))}
          </nav>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            <SidebarItem icon={Settings} label="Settings" />
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
        {/* Top Header */}
        <header className="sticky top-0 z-40 h-20 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-slate-400" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h2 className="text-xl font-semibold hidden md:block">{activeTab}</h2>
          </div>

          <div className="flex items-center gap-6">
            {role === 'staff' ? (
              <div className="hidden lg:flex items-center gap-2 px-6 py-2 bg-slate-900 border border-purple-500/20 rounded-2xl group shadow-lg shadow-purple-900/10">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Class ID:</span>
                <span className="font-mono font-black text-purple-400">{classroomId}</span>
                <button onClick={copyId} className="ml-3 text-slate-500 hover:text-white transition-colors">
                  {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center bg-slate-900 border border-slate-800 rounded-2xl px-5 h-12 w-80 group focus-within:border-purple-500/50 transition-all">
                <Search size={18} className="text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                <input 
                  type="text" 
                  placeholder="enter your class room id" 
                  className="bg-transparent border-none outline-none text-sm ml-3 w-full text-slate-200 placeholder:text-slate-500 font-bold italic"
                />
              </div>
            )}

            <div className="flex items-center gap-4">
              <button className="relative w-10 h-10 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full border-2 border-slate-950"></span>
              </button>
              <div className="w-10 h-10 rounded-full border border-slate-800 overflow-hidden cursor-pointer hover:border-purple-500 transition-all">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`} alt="Avatar" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Body */}
        <section className="p-6 md:p-10 flex-1">
          {children}
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;
