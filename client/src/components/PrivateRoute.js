import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth, load } from '../features/auth/authSlice'
import { LogIn } from '../features/auth'

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated or if auth is not
// yet loaded
export const PrivateRoute = ({ children, ...rest }) => {
    const authState = useSelector(selectAuth)
    const dispatch = useDispatch()
    useEffect(() => {
        if (authState.loading !== "loaded") {
            dispatch(load())
        }
    }, []);
    console.log(authState)
    return (
        <Route
            {...rest}
            render={({ location }) =>
                authState.token !== "" ? (
                    children
                ) : (
                    <Redirect
                        // to="/login"
                        // component={LogIn}
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
                // children
            }
        />
    )
}