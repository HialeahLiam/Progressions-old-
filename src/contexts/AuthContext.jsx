import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  createUserWithEmailAndPassword, onAuthStateChanged,

  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase';

export const AuthContext = createContext(1);

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  useEffect(() => {
    // firebase return an Unsubscribe function to remove observer callback,
    // which we run when component unmounts
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextValue = {
    currentUser,
    signUp,
    login,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {/* authState changes every page refresh. Checking loading variable
        prevents children components from rendering until changes are finished.

        This is a fallback in case components depending on user data don't check
        if currentUser is empty */}
      {!loading && children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
