import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import styles from './LoginButton.module.css';
import Button from '../../Button/Button';

function LoginButton() {
  const navigate = useNavigate();
  const { currentUser, signOut } = useContext(AuthContext);
  const location = useLocation();
  return (
    <div className={styles.authButton}>
      {currentUser
        ? (
          <Button
            type="square"
            clickHandler={() => signOut()}
          >
            sign out
          </Button>
        )
        : (
          <Button
            type="square"
            clickHandler={() => {
              navigate('/login', { state: { from: location } });
            }}
          >
            login
          </Button>
        )}
    </div>
  );
}

export default LoginButton;
