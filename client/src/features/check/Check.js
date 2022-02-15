import WebcamCapture from "./WebcamCapture"
import "./style.css"
import { useLocation } from "react-router";
export function Check() {
    const location = useLocation()
    return (
        <>
            <div className="checkboard">
                <div className="columns" >
                    <h1 className="title title-check">Mời bạn đưa khuôn mặt vào khung tròn</h1>
                </div>
                <WebcamCapture attendanceStatusId={location.attendanceStatusId} />
            </div>
        </>
    );
}
