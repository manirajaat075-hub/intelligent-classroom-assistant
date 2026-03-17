import React, { useState } from 'react';
import { 
    Users, ClipboardCheck, FilePlus, ExternalLink, MoreVertical, 
    Plus, X, Save, Calendar, Check, AlertCircle, ChevronLeft, 
    ChevronRight, BookOpen, Star, TrendingUp, Clock, UserPlus,
    Bell, PieChart, LayoutDashboard, AlertTriangle, FileX,
    Trash2, Edit3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="glass-card p-6 rounded-2xl flex items-center justify-between group text-left">
    <div>
      <p className="text-slate-400 text-sm mb-1 uppercase tracking-wider">{label}</p>
      <h3 className="text-3xl font-bold">{value}</h3>
    </div>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${color}-500/10 text-${color}-400 group-hover:bg-${color}-500/20 transition-all`}>
      <Icon size={24} />
    </div>
  </div>
);

const StaffDashboard = ({ activeTab, students, setStudents, timetable, setTimetable }) => {
  const getToday = () => new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(getToday());
  
  const [modalMode, setModalMode] = useState(null); // 'add', 'edit', 'grade', 'timetable'
  const [activeItem, setActiveItem] = useState(null);
  const [studentForm, setStudentForm] = useState({ name: '', roll: '' });
  const [gradingForm, setGradingForm] = useState({ index: 0, score: 0, status: 'sub' }); // sub, late, miss
  const [timetableForm, setTimetableForm] = useState({ time: '', subject: '', room: '', status: 'Upcoming' });

  const handleEditClick = (student) => {
    setModalMode('edit');
    setActiveItem(student);
    setStudentForm({ name: student.name, roll: student.roll });
  };

  const handleAddClick = () => {
    setModalMode('add');
    setActiveItem(null);
    setStudentForm({ name: '', roll: '' });
  };

  const handleGradeClick = (student, assignmentIdx) => {
    setModalMode('grade');
    setActiveItem(student);
    const assig = student.assignments[assignmentIdx];
    setGradingForm({ index: assignmentIdx, score: assig.v, status: assig.s });
  };

  const handleTimetableAction = (item = null) => {
    setModalMode('timetable');
    setActiveItem(item);
    setTimetableForm(item ? { ...item } : { time: '', subject: '', room: '', status: 'Upcoming' });
  };

  const handleSave = () => {
    if (modalMode === 'edit') {
      setStudents(students.map(s => s.id === activeItem.id ? { ...s, name: studentForm.name, roll: studentForm.roll } : s));
    } else if (modalMode === 'add') {
      const newStudent = {
        id: Date.now(),
        name: studentForm.name,
        roll: studentForm.roll,
        att: {},
        assignments: [{v: 0, s: 'miss'}, {v: 0, s: 'miss'}, {v: 0, s: 'miss'}]
      };
      setStudents([...students, newStudent]);
    } else if (modalMode === 'grade') {
        setStudents(students.map(s => s.id === activeItem.id ? {
            ...s,
            assignments: s.assignments.map((a, i) => i === gradingForm.index ? { v: parseInt(gradingForm.score) || 0, s: gradingForm.status } : a)
        } : s));
    } else if (modalMode === 'timetable') {
        if (activeItem) {
            setTimetable(timetable.map(t => t.id === activeItem.id ? { ...timetableForm, id: t.id } : t));
        } else {
            setTimetable([...timetable, { ...timetableForm, id: Date.now() }]);
        }
    }
    setModalMode(null);
  };

  const deleteTimetableItem = (id) => {
    setTimetable(timetable.filter(t => t.id !== id));
  };

  const markAttendance = (id, status) => {
    setStudents(students.map(s => s.id === id ? { ...s, att: { ...s.att, [selectedDate]: status } } : s));
  };

  const changeDate = (days) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + days);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  // --- SUB-VIEWS ---

  const HomeView = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-8 rounded-[2rem] bg-gradient-to-br from-purple-600/20 to-transparent flex items-center justify-between border-purple-500/20 shadow-xl">
            <div>
                <h3 className="text-3xl font-black mb-2 tracking-tight">Today's Attendance</h3>
                <p className="text-slate-400 text-sm mb-6">Real-time presence monitoring for Class IA.</p>
                <div className="flex items-center gap-4">
                    <div className="px-6 py-2 bg-purple-600 rounded-full font-bold text-lg shadow-lg shadow-purple-900/40">92%</div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Target Reached</span>
                </div>
            </div>
            <div className="hidden sm:block"><PieChart size={120} className="text-purple-400/30 -rotate-12" /></div>
        </div>
        <div className="glass-card p-8 rounded-[2rem] border-cyan-500/20 flex flex-col justify-center text-center bg-slate-900/50">
           <AlertCircle size={32} className="text-cyan-400 mx-auto mb-4" />
           <h4 className="text-lg font-bold mb-1">System Alerts</h4>
           <p className="text-xs text-slate-500 mb-4 px-4 uppercase tracking-widest font-bold">4 Active Notifications</p>
           <button className="text-cyan-400 text-xs font-bold hover:underline transition-all underline-offset-4">VIEW ALL ALERTS</button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-3"><Clock size={18} className="text-purple-400" /><h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Today's Timetable</h3></div>
                <span className="text-[10px] font-mono text-slate-500">{new Date().toDateString()}</span>
            </div>
            <div className="p-2">
                {timetable.map((item, idx) => (
                    <div key={item.id} className="flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-all group">
                        <div className="flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-slate-700 group-hover:bg-purple-500 transition-colors"></div><div><p className="font-bold text-sm tracking-tight">{item.subject}</p><p className="text-[10px] font-mono text-slate-500">{item.time} • {item.room}</p></div></div>
                        <span className={`px-2 py-1 rounded text-[10px] font-bold ${item.status === 'Ongoing' ? 'bg-green-500/10 text-green-400 ring-1 ring-green-500/20' : 'bg-slate-800 text-slate-400'}`}>{item.status}</span>
                    </div>
                ))}
            </div>
        </div>
        <div className="glass-card rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-3"><Bell size={18} className="text-cyan-400" /><h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">System Alerts</h3></div>
            </div>
            <div className="p-6 space-y-4">
                {[{ title: 'New Submission', desc: 'Michael Chen uploaded "Exp 4" report.', type: 'info', time: '2m ago' }, { title: 'Low Attendance', desc: '3 students below 75% threshold.', type: 'alert', time: '1h ago' }, { title: 'Server Sync', desc: 'Automatic database backup completed.', type: 'success', time: '5h ago' }].map((alert, idx) => (
                    <div key={idx} className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all text-left relative overflow-hidden group">
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${alert.type === 'alert' ? 'bg-red-500' : alert.type === 'success' ? 'bg-green-500' : 'bg-cyan-500'}`}></div>
                        <div className="flex justify-between items-start mb-1"><h4 className="text-xs font-black uppercase tracking-wider">{alert.title}</h4><span className="text-[9px] font-mono text-slate-600 group-hover:text-slate-400 transition-colors">{alert.time}</span></div>
                        <p className="text-xs text-slate-400 leading-relaxed">{alert.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );

  const StudentsView = () => (
    <div className="glass-card rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-white/5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Master Directory</h3>
            <button onClick={handleAddClick} className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm font-bold transition-all shadow-lg shadow-purple-900/40"><UserPlus size={16} /> Add Student</button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="text-[10px] uppercase text-slate-500 bg-slate-900/50"><tr><th className="px-6 py-4">Student</th><th className="px-6 py-4">Roll Number</th><th className="px-6 py-4">Overall Grade</th><th className="px-6 py-4 text-right">Edit</th></tr></thead>
                <tbody className="divide-y divide-slate-800">
                    {students.map(s => (
                        <tr key={s.id} className="hover:bg-white/5 transition-colors group">
                            <td className="px-6 py-4"><div className="flex items-center gap-3 text-left"><div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-bold">{s.name.charAt(0)}</div><span className="font-bold text-sm">{s.name}</span></div></td>
                            <td className="px-6 py-4 font-mono text-slate-400 text-left">{s.roll}</td>
                            <td className="px-6 py-4 text-left"><span className="px-2 py-1 rounded bg-green-500/10 text-green-400 text-xs font-bold">Excellent</span></td>
                            <td className="px-6 py-4 text-right"><button onClick={() => handleEditClick(s)} className="p-2 hover:bg-white/10 rounded-lg transition-colors"><MoreVertical size={16} /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );

  const AttendanceView = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div><h3 className="text-lg font-bold">Attendance Register</h3><p className="text-slate-500 text-xs">Mark or edit records for any date.</p></div>
            <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex items-center shadow-inner"><button onClick={() => changeDate(-1)} className="p-2 hover:bg-white/5 rounded-lg"><ChevronLeft size={16} /></button><input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="bg-transparent text-xs font-bold p-1 outline-none appearance-none" /><button onClick={() => changeDate(1)} className="p-2 hover:bg-white/5 rounded-lg"><ChevronRight size={16} /></button></div>
        </div>
        <div className="glass-card rounded-2xl overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-slate-900/50 text-[10px] uppercase text-slate-500"><tr><th className="px-6 py-4">Student</th><th className="px-6 py-4 text-center">Mark Status</th></tr></thead>
                <tbody className="divide-y divide-slate-800">{students.map(s => (
                    <tr key={s.id} className="group"><td className="px-6 py-4"><p className="font-bold text-sm">{s.name}</p><p className="text-[10px] text-slate-500 font-mono">{s.roll}</p></td><td className="px-6 py-4 flex justify-center gap-3">{['P', 'A'].map(status => (
                        <button key={status} onClick={() => markAttendance(s.id, status)} className={`w-11 h-11 rounded-2xl border-2 font-bold text-xs transition-all shadow-lg ${s.att[selectedDate] === status ? (status === 'P' ? 'bg-green-600 border-green-500 scale-110' : 'bg-red-600 border-red-500 scale-110') : 'border-slate-800 bg-slate-950 text-slate-600 hover:border-slate-500'}`}>{status}</button>
                    ))}</td></tr>
                ))}</tbody>
            </table>
        </div>
    </div>
  );

  const AssignmentView = () => (
    <div className="glass-card rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        <div className="p-6 border-b border-slate-800 bg-white/5"><h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Assignment Grading</h3></div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-slate-900/50 text-[10px] uppercase text-slate-500"><tr><th className="px-6 py-4">Student</th><th className="px-6 py-4 text-center">History (Marks & Status)</th><th className="px-6 py-4 text-right">Actions</th></tr></thead>
                <tbody className="divide-y divide-slate-800">{students.map(s => (
                    <tr key={s.id} className="group">
                        <td className="px-6 py-4"><p className="font-bold text-sm">{s.name}</p><p className="text-[10px] text-slate-500 font-mono">{s.roll}</p></td>
                        <td className="px-6 py-4"><div className="flex justify-center gap-2">{s.assignments.map((as, i) => (
                            <div key={i} onClick={() => handleGradeClick(s, i)} className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center text-[10px] font-mono border transition-all cursor-pointer hover:scale-105 ${as.s === 'miss' ? 'bg-red-500/10 border-red-500/30 text-red-400' : as.s === 'late' ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' : 'bg-slate-800 border-slate-700 text-slate-300'}`}>
                                <span className="font-bold">{as.s === 'miss' ? 'M/S' : as.v}</span>
                                {as.s === 'late' && <span className="text-[7px] uppercase font-bold opacity-70">Late</span>}
                            </div>
                        ))}</div></td>
                        <td className="px-6 py-4 text-right text-purple-400 text-xs font-bold uppercase group-hover:underline cursor-pointer">View Details</td>
                    </tr>
                ))}</tbody>
            </table>
        </div>
    </div>
  );

  const TimetableView = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold">Timetable Management</h2>
                <p className="text-slate-500 text-xs">Manage class schedules and room allocations.</p>
            </div>
            <button onClick={() => handleTimetableAction()} className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm font-bold transition-all"><Plus size={16} /> Add Schedule</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timetable.map((t) => (
                <div key={t.id} className="glass-card p-6 rounded-3xl relative group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-xl flex items-center justify-center"><Clock size={24} /></div>
                        <div className="flex gap-2">
                            <button onClick={() => handleTimetableAction(t)} className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all"><Edit3 size={16} /></button>
                            <button onClick={() => deleteTimetableItem(t.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-slate-500 hover:text-red-400 transition-all"><Trash2 size={16} /></button>
                        </div>
                    </div>
                    <h3 className="text-lg font-bold mb-1">{t.subject}</h3>
                    <p className="text-slate-500 text-xs font-mono mb-4">{t.time} • {t.room}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${t.status === 'In Progress' ? 'bg-green-500/10 text-green-400' : 'bg-slate-800 text-slate-500'}`}>{t.status}</span>
                        <Star size={16} className="text-slate-700" />
                    </div>
                </div>
            ))}
        </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
        case 'Students': return <StudentsView />;
        case 'Attendance': return <AttendanceView />;
        case 'Assignment': return <AssignmentView />;
        case 'Timetable': return <TimetableView />;
        default: return <HomeView />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {renderContent()}

      <AnimatePresence>
        {modalMode && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="glass-card w-full max-w-sm rounded-[2.5rem] overflow-hidden relative shadow-huge text-left">
              <div className="p-10">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
                    {modalMode === 'add' ? <UserPlus size={32} className="text-white" /> : modalMode === 'grade' ? <Star size={32} className="text-white" /> : modalMode === 'timetable' ? <Calendar size={32} className="text-white" /> : <Users size={32} className="text-white" />}
                </div>
                <h2 className="text-2xl font-bold mb-1">{modalMode === 'add' ? 'Add Student' : modalMode === 'grade' ? 'Grade Assignment' : modalMode === 'timetable' ? 'Class Schedule' : 'Edit Profile'}</h2>
                <p className="text-slate-500 text-sm mb-8">{modalMode === 'timetable' ? 'Configure class time and room.' : 'Update information mapping.'}</p>
                
                {modalMode === 'grade' ? (
                  <div className="space-y-6">
                    <div className="space-y-2"><label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Marks (0-100)</label><input type="number" value={gradingForm.score} onChange={(e) => setGradingForm({...gradingForm, score: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 px-5 focus:border-purple-500 outline-none transition-all font-bold text-lg" /></div>
                    <div className="space-y-4"><label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Submission Status</label><div className="grid grid-cols-2 gap-3">{[{ id: 'sub', label: 'Submitted', icon: Check, color: 'green' }, { id: 'late', label: 'Late', icon: Clock, color: 'orange' }, { id: 'miss', label: 'Missing', icon: FileX, color: 'red' }].map(st => (<button key={st.id} onClick={() => setGradingForm({...gradingForm, status: st.id})} className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${gradingForm.status === st.id ? `border-${st.color}-500 bg-${st.color}-500/10 shadow-lg` : 'border-slate-800 bg-slate-900 text-slate-500 grayscale'}`}><st.icon size={20} /><span className="text-[10px] font-black uppercase tracking-widest">{st.label}</span></button>))}</div></div>
                  </div>
                ) : modalMode === 'timetable' ? (
                  <div className="space-y-4">
                    <div className="space-y-2"><label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Subject Name</label><input type="text" value={timetableForm.subject} onChange={(e) => setTimetableForm({...timetableForm, subject: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-3 px-5 focus:border-purple-500 outline-none transition-all" /></div>
                    <div className="space-y-2"><label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Time (e.g. 09:00 AM)</label><input type="text" value={timetableForm.time} onChange={(e) => setTimetableForm({...timetableForm, time: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-3 px-5 focus:border-purple-500 outline-none transition-all" /></div>
                    <div className="space-y-2"><label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Room/Lab</label><input type="text" value={timetableForm.room} onChange={(e) => setTimetableForm({...timetableForm, room: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-3 px-5 focus:border-purple-500 outline-none transition-all" /></div>
                    <div className="space-y-2"><label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Status</label><select value={timetableForm.status} onChange={(e) => setTimetableForm({...timetableForm, status: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-3 px-5 focus:border-purple-500 outline-none transition-all appearance-none text-sm">{['Upcoming', 'In Progress', 'Completed', 'Cancelled'].map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-2"><label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Full Name</label><input type="text" value={studentForm.name} onChange={(e) => setStudentForm({...studentForm, name: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 px-5 focus:border-purple-500 outline-none transition-all" /></div>
                    <div className="space-y-2"><label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Roll Number</label><input type="text" value={studentForm.roll} onChange={(e) => setStudentForm({...studentForm, roll: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 px-5 focus:border-purple-500 outline-none transition-all font-mono" /></div>
                  </div>
                )}

                <div className="flex gap-4 pt-8">
                    <button onClick={() => setModalMode(null)} className="flex-1 py-4 border border-slate-800 hover:bg-white/5 rounded-2xl font-bold transition-all text-slate-400">Cancel</button>
                    <button onClick={handleSave} className="flex-1 py-4 bg-purple-600 hover:bg-purple-500 rounded-2xl font-bold transition-all shadow-xl shadow-purple-900/50">Confirm</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StaffDashboard;
