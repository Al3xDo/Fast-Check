import React, { useEffect } from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AuToken, selectAuth } from '../features/auth/authSlice'
import { load } from '../features/auth/authSlice'
// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated or if auth is not
// yet loaded
export const PrivateRoute = ({ children, ...rest }) => {
    const authState = useSelector(selectAuth)
    const location = useLocation()
    const dispatch = useDispatch()
    useEffect(() => {
        if (authState.loading !== "loaded") {
            dispatch(load())
            // dispatch(AuToken)
        }
        // else {
        //     dispatch(AuToken(authState.token))
        // }
    }, []);
    // if (authState.loading === 'loading') return <div>Loading</div>
    if (authState.loading === "error") return <Redirect
        to={location.state ? location.state.from.pathname : "/"}
    />
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