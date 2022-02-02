import React from 'react';
import "./style.css"
import Room from "../../components/Room.js"
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { selectRooms } from './roomsSlice';
export const Home = (props) => {
    // const [choice, setChoice] = useState(0);
    const { getRoomsRequest, token } = props;
    const history = useHistory()
    const dispatch = useDispatch()
    const roomState = useSelector(selectRooms)
    useEffect(() => {
        // getRoomsRequest(token)
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
    return (
        <>
            <div className="course-button">
                <button
                    className="button is-link"
                >All Course</button>
                <div className=" search-field">
                    <button
                        className="ml-80 button is-link"
                    ><ion-icon name="search-outline"></ion-icon></button>
                    <input className="input search" type="text" placeholder="class name" />
                </div>

                <button
                    className=" button is-link menu"
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

