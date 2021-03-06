import React, {FormEvent, useRef, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useAuth} from "../context/auth-context";

export const Register = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
  const {register} = useAuth()
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ensure emailRef, passwordRef, passwordConfirmRef exist
    if (passwordRef && passwordConfirmRef && passwordRef.current && passwordConfirmRef.current) {
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError('password does not match');
      }
    }

    try {
      setError('');
      setLoading(true);
      if (emailRef && emailRef.current && passwordRef && passwordRef.current) {
        await register(emailRef.current.value, passwordRef.current.value);
      }
      history.push('/');
    } catch {
      setError('Failed to create new account');
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
            <h2 className="text-3xl font-bold">Register</h2>
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
                <label className="block">
                  <span className="text-secondary">Password Confirm</span>
                  <input type="password" ref={passwordConfirmRef}
                         className="form-input mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                          />
                </label>
                <div className="block mt-2">
                  <button className={'text-secondary'} type={'submit'} disabled={loading}>
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className={'text-warning'}>
          Already have an account ? <Link to={'/login'}>Login</Link>
        </div>
      </div>

    </>
  )
}