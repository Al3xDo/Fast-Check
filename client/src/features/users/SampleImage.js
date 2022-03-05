import React, { useState, useEffect } from 'react';
import { callApi } from '../../utils/apiCaller';
import { useSelector } from 'react-redux';
import { selectAuth } from '../auth/authSlice';
export const SampleImage = () => {
    const authState = useSelector(selectAuth)
    const [data, setData] = useState({})
    function sampleImageGalery() {
        callApi("user/showSample", "GET", {}, authState.token)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                return err
            })
    }
    useEffect(() => {
        sampleImageGalery()
    }, []);
    const showImageGalery = () => {
        var result = []
        for (var key in data) {
            result.push(
                <div className="column has-background-link-light mr-5" style={{ borderRadius: "7px" }} key={key} >
                    <span className="tag is-info is-block has-text-centered is-size-5">{key}</span>
                    <img src={`data:image/jpeg;base64,${data[key]}`} className='mt-5' style={{ width: "200px", height: "200px", borderRadius: "6px" }} />
                </div>
            )
        }
        return result;
    }
    return (
        <>

            {Object.keys(data).length == 0 ? (
                <div className="columns mt-2" style={{ height: "77%", width: "100%", margin: "auto", textAlign: "center", backgroundColor: "hsl(0, 0%, 90%)" }}>
                    <span className='icon is-block' style={{ margin: "auto", fontSize: "60px" }}>
                        <ion-icon name="cloud-upload-outline"></ion-icon>
                    </span>
                </div>
            ) : (
                <div className="columns mt-2">
                    <div className='columns mt-10' style={{ width: "100%" }}>
                        {showImageGalery()}
                    </div>
                </div>
            )
            }
        </>
    );
}

