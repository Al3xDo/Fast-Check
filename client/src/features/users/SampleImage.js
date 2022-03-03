import React, { useState, useEffect } from 'react';
import { callApi } from '../../utils/apiCaller';
import { useSelector } from 'react-redux';
import { selectAuth } from '../auth/authSlice';
export const SampleImage = () => {
    const authState = useSelector(selectAuth)
    const [data, setData] = useState({})
    function sampleImageGalery() {
        const result = []
        callApi("user/showSample", "GET", {}, authState.token)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                return <h1>You don't have sample image, try upload sample image now</h1>
            })
    }
    useEffect(() => {
        sampleImageGalery()
        return () => {
            setData()
        };
    }, []);
    const showImageGalery = () => {
        var result = []
        for (var key in data) {
            result.push(
                <div className="column has-background-link-light mr-5" style={{ borderRadius: "7px" }} key={key} >
                    <tag className="tag is-info is-block has-text-centered is-size-5" style={{ width: "200px" }}>{key}</tag>
                    <img src={`data:image/jpeg;base64,${data[key]}`} className='mt-5' style={{ width: "200px", height: "200px", borderRadius: "6px" }} />
                </div>
            )
        }
        if (result) {
            return result;
        }
        else {
            return (<h1>You don't have sample image, please upload one</h1>)
        }
    }
    return (
        <>
            <div className='columns mt-10' style={{ width: "100%" }}>
                {showImageGalery()}
            </div>
        </>
    );
}

