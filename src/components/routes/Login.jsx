import React, { useContext, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const from = location?.state?.from?.pathname || '/';
  console.log('Location from login:');
  console.log(from);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate(from, { replace: true });
    } catch (e) {
      setLoading(false);

      console.log(`Something went wrong:\n\n${e.message}`);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <h2>Log in</h2>
      {error && error}
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
        <input disabled={loading} type="submit" value="login" />

      </form>
      <div>
        Need an account?
        {' '}
        <Link to="/signup" state={{ from: location?.state?.from }}>Sign up!</Link>
      </div>
    </>
  );
}

Login.propTypes = {};

export default Login;
