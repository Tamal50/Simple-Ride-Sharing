import React from 'react'
import { useLocation } from 'react-router';
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { dashboard } from './endpoints';


// Children 
export default function AuthRoute({ children, ...rest }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: dashboard } };

  return (
    <>
      <Route {...rest}
        render={({ location }) => (!!currentUser.email ? <Redirect to={from} /> : (children))}
      />
    </>
  )
}
