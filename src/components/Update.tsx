import React, {FormEvent, RefObject, useRef, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useAuth} from "../context/auth-context";

export const Update = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
  const {currentUser, updateEmail, updatePassword} = useAuth()
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordRef && passwordConfirmRef && passwordRef.current && passwordConfirmRef.current) {
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError('password does not match');
      }
    }

    // create promise array to store promise
    const promises = [];
    setLoading(true);
    setError('');
    if (emailRef && emailRef.current) {
      if (emailRef.current.value !== currentUser?.email) {
        promises.push(updateEmail(emailRef.current.value));
      }
    }
    if (passwordRef && passwordRef.current) {
      if (passwordRef.current.value !== currentUser?.password) {
        promises.push(updatePassword(passwordRef.current.value));
      }
    }

    // deal with all the promise to complete update
    Promise.all(promises).then(() => {
      history.push('/');
    }).catch(() => {
      setError('failed to update info');
    }).finally(() => {
      setLoading(false);
    })
  }

  return (
    <>
      <div>
        {/*{currentUser.email}*/}
        {
          error && <div>{error}</div>
        }
        <form onSubmit={handleSubmit}>
          <div className="py-12 text-primary w-80">
            <h2 className="text-3xl font-bold">Update Info</h2>
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
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className={'text-warning'}>
          Already have an account ? <Link to={'/'}>Cancel</Link>
        </div>
      </div>
    </>
  )
}