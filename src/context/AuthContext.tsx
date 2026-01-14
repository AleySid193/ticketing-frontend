import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthToken } from '@/api/api';

type UserRole = 'admin' | 'manager' | 'user';

interface User {
  id: number;          // ✅ FIXED: number, not string
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Centralized keys (avoids typo bugs later)
const STORAGE_KEYS = {
  TOKEN: '@auth_token',
  USER: '@user_data',
  LAST_ACTIVITY: '@last_activity_time',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const [storedToken, storedUser] = await AsyncStorage.multiGet([
          STORAGE_KEYS.TOKEN,
          STORAGE_KEYS.USER,
        ]);

        const tokenValue = storedToken[1];
        const userValue = storedUser[1];

        if (tokenValue && userValue) {
          const parsedUser: User = JSON.parse(userValue);

          // Minimal shape validation
          if (
            typeof parsedUser.id === 'number' &&
            typeof parsedUser.role === 'string'
          ) {
            setAuthToken(tokenValue);
            setToken(tokenValue);
            setUser(parsedUser);
          } else {
            // Corrupted data → clean up
            await AsyncStorage.multiRemove([
              STORAGE_KEYS.TOKEN,
              STORAGE_KEYS.USER,
            ]);
          }
        }
      } catch (err) {
        console.error('Failed to restore auth state:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAuthState();
  }, []);

  const login = async (newToken: string, newUser: User) => {
    try {
      setAuthToken(newToken);
      setToken(newToken);
      setUser(newUser);

      await AsyncStorage.multiSet([
        [STORAGE_KEYS.TOKEN, newToken],
        [STORAGE_KEYS.USER, JSON.stringify(newUser)],
        [STORAGE_KEYS.LAST_ACTIVITY, Date.now().toString()],
      ]);
    } catch (err) {
      console.error('Login persistence failed:', err);
    }
  };

  const logout = async () => {
    try {
      setAuthToken(undefined);
      setToken(null);
      setUser(null);

      await AsyncStorage.multiRemove([
        STORAGE_KEYS.TOKEN,
        STORAGE_KEYS.USER,
        STORAGE_KEYS.LAST_ACTIVITY,
      ]);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
