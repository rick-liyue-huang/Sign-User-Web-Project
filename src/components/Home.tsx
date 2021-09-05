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
    <div className="py-12 text-primary w-80">
      <div className="bg-white rounded overflow-hidden shadow-md">
        <h2 className="text-3xl font-bold">Home Page</h2>
        {error  && <div className={'text-danger'}>{error}</div>}
        <div className="p-2">
          <div className="text-warning text-md">Email: {currentUser?.email}</div>
        </div>
        <Link to="/update-info" className="btn btn-primary w-100 mt-3">
          Update UserInfo
        </Link>
        <div className="p-2 border-t border-gray-200">
          <div className="flex justify-center text-lg text-secondary">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  )
}