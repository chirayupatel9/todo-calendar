import React from 'react';
import { CheckCircle, Circle, Trash2, Edit2, Lock, Clock } from 'lucide-react';
import { Task, User } from '../types';

interface TaskListProps {
  tasks: Task[];
  onTaskComplete: (taskId: string) => void;
  onTaskDelete: (taskId: string) => void;
  onTaskEdit: (task: Task) => void;
  selectedDate: Date;
  currentUserId: string;
  familyMembers: User[];
  isDark: boolean;
}

export default function TaskList({
  tasks,
  onTaskComplete,
  onTaskDelete,
  onTaskEdit,
  selectedDate,
  currentUserId,
  familyMembers,
  isDark,
}: TaskListProps) {
  const filteredTasks = tasks
    .filter(task => task.date === selectedDate.toISOString().split('T')[0])
    .sort((a, b) => a.time.localeCompare(b.time));

  const getTaskOwner = (userId: string) => {
    return familyMembers.find(member => member.id === userId)?.name || 'Unknown';
  };

  const isOwnTask = (task: Task) => task.userId === currentUserId;

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className={`${
      isDark ? 'bg-gray-800' : 'bg-white'
    } rounded-xl shadow-lg p-4 sm:p-6 h-[calc(100vh-20rem)] sm:h-[calc(100vh-2rem)] overflow-auto`}>
      <h2 className={`text-lg sm:text-xl font-bold ${
        isDark ? 'text-white' : 'text-gray-800'
      } mb-4 sticky top-0 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      } pb-4 border-b ${
        isDark ? 'border-gray-700' : 'border-gray-200'
      } z-10 flex items-center justify-between`}>
        <span>Tasks for {selectedDate.toLocaleDateString()}</span>
        <span className={`text-sm font-normal ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
        </span>
      </h2>
      
      <div className="space-y-3">
        {filteredTasks.map(task => {
          const isOwner = isOwnTask(task);
          
          return (
            <div
              key={task.id}
              className={`group flex items-start gap-3 p-4 rounded-lg transition-all ${
                isDark
                  ? task.completed
                    ? 'bg-green-900/20 hover:bg-green-900/30'
                    : 'bg-gray-700/50 hover:bg-gray-700'
                  : task.completed
                    ? 'bg-green-50 hover:bg-green-100'
                    : 'bg-gray-50 hover:bg-gray-100'
              } hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200`}
            >
              <button
                onClick={() => isOwner && onTaskComplete(task.id)}
                className={`mt-1 transition-colors ${
                  isOwner
                    ? isDark
                      ? 'text-gray-400 hover:text-green-400'
                      : 'text-gray-500 hover:text-green-500'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
                disabled={!isOwner}
              >
                {task.completed ? (
                  <CheckCircle className={`w-5 h-5 ${
                    isDark ? 'text-green-400' : 'text-green-500'
                  }`} />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className={`font-medium truncate ${
                    task.completed
                      ? isDark
                        ? 'line-through text-gray-400'
                        : 'line-through text-gray-500'
                      : isDark
                        ? 'text-white'
                        : 'text-gray-800'
                  }`}>
                    {task.title}
                  </h3>
                  <div className={`flex items-center gap-1 text-xs ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <Clock className="w-3 h-3" />
                    {formatTime(task.time)}
                  </div>
                  <span className={`text-xs ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    ({getTaskOwner(task.userId)}'s task)
                  </span>
                </div>
                <p className={`text-sm mt-1 ${
                  task.completed
                    ? isDark
                      ? 'text-gray-500'
                      : 'text-gray-400'
                    : isDark
                      ? 'text-gray-300'
                      : 'text-gray-600'
                }`}>
                  {task.description}
                </p>
              </div>
              
              {isOwner ? (
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onTaskEdit(task)}
                    className={`${
                      isDark
                        ? 'text-gray-400 hover:text-blue-400'
                        : 'text-gray-400 hover:text-blue-500'
                    } transition-colors`}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onTaskDelete(task.id)}
                    className={`${
                      isDark
                        ? 'text-gray-400 hover:text-red-400'
                        : 'text-gray-400 hover:text-red-500'
                    } transition-colors`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
        
        {filteredTasks.length === 0 && (
          <div className="text-center py-12 px-4">
            <div className={`${
              isDark ? 'text-gray-600' : 'text-gray-400'
            } mb-3`}>
              <Circle className="w-12 h-12 mx-auto stroke-1" />
            </div>
            <h3 className={`text-lg font-medium ${
              isDark ? 'text-gray-200' : 'text-gray-900'
            } mb-1`}>
              No tasks for this day
            </h3>
            <p className={`${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Add a new task to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}