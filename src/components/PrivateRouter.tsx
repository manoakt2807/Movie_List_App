import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { getLoginDetail } from "../redux/reducers/authReducer";

const PrivateRoute = () => {
  const LoginDetail = useSelector(getLoginDetail)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = localStorage.getItem('user');
  useEffect(() => {
    if (!LoginDetail.isAuthenticated && user) {
      dispatch({
        type: 'auth/login',
        payload: { username: user }
      })
      navigate('/home');
    }
  }, [LoginDetail, user])
  return (
    <React.Fragment>
      {LoginDetail.isAuthenticated ? <Outlet /> : <Navigate to="/login" />}
    </React.Fragment>
  );
};

export default PrivateRoute;