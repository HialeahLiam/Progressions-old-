import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import NavLink from '../NavLink/NavLink';
import Button from '../Button/Button';
import styles from './SideBar.module.css';
import { AuthContext } from '../../contexts/AuthContext';

function SideBar() {
  const navigate = useNavigate();
  const { currentUser, signOut } = useContext(AuthContext);
  const location = useLocation();
  console.log(currentUser);

  return (
    <nav className={styles.nav}>
      <div className={styles.accountBox}>
        <div className={styles.account}>
          {currentUser && <span className={styles.username}>{currentUser.username}</span>}
        </div>
      </div>
      <NavLink target="/training">Training</NavLink>
      <NavLink target="/collections">Collections</NavLink>
      {/* <NavLink target="">theory</NavLink>
      <NavLink target="/synthesizer">synthesizer</NavLink> */}

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
    </nav>
  );
}

SideBar.propTypes = {};

export default SideBar;
