import React from "react"
import { Route, Redirect } from "react-router-dom"
import { compose } from "redux"
import { connect } from "react-redux"
import { checkTokenRequest } from "../actions/token"
function PrivateRoutes(props) {
    const { component: Component, key, path, exact, token } = props
    props.checkTokenRequest(token)
    if (token) {
        return (<Route
            key={key}
            path={path}
            exact={exact}
            render={(props) => (<Component {...props} />)} />)
    }
    return <Redirect to="/login" />
}


const mapStateToProps = state => {
    return {
        token: state.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        checkTokenRequest: (token) => {
            dispatch(checkTokenRequest(token))
        }
    }
}
const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(PrivateRoutes);