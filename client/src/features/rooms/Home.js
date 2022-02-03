import React from 'react';
import "./style.css"
import { Room } from './Room';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { selectRooms } from './roomsSlice';
import axios from 'axios';
import { toastError, toastSuccess } from '../../utils/toastNotify';
import { selectAuth } from '../auth/authSlice';
import { callApi } from '../../utils/apiCaller';
export const Home = (props) => {
    // const [choice, setChoice] = useState(0);
    // const { getRoomsRequest, token } = props;
    // const history = useHistory()
    // const dispatch = useDispatch()
    // const roomState = useSelector(selectRooms)
    const authState = useSelector(selectAuth)
    // console.log(authState.token)
    const [rooms, setRooms] = useState([])
    useEffect(() => {
        async function fetchRooms() {
            try {
                let config = {
                    headers: {
                        'Authorization': `Bearer ${authState.token}`,
                        'Content-Type': 'application/json',
                        'Accept': "*/*",
                        'Access-Control-Allow-Origin': '*',
                    }
                }
                const response = await axios.get('http://localhost:3001/room/rooms', config)
                setRooms(response.data)
            }
            catch (e) {
                toastError(e.message)
            }
        }
        fetchRooms()
    }, [])
    const onDelete = (id) => {
        try {
            console.log(authState.token)
            const response = callApi(`room/${id}`, 'DELETE', {}, authState.token)
        }
        catch (e) {
            toastError(e.message)
        }
    }
    const onAdd = () => {

    }
    const showRoom = (rooms) => {
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
                {showRoom(rooms)}
            </div>
        </>
    );
}

