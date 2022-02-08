import axios from 'axios'

const API_ENDPOINT = "http://localhost:3001"
export function callApiWithToken(endpoint, method = 'GET', body, token) {

    return axios({
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, POST, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
            "Access-Control-Max-Age": "86400"
        },
        url: `${API_ENDPOINT}/${endpoint}`,
        data: body
    })
}

export function callApi(endpoint, method = 'GET', body, token = null) {
    return axios({
        method: method,
        url: `${API_ENDPOINT}/${endpoint}`,
        headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, POST, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        },
        data: body
    })
}