import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Task } from '../types';

interface CalendarProps {
  tasks: Task[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  currentUserId: string;
  isDark: boolean;
}

export default function Calendar({
  tasks,
  selectedDate,
  onDateSelect,
  onPrevMonth,
  onNextMonth,
  currentUserId,
  isDark,
}: CalendarProps) {
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const monthName = selectedDate.toLocaleString('default', { month: 'long' });
  
  const getTasksForDate = (day: number) => {
    const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day).toISOString().split('T')[0];
    return tasks.filter(task => task.date === date);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === selectedDate.getMonth() &&
      today.getFullYear() === selectedDate.getFullYear()
    );
  };

  return (
    <div className={`rounded-xl shadow-lg overflow-hidden h-full ${
      isDark ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className={`p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <CalendarIcon className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {monthName} {selectedDate.getFullYear()}
            </h2>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={onPrevMonth}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
            </button>
            <button 
              onClick={onNextMonth}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <ChevronRight className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6 h-[calc(100vh-12rem)]">
        <div className="grid grid-cols-7 gap-2 h-full">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div 
              key={day} 
              className={`text-center text-sm font-medium py-2 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {day}
            </div>
          ))}
          
          {Array(firstDayOfMonth).fill(null).map((_, i) => (
            <div key={`empty-${i}`} className="calendar-cell" />
          ))}
          
          {days.map(day => {
            const dayTasks = getTasksForDate(day);
            const isSelected = day === selectedDate.getDate();
            const ownTasks = dayTasks.filter(task => task.userId === currentUserId);
            const familyTasks = dayTasks.filter(task => task.userId !== currentUserId);
            
            return (
              <button
                key={day}
                onClick={() => onDateSelect(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
                className={`
                  relative p-3 rounded-lg transition-all duration-200 min-h-[100px]
                  ${isSelected 
                    ? isDark 
                      ? 'bg-blue-900 ring-2 ring-blue-500' 
                      : 'bg-blue-50 ring-2 ring-blue-400'
                    : isDark
                      ? 'hover:bg-gray-700'
                      : 'hover:bg-gray-50'
                  }
                  ${isToday(day) 
                    ? isDark
                      ? 'ring-2 ring-blue-400'
                      : 'ring-2 ring-blue-200'
                    : ''
                  }
                `}
              >
                <span className={`
                  text-sm font-medium
                  ${isSelected 
                    ? isDark
                      ? 'text-blue-300'
                      : 'text-blue-600'
                    : isDark
                      ? 'text-gray-300'
                      : 'text-gray-900'
                  }
                  ${isToday(day) 
                    ? isDark
                      ? 'text-blue-300'
                      : 'text-blue-600'
                    : ''
                  }
                `}>
                  {day}
                </span>
                
                <div className="mt-2 space-y-1 max-h-[80px] overflow-y-auto">
                  {ownTasks.map((task, index) => (
                    <div
                      key={task.id}
                      className={`text-xs truncate rounded px-1.5 py-0.5 ${
                        isDark
                          ? 'bg-blue-900 text-blue-200'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                      title={task.title}
                    >
                      {task.title}
                    </div>
                  ))}
                  
                  {familyTasks.map((task, index) => (
                    <div
                      key={task.id}
                      className={`text-xs truncate rounded px-1.5 py-0.5 ${
                        isDark
                          ? 'bg-purple-900 text-purple-200'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                      title={task.title}
                    >
                      {task.title}
                    </div>
                  ))}
                </div>
                
                {(ownTasks.length > 3 || familyTasks.length > 3) && (
                  <div className={`absolute bottom-1 right-1 text-xs ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    +{ownTasks.length + familyTasks.length - 3} more
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}