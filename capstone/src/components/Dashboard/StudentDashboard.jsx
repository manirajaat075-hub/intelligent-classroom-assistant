import React from 'react';
import { Award, BookOpen, Clock, TrendingUp, CheckCircle2 } from 'lucide-react';

const StudentDashboard = ({ students = [], timetable = [] }) => {
  const currentStudent = students[0] || { name: 'Student', roll: 'N/A', att: {}, assignments: [] };
  
  // Calculate real metrics from sync data
  const attendanceRate = currentStudent.att ? Object.values(currentStudent.att).filter(v => v === 'P').length / (Object.keys(currentStudent.att).length || 1) * 100 : 0;
  const displayAttendance = attendanceRate > 0 ? `${Math.round(attendanceRate)}%` : "92%"; // Dummy for demo if no data

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Attendance Progress circle */}
        <div className="glass-card p-8 rounded-3xl flex flex-col items-center text-center">
          <div className="relative w-32 h-32 flex items-center justify-center mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
              <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                className="text-cyan-500"
                strokeDasharray={364.4}
                strokeDashoffset={364.4 * (1 - 0.92)}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">{displayAttendance}</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Attendance</span>
            </div>
          </div>
          <p className="text-slate-400 text-sm">Your presence in class is being tracked in real-time.</p>
        </div>

        {/* Assignment Stats */}
        <div className="glass-card p-8 rounded-3xl col-span-1 md:col-span-2 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Academic Standing</h3>
            <p className="text-slate-400 mb-8">Consistently performing in top 10% of the class.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div className="space-y-1">
              <span className="text-slate-500 text-xs uppercase font-bold tracking-wider">Avg. Score</span>
              <p className="text-2xl font-bold text-purple-400 flex items-center gap-2">8.8 <TrendingUp size={16} /></p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-500 text-xs uppercase font-bold tracking-wider">Assignments</span>
              <p className="text-2xl font-bold text-cyan-400 flex items-center gap-2">10/12 <CheckCircle2 size={16} /></p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-500 text-xs uppercase font-bold tracking-wider">Rank</span>
              <p className="text-2xl font-bold text-yellow-400 flex items-center gap-2">#04 <Award size={16} /></p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Assignments Table */}
        <div className="glass-card rounded-3xl overflow-hidden self-start">
          <div className="p-6 border-b border-slate-800 bg-white/5 flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2"><BookOpen size={20} className="text-purple-400" /> Recent Assignments</h3>
            <button className="text-xs font-bold text-slate-500 hover:text-white transition-colors">View All</button>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-900/50 text-[10px] uppercase font-bold text-slate-500">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Marks</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {currentStudent.assignments.map((task, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-sm">Assignment {i+1}</p>
                      <p className="text-xs text-slate-500">Core Evaluation</p>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">{task.s === 'miss' ? 'M/S' : task.v}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${
                        task.s === 'sub' ? 'bg-green-500/10 text-green-400' : 'bg-orange-500/10 text-orange-400'
                      }`}>
                        {task.s === 'sub' ? 'Graded' : task.s === 'late' ? 'Late' : 'Missing'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Timetable Grid */}
        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2"><Clock size={20} className="text-cyan-400" /> Today's Schedule</h3>
            <span className="text-xs font-bold text-slate-500">Tuesday, Mar 17</span>
          </div>
          <div className="space-y-4">
            {timetable.map((slot, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 mb-1 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
                  <div className="flex-1 w-[1px] bg-slate-800"></div>
                </div>
                <div className="flex-1 pb-6 group-last:pb-2">
                  <span className="text-xs font-mono text-slate-500 mb-1 block">{slot.time}</span>
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 group-hover:border-slate-700 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold">{slot.subject}</h4>
                      <span className="text-[10px] bg-white/5 px-2 py-1 rounded font-bold text-slate-400">{slot.room}</span>
                    </div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">{slot.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
