import React, { createContext, useState, useContext, useEffect } from 'react';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { supabase } from '@/lib/supabase';

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session
    checkUser();
    
    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // Get user profile data
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          const userData = {
            id: session.user.id,
            email: session.user.email || '',
            firstName: profile?.first_name,
            lastName: profile?.last_name,
            profileCompleted: profile?.onboarding_completed || false,
          };
          
          setUser(userData);
          setIsLoading(false);
          
          // Redirect based on profile completion
          if (!profile?.onboarding_completed) {
            router.replace('/(onboarding)');
          } else {
            router.replace('/(app)/(tabs)');
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          router.replace('/(auth)');
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          firstName: profile?.first_name,
          lastName: profile?.last_name,
          profileCompleted: profile?.onboarding_completed || false,
        });
        
        // Redirect based on profile completion
        if (!profile?.onboarding_completed) {
          router.replace('/(onboarding)');
        } else {
          router.replace('/(app)/(tabs)');
        }
      } else {
        router.replace('/(auth)');
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
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
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      
      // Create a profile record
      await supabase.from('profiles').insert([
        { 
          id: (await supabase.auth.getUser()).data.user?.id,
          email, 
          onboarding_completed: false 
        }
      ]);
      
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
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