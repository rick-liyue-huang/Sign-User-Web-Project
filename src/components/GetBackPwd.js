import React, {useRef, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useAuth} from "../context/auth-context";

export const GetBackPwd = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const {resetPassword} = useAuth()
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage('')
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('check your email box');
    } catch {
      setError('Failed to reset password');
    }
    setLoading(false);
  }
  return (
    <>
      <div>
        <h2 className='font-bold'>Reset Password</h2>
        {
          error && <div>{error}</div>
        }
        {
          message  && <div>{message}</div>
        }
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email: </label>
            <input type="email" required={true} id={'email'} ref={emailRef} />
          </div>
          <div>
            <button disabled={loading} type={'submit'}>Reset Password</button>
          </div>
        </form>
        <div>
          <Link to={'/login'}>Login</Link>
        </div>
      </div>
      <div>
        Need an account ? <Link  to={'/register'}>Register</Link>
      </div>
    </>
  )
}