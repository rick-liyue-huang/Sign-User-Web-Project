import React, {FormEvent, useRef, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useAuth} from "../context/auth-context";

export const Login = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const {login} = useAuth()
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      if (emailRef && passwordRef && emailRef.current && passwordRef.current) {
        await login(emailRef.current.value, passwordRef.current.value);
      }

      history.push('/');
    } catch {
      setError('Failed to login');
    }
    setLoading(false);
  }
  return (
    <>
      <div>
        {
          error && <div className={'text-danger'}>{error}</div>
        }
        <form onSubmit={handleSubmit}>
          <div className="py-12 text-primary w-80">
            <h2 className="text-3xl font-bold">Login</h2>
            <div className="mt-8 max-w-screen-md">
              <div className="grid grid-cols-1 gap-6">
                <label className="block">
                  <span className="text-secondary">Email address</span>
                  <input type="email" required={true} ref={emailRef}
                         className="form-input mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                  />
                </label>
                <label className="block">
                  <span className="text-secondary">Password</span>
                  <input type="password" ref={passwordRef}
                         className="form-input mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                  />
                </label>
                <div className="block mt-2">
                  <button className={'text-secondary'} type={'submit'} disabled={loading}>
                    Login
                  </button>
                </div>
                <div className="block mt-2">
                  <Link to={'/forgot-password'}>Forgot Password</Link>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className={'text-warning'}>
          Need an account ? <Link  to={'/register'}>Register</Link>
        </div>
      </div>
    </>
  )
}