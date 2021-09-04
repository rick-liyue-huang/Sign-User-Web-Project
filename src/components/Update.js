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
          <div>
            <label htmlFor="email">Email: </label>
            <input type="email" required={true} id={'email'} ref={emailRef} defaultValue={currentUser.email} />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input placeholder={'leave blank to keep same'} type="password" required={true} id={'password'} ref={passwordRef} />
          </div>
          <div>
            <label htmlFor="password-confirm">Password Confirmation: </label>
            <input placeholder={'leave blank to keep same'} type="password" required={true} id={'password-confirm'} ref={passwordConfirmRef} />
          </div>
          <div>
            <button disabled={loading} type={'submit'}>Update</button>
          </div>
        </form>
      </div>
      <div>
        Already have an account ? <Link to={'/'}>Cancel</Link>
      </div>
    </>
  )
}