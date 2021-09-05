import React, {ReactNode, useContext, useEffect, useState} from 'react';
import {auth} from '../firebase';
// one frameworks used to be compatible with firebase api
import {User, UserCredential} from '@firebase/auth-types';

interface CurrentUser extends User {
  password: string;
  updatePassword: (password: string) => any;
  updateEmail: (email: string) => any
}

// AuthContext interface used to define the project context.
const AuthContext = React.createContext<{
  currentUser: CurrentUser | null;
  register: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateEmail: (email: string) => any;
  updatePassword: (password: string) => any;
} | undefined>(undefined);


export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  // register, login, logout, resetPassword, updateEmail, updatePassword can get the firebase original APIs
  const register = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  const login = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  }

  const logout = () => {
    return auth.signOut();
  }

  const resetPassword = (email: string) => {
    return auth.sendPasswordResetEmail(email);
  }

  const updateEmail = (email: string) => {
    return currentUser?.updateEmail(email);
  }

  const updatePassword = (password: string) => {
    return currentUser?.updatePassword(password);
  }

  // after the whole project rendered, execute one time
  useEffect(() => {
    return auth.onAuthStateChanged((user: User | null) => {
      setCurrentUser(user as CurrentUser);
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{currentUser, register, login, logout, resetPassword, updateEmail, updatePassword}}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

// confirm the context is exist, thus all the context content can be used by other components.
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used in AuthProvider");
  }
  return context;
};