import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth } from '../features/auth/authSlice'
import { AuToken } from '../features/auth/authSlice'
// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated or if auth is not
// yet loaded
export const PrivateRoute = ({ children, ...rest }) => {
    const authState = useSelector(selectAuth)
    const dispatch = useDispatch()
    useEffect(() => {
        if (authState.loading !== "loaded") {
            dispatch(AuToken)
        }
    }, []);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                authState.loading === "loaded" ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    )
}