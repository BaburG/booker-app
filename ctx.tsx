import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';
import axios from 'axios';

const AuthContext = createContext<{
  signIn: (username: string, password: string) => Promise<any>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  getSessionId: () => string | null;
}>({
  signIn: async () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  getSessionId: () => null,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  const getSessionId = () => session;

  const signIn = async (username: string, password: string) => {
    try {
      const response = await axios.post('http://192.168.1.106:8000/api/token', {
        username,
        password,
      });
      
      const sessionId= response.data.token;
      setSession(sessionId);
      console.log(getSessionId());
    } catch (error) {
      console.error('Failed to sign in', error);
      throw error; // Rethrow the error to handle it in the component
    }
  };

  const signOut = () => {
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading,
        getSessionId,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
