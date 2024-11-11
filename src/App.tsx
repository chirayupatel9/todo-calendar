import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Login from './components/Login';
import FireworksAnimation from './components/FireworksAnimation';
import ThemeToggle from './components/ThemeToggle';
import { Task, User } from './types';
import { LogOut, Users } from 'lucide-react';

// Mock family data
const MOCK_FAMILY = {
  id: 'family1',
  members: [
    { id: '1', email: 'parent@example.com', name: 'Parent', familyId: 'family1', password: 'password' },
    { id: '2', email: 'child@example.com', name: 'Child', familyId: 'family1', password: 'password' },
    { id: '3', email: 'spouse@example.com', name: 'Spouse', familyId: 'family1', password: 'password' },
  ]
};

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAnimation, setShowAnimation] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const handleLogin = (email: string, password: string) => {
    const user = MOCK_FAMILY.members.find(
      member => member.email === email && member.password === password
    );
    if (user) {
      setUser(user);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleRegister = (email: string, password: string, name: string) => {
    // In a real app, this would make an API call
    alert('Registration functionality would be implemented here');
  };

  const handleForgotPassword = (email: string) => {
    // In a real app, this would trigger a password reset email
    alert('Password reset functionality would be implemented here');
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleTaskAdd = (task: Omit<Task, 'id'>) => {
    const newTask = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
      userId: user!.id,
      familyId: user!.familyId,
    };
    setTasks([...tasks, newTask]);
  };

  const handleTaskComplete = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        setShowAnimation(true);
        return { ...task, completed: true };
      }
      return task;
    }));
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleTaskEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    setEditingTask(null);
  };

  if (!user) {
    return (
      <Login 
        onLogin={handleLogin}
        onRegister={handleRegister}
        onForgotPassword={handleForgotPassword}
      />
    );
  }

  const familyMembers = MOCK_FAMILY.members.filter(member => member.id !== user.id);

  return (
    <div className={`min-h-screen ${
      isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-50'
    } p-4`}>
      {showAnimation && (
        <FireworksAnimation onComplete={() => setShowAnimation(false)} />
      )}
      
      <div className="max-w-[2000px] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <h1 className={`text-3xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Family Task Dashboard
            </h1>
            <div className="flex items-center gap-2">
              <span className={`text-sm ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {user.name}
              </span>
              <Users className={`w-4 h-4 ${
                isDark ? 'text-blue-400' : 'text-blue-500'
              }`} />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle isDark={isDark} toggle={toggleTheme} />
            <div className="flex -space-x-2">
              {familyMembers.map(member => (
                <div
                  key={member.id}
                  className={`w-8 h-8 rounded-full ${
                    isDark ? 'bg-blue-600' : 'bg-blue-500'
                  } flex items-center justify-center text-white text-sm border-2 ${
                    isDark ? 'border-gray-800' : 'border-white'
                  }`}
                  title={member.name}
                >
                  {member.name[0]}
                </div>
              ))}
            </div>
            <button
              onClick={handleLogout}
              className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg shadow-sm hover:shadow transition-all ${
                isDark 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-white text-gray-600 hover:text-gray-900'
              }`}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Calendar
              tasks={tasks}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              onPrevMonth={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)))}
              onNextMonth={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)))}
              currentUserId={user.id}
              isDark={isDark}
            />
          </div>
          
          <div className="space-y-6">
            <TaskForm 
              onTaskAdd={handleTaskAdd}
              editingTask={editingTask}
              onTaskUpdate={handleTaskUpdate}
              isDark={isDark}
            />
            <TaskList
              tasks={tasks}
              selectedDate={selectedDate}
              onTaskComplete={handleTaskComplete}
              onTaskDelete={handleTaskDelete}
              onTaskEdit={handleTaskEdit}
              currentUserId={user.id}
              familyMembers={MOCK_FAMILY.members}
              isDark={isDark}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;