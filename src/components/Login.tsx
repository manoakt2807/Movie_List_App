import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getLoginDetail } from "../redux/reducers/authReducer";

interface LoginState {
  username: string | undefined;
  password: string | undefined;
}

const Login: React.FC = () => {
  const [state, setState] = useState<LoginState>({ username: undefined, password: undefined });
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const LoginDetail = useSelector(getLoginDetail);
  const user = localStorage.getItem('user');
  const location = useLocation()
  const handleLogin = () => {
    const { password, username } = state
    try {
      if ((username === 'Admin' && password === 'Admin') || (username === 'User' && password === 'User')) {
        dispatch({
          type: 'auth/login',
          payload: { username },
        });
        toast.success(`Welcome ${username}`)
        navigate('/home')
      } else {
        toast.error('Incorrect username and password')
      }
    } catch (e) {
      toast.error('Something went wrong')
      console.error(e)
    }

  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  useEffect(() => {
    if (!LoginDetail.isAuthenticated && user) {
      dispatch({
        type: 'auth/login',
        payload: { username: user }
      })
      navigate('/home');
    }

  }, [LoginDetail, user, location.pathname])

  return (
    <div className="d-flex justify-content-center align-items-center bg-black h-100">
      <div className='card login-card '>
        <h2 className='mx-auto mt-5'>Sign In</h2>
        <div className='d-flex flex-column align-items-center gap-3 mt-5 input-form'>
          <div className='mt-3 w-100 px-5 row d-flex align-items-center '>
            <input
              type="text"
              id="username"
              className='border-0 border-bottom border-2 px-0'
              placeholder='Username'
              value={state?.username}
              onChange={(e) => setState((prev) => ({ ...prev, username: e.target.value }))}
            />
          </div>
          <div className='mt-3 w-100 px-5 row d-flex align-items-center'>
            <input
              type="password"
              id="password"
              className='border-0 border-bottom border-2 px-0'
              placeholder='Password'
              value={state?.password}
              onChange={(e) => setState((prev) => ({ ...prev, password: e.target.value }))}
              onKeyDown={handleKeyDown}
            />
          </div>
          <button className='btn btn-lg rounded-pill my-5 fs-6 px-5 login-btn' onClick={handleLogin}>SUBMIT</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
