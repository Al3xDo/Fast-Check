import Webcam from "react-webcam"
// import { useRef } from "react";
import { useRef, useCallback } from "react";
import { callApi, callApiWithToken } from "../utils/apiCaller";
import * as Config from "../constant/api"
import { toastSuccess, toastError } from "../utils/toastNotify";
import { useHistory } from "react-router-dom"
const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
}
const WebcamCapture = (props) => {
    // const history = useHistory()
    const webcamRef = useRef(null);
    const capture = useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            // console.log(imageSrc)
            var data = {
                "image": imageSrc
            }
            // console.log(props.token)
            callApiWithToken("user/checkImage", "POST", data, props.token)
                .then(res => {
                    toastSuccess(res.data.message)
                    // clearInterval(streamVideo)
                    // history.push("/")
                })
                .catch(err => {
                    console.log(err)
                    // clearInterval(streamVideo)
                })
        },
        [webcamRef]
    );
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