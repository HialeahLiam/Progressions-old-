import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  createUserWithEmailAndPassword, onAuthStateChanged,
  signOut as signOutFirebase,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import { auth } from '../firebase';

export const AuthContext = createContext(1);

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [authAlert, setAuthAlert] = useState('');
  const navigate = useNavigate();

  const signUp = (username, email, password) => {
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        fetch('/api/v1/users/register', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            email: userCredentials.user.email,
            id: userCredentials.user.uid,
          }),
        })
          .then(() => updateProfile(auth.currentUser, {
            displayName: username,
          }))
          .then((response) => response.json())
          .then((body) => console.log(body));
      })
      .catch((error) => {
        setLoading(false);
        setError(error.code);
        throw error;
      });
  };

  const login = async (email, password) => {
    setLoading(true);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAuthAlert('Logged in successfully!');
    } catch (error) {
      setLoading(false);
      setError(error.code);
      throw error;
    }
  };

  const signOut = () => {
    console.log('Sign out!');
    signOutFirebase(auth)
      .then(() => {
        // Sign-out successful.
        setAuthAlert('Signed out successfully!');
      }).catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    console.log('AuthState change!');
    setError('');

    // firebase return an Unsubscribe function to remove observer callback,
    // which we run when component unmounts
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {
          accessToken, displayName, email, uid,
        } = user;
        setCurrentUser({
          token: accessToken,
          username: displayName,
          email,
          id: uid,
        });
      } else {
        // User is signed out
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  function handleAlertClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setAuthAlert('');
  }

  const contextValue = {
    currentUser,
    signUp,
    login,
    signOut,
    error,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {/* authState changes every page refresh. Checking loading variable
        prevents children components from rendering until changes are finished.

        This is a fallback in case components depending on user data don't check
        if currentUser is empty */}
      {!loading && (
        <>
          {children}
          <Snackbar
            open={authAlert}
            autoHideDuration={6000}
            onClose={handleAlertClose}
            message={authAlert}
            // action={action}
          />
        </>
      )}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
