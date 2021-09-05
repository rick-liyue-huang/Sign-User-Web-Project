import React, { Component } from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useAuth} from "../context/auth-context";


// @ts-ignore
export const AuthenticatedRoute = ({component: Component, ...rest}) => {
  // through this router, ensure the component keep the currentUser info.
  const {currentUser} = useAuth();
  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }} />
  )
}