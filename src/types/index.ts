export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  completed: boolean;
  userId: string;
  familyId: string;
}

export interface User {
  id: string;
  email: string;
  familyId: string;
  name: string;
  password: string;
}

export interface Theme {
  isDark: boolean;
  toggle: () => void;
}

export type AuthView = 'login' | 'register' | 'forgot-password';