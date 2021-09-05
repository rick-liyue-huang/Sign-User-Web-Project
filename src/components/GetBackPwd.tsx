import React, {FormEvent, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from "../context/auth-context";

export const GetBackPwd = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const {resetPassword} = useAuth()
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setMessage('')
      setError('');
      setLoading(true);
      if (emailRef && emailRef.current) {
        await resetPassword(emailRef.current.value);
      }

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

          <div className="py-12 text-primary w-80">
            <h2 className="text-3xl font-bold">Get Back Password</h2>
            <div className="mt-8 max-w-screen-md">
              <div className="grid grid-cols-1 gap-6">
                <label className="block">
                  <span className="text-secondary">Email address</span>
                  <input type="email" required={true} ref={emailRef}
                         className="form-input mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                  />
                </label>
                <div className="block mt-2">
                  <button className={'text-secondary'} type={'submit'} disabled={loading}>
                    Reset
                  </button>
                </div>
                <div className="block mt-2">
                  <Link className={'text-secondary'}  to={'/login'}>Login</Link>
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