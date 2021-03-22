import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { loginRoute } from './endpoints';


// Children 
export default function PrivateRoute({ children, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <>
      {
        <Route {...rest}
          render={({ location }) =>
            currentUser?.name ? (children) : <Redirect to={{
              pathname: loginRoute,
              state: { from: location }
            }} />
          }
        />
      }
    </>
  )
}
