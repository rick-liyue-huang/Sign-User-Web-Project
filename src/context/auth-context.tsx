import React, {ReactNode, useContext, useEffect, useState} from 'react';
import {auth} from '../firebase';
import {User, UserCredential} from '@firebase/auth-types';

// export interface User {
//   email: string;
//   password: string;
//   updateEmail?: (email: string) => any;
// }

// export interface AuthForm {
//   email: string;
//   password: string;
// }

interface CurrentUser extends User {
  password: string;
  updatePassword: (password: string) => any;
  updateEmail: (email: string) => any
}

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

  useEffect(() => {
    return auth.onAuthStateChanged((user: User | null) => {
      setCurrentUser(user as CurrentUser);
      setLoading(false);
    });
  }, []);

  const value = {
    currentUser, register, login, logout, resetPassword, updateEmail, updatePassword
  };


  return (
    <AuthContext.Provider value={{currentUser, register, login, logout, resetPassword, updateEmail, updatePassword}}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used in AuthProvider");
  }
  return context;
};