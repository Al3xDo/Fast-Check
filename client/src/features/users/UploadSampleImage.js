import React from 'react';
import { useSelector } from 'react-redux';
import { useRef, useCallback } from 'react';
import { toastError, toastSuccess } from '../../utils/toastNotify';
import { callApi } from '../../utils/apiCaller';
import { selectAuth } from '../auth/authSlice';
import Webcam from "react-webcam"
const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
}
const UploadSampleImage = (props) => {
    const authState = useSelector(selectAuth)
    const webcamRef = useRef(null);
    const onSubmit = useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            // console.log(imageSrc)
            var data = {
                "image": imageSrc,
            }
            callApi(`user/uploadSample`, "POST", data, authState.token)
                .then(res => {
                    toastSuccess(res.data.message)
                })
                .catch(err => {
                    toastError(err.response.data.message);
                })
        },
        [webcamRef]
    );
    return (
        <div className={`modal ${props.open}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Upload Sample Image</p>
                    <button className="delete" aria-label="close"
                        onClick={props.onClose}
                    ></button>
                </header>
                <section className="modal-card-body">
                    <div className="screen bcolumns">
                        {props.open === "is-active" && (
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={videoConstraints}
                                style={{
                                    height: "480px",
                                    width: "100%",
                                    objectFit: "fill",
                                    position: "absolute"
                                }}
                            />
                        )}
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <div className="submit has-text-centered">
                        <button className="button is-primary" onClick={onSubmit}>
                            Upload sample image
                        </button>
                        <button className="button is-danger"
                            onClick={props.onClose}
                        >Cancel</button>
                    </div>
                </footer>

            </div>
        </div>
    );
}

export default UploadSampleImage;
