import React, { useState, useEffect } from 'react';
import { Plus, Save, Clock } from 'lucide-react';
import { Task } from '../types';

interface TaskFormProps {
  onTaskAdd: (task: Omit<Task, 'id'>) => void;
  editingTask: Task | null;
  onTaskUpdate: (updatedTask: Task) => void;
  isDark: boolean;
}

export default function TaskForm({ onTaskAdd, editingTask, onTaskUpdate, isDark }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('09:00');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setTime(editingTask.time);
      setDate(editingTask.date);
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      if (editingTask) {
        onTaskUpdate({
          ...editingTask,
          title,
          description,
          time,
          date
        });
      } else {
        onTaskAdd({
          title,
          description,
          time,
          date,
          completed: false,
          userId: '', // This will be set in App.tsx
          familyId: '', // This will be set in App.tsx
        });
      }
      setTitle('');
      setDescription('');
      setTime('09:00');
      setDate(new Date().toISOString().split('T')[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${
      isDark ? 'bg-gray-800' : 'bg-white'
    } rounded-xl shadow-lg p-6`}>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className={`block text-sm font-medium ${
            isDark ? 'text-gray-200' : 'text-gray-700'
          }`}>
            Task Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`mt-1 block w-full rounded-lg shadow-sm ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'border-gray-300 text-gray-900'
            } focus:border-blue-500 focus:ring-blue-500`}
            placeholder="Enter task title"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className={`block text-sm font-medium ${
              isDark ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`mt-1 block w-full rounded-lg shadow-sm ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'border-gray-300 text-gray-900'
              } focus:border-blue-500 focus:ring-blue-500`}
            />
          </div>

          <div>
            <label htmlFor="time" className={`block text-sm font-medium ${
              isDark ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Time
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className={`h-4 w-4 ${
                  isDark ? 'text-gray-400' : 'text-gray-400'
                }`} />
              </div>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={`block w-full pl-10 rounded-lg ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'border-gray-300 text-gray-900'
                } focus:ring-blue-500 focus:border-blue-500`}
              />
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="description" className={`block text-sm font-medium ${
            isDark ? 'text-gray-200' : 'text-gray-700'
          }`}>
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className={`mt-1 block w-full rounded-lg shadow-sm ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'border-gray-300 text-gray-900'
            } focus:border-blue-500 focus:ring-blue-500`}
            placeholder="Enter task description"
          />
        </div>
        
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {editingTask ? (
            <>
              <Save className="w-4 h-4" />
              Update Task
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Add Task
            </>
          )}
        </button>
      </div>
    </form>
  );
}