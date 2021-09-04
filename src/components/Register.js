import React, {useRef, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useAuth} from "../context/auth-context";

export const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const {register, currentUser} = useAuth()
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('password does not match');
    }

    try {
      setError('');
      setLoading(true);
      await register(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      setError('Failed to create new account');
    }
    setLoading(false);
  }
  return (
    <>
      <div>
        <h2 className='font-bold'>Register</h2>
        {/*{currentUser.email}*/}
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
            <label htmlFor="password-confirm">Password Confirmation: </label>
            <input type="password" required={true} id={'password-confirm'} ref={passwordConfirmRef} />
          </div>
          <div>
            <button disabled={loading} type={'submit'}>Register</button>
          </div>
        </form>
      </div>
      <div>
        Already have an account ? <Link to={'/login'}>Sign In</Link>
      </div>
    </>
  )
}