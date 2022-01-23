import WebcamCapture from "../../components/WebcamCapture"
import "./style.css"
import { connect } from "react-redux"
function CheckPage(props) {
    // console.log(props.token)
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


const mapStateToProps = state => {
    return {
        token: state.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckPage);
