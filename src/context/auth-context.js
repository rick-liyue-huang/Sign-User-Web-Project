import React, {useContext, useEffect, useState} from 'react';
import {auth} from '../firebase';
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}
export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const register = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  }

  const logout = () => {
    return auth.signOut();
  }

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  }

  const updateEmail = (email) => {
    return currentUser.updateEmail(email);
  }

  const updatePassword = (password) => {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  const value = {
    currentUser, register, login, logout, resetPassword, updateEmail, updatePassword
  };


  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}