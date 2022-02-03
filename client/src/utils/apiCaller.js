import axios from 'axios'
import * as Config from '../constant/api'

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
        url: `${Config.API_ENDPOINT}/${endpoint}`,
        data: body
    })
}

export function callApi(endpoint, method = 'GET', body, token = null) {
    return axios({
        method: method,
        url: `${Config.API_ENDPOINT}/${endpoint}`,
        // url: `${Config.API_ENDPOINT}/${}`,
        headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            // "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, POST, DELETE, OPTIONS",
            // "Access-Control-Allow-Headers": "Content-Type",
            // "Access-Control-Max-Age": "86400"
        },
        data: body
    })
}