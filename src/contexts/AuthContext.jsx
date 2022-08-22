import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  createUserWithEmailAndPassword, onAuthStateChanged,
  signOut as signOutFirebase,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase';

export const AuthContext = createContext(1);

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  console.log(loading);

  const signUp = (username, email, password) => {
    console.log('Sign up!');
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
        console.log('Unable to sign up!');
        console.log(error);
      });
  };

  const login = (email, password) => {
    console.log('Login!');
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        // ...
      })
      .catch((error) => {
        console.log('Unable to sign up!');
        console.log(error);
      });
  };

  const signOut = () => {
    console.log('Sign out!');
    signOutFirebase(auth)
      .then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    console.log('AuthState change!');

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

  // ignore
  useEffect(() => {
    // const loggedUserJSON = window.localStorage.getItem('loggedUser');

    // if (!currentUser && loggedUserJSON) {
    //   const user = JSON.parse(loggedUserJSON);
    //   setCurrentUser(user);
    // }
  });

  // ignore
  const updateUser = (body) => {
    console.log(body);

    const user = {
      token: body.auth_token,
      // eslint-disable-next-line no-underscore-dangle
      id: body.info._id,
      username: body.info.username,
      email: body.info.email,
    };

    setCurrentUser(user);

    window.localStorage.setItem('loggedUser', JSON.stringify(user));

    setLoading(false);
  };

  // ignore
  const signUpX = async (username, email, password) => {
    setLoading(true);
    const body = JSON.stringify({ username, email, password });
    try {
      const response = await fetch('http://localhost:3001/api/v1/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      });

      const responseBody = await response.json();
      updateUser(responseBody);
    } catch (error) {
      console.log(error);
    }
  };

  // ignore
  const loginX = async (email, password) => {
    const body = JSON.stringify({
      email, password,
    });

    try {
      const response = await fetch('http://localhost:3001/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      });

      const responseBody = await response.json();
      updateUser(responseBody);
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = {
    currentUser,
    signUp,
    login,
    signOut,
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
