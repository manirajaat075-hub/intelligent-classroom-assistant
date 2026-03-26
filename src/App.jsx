import React, { useState, useEffect, useCallback } from 'react';
import LandingPage from './components/LandingPage';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import StaffDashboard from './components/Dashboard/StaffDashboard';
import StudentDashboard from './components/Dashboard/StudentDashboard';

import JoinClassroom from './components/JoinClassroom';
import StaffLogin from './components/StaffLogin';
import { Component as SignInCard } from './components/ui/sign-in-card-2';
import ShaderBackground from './components/ui/shader-background';

function App() {
  const [view, setView] = useState('landing');
  const [activeTab, setActiveTab] = useState('Home');
  const [classroom, setClassroom] = useState('');
  const [students, setStudents] = useState([]);
  const [timetable, setTimetable] = useState([]);

  const loadData = useCallback((id) => {
    if (!id) return;
    const savedData = localStorage.getItem(`CLASS_DATA_${id}`);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setStudents(parsed.students || []);
      setTimetable(parsed.timetable || []);
    } else {
      const initialStudents = [
        { id: 1, name: 'Alex Johnson', roll: 'CS001', att: {}, assignments: [{v: 85, s: 'sub'}, {v: 90, s: 'sub'}, {v: 88, s: 'sub'}] },
        { id: 2, name: 'Sarah Williams', roll: 'CS002', att: {}, assignments: [{v: 92, s: 'sub'}, {v: 88, s: 'sub'}, {v: 0, s: 'late'}] },
      ];
      const initialTimetable = [
        { id: 1, time: '09:00 AM', subject: 'Cloud Computing', room: 'Lab 4', status: 'Ongoing' },
        { id: 2, time: '11:30 AM', subject: 'AI Ethics', room: 'Hall A', status: 'Next' },
      ];
      setStudents(initialStudents);
      setTimetable(initialTimetable);
      localStorage.setItem(`CLASS_DATA_${id}`, JSON.stringify({ students: initialStudents, timetable: initialTimetable }));
    }
  }, []);

  // Sync with LocalStorage on init
  useEffect(() => {
    loadData(classroom);
  }, [classroom, loadData]);

  // CROSS-TAB SYNC: Listen for storage changes in other tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === `CLASS_DATA_${classroom}`) {
        loadData(classroom);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [classroom, loadData]);

  // Save updates to LocalStorage
  useEffect(() => {
    if (classroom && students.length > 0) {
      localStorage.setItem(`CLASS_DATA_${classroom}`, JSON.stringify({ students, timetable }));
    }
  }, [students, timetable, classroom]);

  const handleLogin = (role) => {
    if (role === 'student') {
      setView('student_join');
    } else {
      setView('staff_login');
    }
  };

  const handleStaffAuth = (user) => {
    if (user && user.classroomId) {
      setClassroom(user.classroomId);
    }
    setView('staff_dashboard');
    setActiveTab('Home');
  };

  const handleJoinClass = (id) => {
    if (!id) return;
    if (id.trim() === '1234') {
      alert('This is a Staff Access Code. Please use your Student Classroom ID.');
      return;
    }
    setClassroom(id);
    setView('student_dashboard');
    setActiveTab('Home');
  };

  const handleLogout = () => {
    setView('landing');
    setClassroom('');
    setStudents([]);
    setTimetable([]);
  };

  return (
    <div className="relative z-10 min-h-screen font-sans text-slate-200">
      <ShaderBackground />
      {view === 'landing' && <LandingPage onLogin={handleLogin} />}
      
      {view === 'student_join' && (
        <SignInCard 
          title="Join Room" 
          subtitle="Enter authorized Classroom Identifier" 
          emailLabel="Classroom ID"
          emailPlaceholder="e.g. CR-101"
          showPasswordField={false}
          buttonText="Submit Access Code"
          onLogin={(data) => handleJoinClass(data.email)}
          onSignUpClick={() => setView('landing')}
        />
      )}
      
      {view === 'staff_login' && (
        <SignInCard 
          title="Staff Login" 
          subtitle="Secure Console Access" 
          emailLabel="Work Email"
          emailPlaceholder="staff@ai-x.edu"
          showPasswordField={true}
          buttonText="Verify Identity"
          onLogin={(data) => {
            if (data.password === '1234') {
              handleStaffAuth({ name: 'Staff Member', email: data.email, classroomId: 'CR-7788' });
            } else {
              alert('Access Denied: Incorrect Passcode');
            }
          }}
          onSignUpClick={() => setView('landing')}
        />
      )}
      
      {(view === 'staff_dashboard' || view === 'student_dashboard') && (
        <DashboardLayout 
          role={view === 'staff_dashboard' ? 'staff' : 'student'} 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={handleLogout}
          classroomId={classroom}
        >
          {view === 'staff_dashboard' ? (
            <StaffDashboard 
              activeTab={activeTab} 
              students={students} 
              setStudents={setStudents}
              timetable={timetable}
              setTimetable={setTimetable}
            />
          ) : (
            <StudentDashboard 
              activeTab={activeTab} 
              students={students}
              timetable={timetable}
            />
          )}
        </DashboardLayout>
      )}
    </div>
  );
}

export default App;
