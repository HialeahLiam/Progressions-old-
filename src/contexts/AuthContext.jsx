import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import {
//   createUserWithEmailAndPassword, onAuthStateChanged,

//   signInWithEmailAndPassword,
// } from 'firebase/auth';
// import { auth } from '../firebase';

export const AuthContext = createContext(1);

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);

  // const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);

  // const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');

    if (!currentUser && loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setCurrentUser(user);
    }
  });

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

  const signUp = async (username, email, password) => {
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

  const login = async (email, password) => {
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

  // useEffect(() => {
  //   // firebase return an Unsubscribe function to remove observer callback,
  //   // which we run when component unmounts
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setCurrentUser(user);
  //     setLoading(false);
  //   });

  //   return unsubscribe;
  // }, []);

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
