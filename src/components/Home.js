import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {useAuth} from "../context/auth-context";

export const  Home = () => {
  const [error, setError] = useState('');
  const {currentUser, logout} = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    setError('')
    try {
      await logout();
      history.push('/login');
    } catch {
      setError('Failed to logout');
    }
  }
  return (
    <div>
      <h2>Home Page</h2>
      {error  && <div>{error}</div>}
      <Link to={'/update-info'}>Update Info</Link>
      <strong>Email: {currentUser.email}</strong>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}