import React, { createContext, useState, useContext, useEffect } from 'react';
import { router } from 'expo-router';

type User = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profileCompleted?: boolean;
} | null;

type AuthContextType = {
  user: User;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  isLoading: false,
  error: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.replace('/(auth)');
    }
  }, [user]);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Mock authentication
      setUser({
        id: '1',
        email,
        firstName: 'John',
        lastName: 'Doe',
        profileCompleted: true
      });
      router.replace('/(app)/(tabs)');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Mock sign up
      setUser({
        id: '1',
        email,
        profileCompleted: false
      });
      router.replace('/(onboarding)');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      setUser(null);
      router.replace('/(auth)');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};