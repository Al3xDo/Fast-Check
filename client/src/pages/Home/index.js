import React from 'react';
import "./style.css"
import Room from "../../components/Room.js"
// import Calendar from "../../components/Calendar"
import * as RoomAction from "../../actions/room"
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
const HomePage = (props) => {
    // const [choice, setChoice] = useState(0);
    const { getRoomsRequest, token } = props;
    // const history = useHistory()
    useEffect(() => {
        getRoomsRequest(token)
        // callApiWithToken(Config.ROOMS_ENDPOINT, "GET", {}, token)
        //     .then(res => {
        //         getRooms(res.data)
        //     })
        //     .catch(err => {
        //         if (err.response.status === 404) {
        //             toastError(String(err.response.data.message))
        //         }
        //         else {
        //             toastError(String(err.response.data.message))
        //         }
        //         history.push("/login")
        //         // console.log(err.response.data)
        //         // dispatch(updateMSG(err.response.data))
        //     })
    }, [])

    const showRoom = () => {
        const { rooms } = props
        var result = null;
        if (rooms.length > 0) {
            result = rooms.map((room, index) => {
                return (<Room
                    key={index}
                    name={room.name}
                    id={room.id}
                    participantNumber={room.participantNumber}
                    isAdmin={room.isAdmin}
                    onDelete={onDelete}
                />)
            })
        }
        return result
    }
    const onDelete = (event) => {

    }
    // function renderBoard() {
    //     switch (choice) {
    //         case 0:
    //             return (

    //             )
    //         case 1:
    //             return (
    //                 <Calendar />
    //             )
    //         default:
    //             return null
    //     }
    // }
    // if (props.systemMessage.status === "fail")
    //     return <Redirect to="/login" />
    return (
        <>
            <div className="course-button">
                <button
                    className="button is-link"
                // onClick={() => setChoice(0)}
                >All Course</button>
                {/* 
                <button
                    className="ml-80 button is-link"
                    onClick={() => setChoice(1)}
                >Calendar</button> */}

                {/* <button
                    className="ml-80 button is-link"
                    onClick={() => setChoice(2)}
                >Courses in day</button>

                <button
                    className="ml-80 button is-link"
                    onClick={() => setChoice(3)}
                >Add Course</button> */}
                <div className=" search-field">
                    <button
                        className="ml-80 button is-link"
                    // onClick={() => setChoice(4)}
                    ><ion-icon name="search-outline"></ion-icon></button>
                    <input className="input search" type="text" placeholder="class name" />
                </div>

                <button
                    className=" button is-link menu"
                // onClick={() => setChoice(3)}
                ><ion-icon name="apps-outline"></ion-icon></button>
            </div>
            <hr />
            {/* {renderBoard()} */}
            <div className="course-board">

                {showRoom()}
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        rooms: state.room,
        token: state.token,
        systemMessage: state.systemMessage
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getRoomsRequest: (token) => {
            dispatch(RoomAction.getRoomsRequest(token))
        },
        getRooms: (data) => {
            dispatch(RoomAction.getRooms(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

