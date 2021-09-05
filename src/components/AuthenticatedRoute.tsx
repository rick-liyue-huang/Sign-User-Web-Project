import React, { Component } from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useAuth} from "../context/auth-context";


// @ts-ignore
export const AuthenticatedRoute = ({component: Component, ...rest}) => {
  const {currentUser} = useAuth();
  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }} />
  )
}