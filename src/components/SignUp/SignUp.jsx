/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../../contexts/AuthContext';

function SignUp(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const { currentUser, signUp } = useContext(AuthContext);

  // eslint-disable-next-line consistent-return
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      // Return to avoid later logic
      return setError('Passwords do not match');
    }
    try {
      setError('');
      setLoading(true);
      await signUp(email, password);
    } catch (e) {
      console.log(`Something went wrong:\n\n${e.message}`);
    }

    setLoading(false);
    // console.log('Form Submitted');
    // console.log(`Email: ${email}`);
    // console.log(`Password: ${password}`);
    // console.log(`Password-confirm: ${passwordConfirm}`);
    // console.log('Context:');
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value);
  };

  return (
    <>
      <h2>Sign Up</h2>
      {error && <h3>Passwords do not match</h3>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
          {/* The name attribute is used when sending data in a form submission. */}
          <input type="text" name="email" value={email} onChange={handleEmailChange} />
        </label>

        <label htmlFor="password">
          Password:
          <input type="text" name="password" value={password} onChange={handlePasswordChange} />
        </label>

        <label htmlFor="password-confirm">
          Password confirm:
          <input type="text" name="password-confirm" value={passwordConfirm} onChange={handlePasswordConfirmChange} />
        </label>
        <input disabled={loading} type="submit" value="Sign up" />

      </form>
      <div>
        Already have an account? Log in
      </div>
    </>
  );
}

SignUp.propTypes = {};

export default SignUp;
