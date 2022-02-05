import WebcamCapture from "../../components/WebcamCapture"
import "./style.css"
export function Check(props) {
    return (
        <>
            <div className="checkboard">
                <div className="columns" >
                    <h1 className="title title-check">Mời bạn đưa khuôn mặt vào khung tròn</h1>
                </div>
                <WebcamCapture token={props.token} />
            </div>
        </>
    );
}
