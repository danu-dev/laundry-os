import { create } from 'zustand';
import Cookies from 'js-cookie';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  outlet: {
    id: number;
    name: string;
    address: string;
    phone: string;
  };
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  loadUserFromStorage: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => {
    Cookies.remove('token');
    Cookies.remove('user');
    set({ user: null, isAuthenticated: false });
  },
  loadUserFromStorage: () => {
    const userStr = Cookies.get('user');
    const token = Cookies.get('token');
    if (userStr && token) {
      try {
        const user = JSON.parse(userStr);
        set({ user, isAuthenticated: true });
      } catch (e) {
        set({ user: null, isAuthenticated: false });
      }
    }
  }
}));
