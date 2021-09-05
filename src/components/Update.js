import React, {useRef, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useAuth} from "../context/auth-context";

export const Update = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const {currentUser, updateEmail, updatePassword} = useAuth()
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('password does not match');
    }

    const promise = [];
    setLoading(true);
    setError('')
    if (emailRef.current.value !== currentUser.email) {
      promise.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value !== currentUser.password) {
      promise.push(updatePassword(passwordRef.current.value));
    }
    Promise.all(promise).then(() => {
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
        <h2 className='font-bold'>Update Info</h2>
        {/*{currentUser.email}*/}
        {
          error && <div>{error}</div>
        }
        <form onSubmit={handleSubmit}>
          <div className="py-12 text-primary w-80">
            <h2 className="text-3xl font-bold">Register</h2>
            <div className="mt-8 max-w-screen-md">
              <div className="grid grid-cols-1 gap-6">
                <label className="block">
                  <span className="text-secondary">Email address</span>
                  <input type="email" required={true} ref={emailRef} defaultValue={currentUser.email}
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