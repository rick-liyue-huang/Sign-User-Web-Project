import React, {useRef, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useAuth} from "../context/auth-context";

export const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const {login, currentUser} = useAuth()
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      setError('Failed to login');
    }
    setLoading(false);
  }
  return (
    <>
      <div>
        <h2 className='font-bold'>Login</h2>
        {
          error && <div>{error}</div>
        }
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email: </label>
            <input type="email" required={true} id={'email'} ref={emailRef} />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input type="password" required={true} id={'password'} ref={passwordRef} />
          </div>
          <div>
            <button disabled={loading} type={'submit'}>Login</button>
          </div>
        </form>
        <div>
          <Link to={'/forgot-password'}>Forgot Password</Link>
        </div>
      </div>
      <div>
        Need an account ? <Link  to={'/register'}>Register</Link>
      </div>
    </>
  )
}