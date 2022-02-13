import Webcam from "react-webcam"
// import { useRef } from "react";
import { useRef, useCallback, useState } from "react";
import { callApi } from "../../utils/apiCaller";
import { toastError, toastSuccess } from "../../utils/toastNotify";
import { useSelector } from "react-redux";
import { selectAuth } from "../auth/authSlice";
import { Redirect } from "react-router";
const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
}
const WebcamCapture = (props) => {
    // const history = useHistory()
    const [redirectToHome, setRedirectToHome] = useState(false)
    const authState = useSelector(selectAuth)
    const webcamRef = useRef(null);
    const capture = useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            // console.log(imageSrc)
            var data = {
                "image": imageSrc,
                "attendanceStatusId": props.attendanceStatusId
            }
            callApi(`par/check_attendance`, "POST", data, authState.token)
                .then(res => {
                    toastSuccess(res.data.message)
                    // setRedirectToHome(true)
                })
                .catch(err => {
                    toastError(err.response.data.message);
                })
        },
        [webcamRef]
    );
    if (redirectToHome) return <Redirect to="/" />
    // const streamVideo = setInterval(capture, 10000)
    return (
        <>
            <div className="screen bcolumns">
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
                {/* <div className="face bordered-g">
                </div> */}
            </div>
            <div className="columns mt-10" style={{ marginLeft: "550px" }}>
                <button className="button is-primary" onClick={capture}>Capture photo</button>
                {/* <div className="button is-primary btn-check">Điểm danh</div> */}
            </div>

        </>
    )
}

export default WebcamCapture