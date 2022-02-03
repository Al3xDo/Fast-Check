import React from 'react';
import "./style.css"
import { Room } from './Room';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toastError, toastSuccess } from '../../utils/toastNotify';
import { selectAuth } from '../auth/authSlice';
import { callApi } from '../../utils/apiCaller';
import { AddRoom } from "./AddRoom"
export const Home = () => {
    const authState = useSelector(selectAuth)
    const [rooms, setRooms] = useState([])
    const [open, setOpen] = useState(false)
    useEffect(() => {
        function fetchRooms() {
            callApi("room/rooms", "GET", {}, authState.token)
                .then(res => {
                    setRooms(res.data)
                })
                .catch(e => {
                    toastError(e.message)
                })
        }
        fetchRooms()
    }, [])
    const onDelete = (id) => {
        callApi(`room/${id}`, 'DELETE', {}, authState.token)
            .then(res => {
                toastSuccess(res.data.message)
            })
            .catch(e => {
                toastError(e.message)
            })
    }
    const onAdd = (id) => {
        callApi(`room/create`, 'POST', {}, authState.token)
            .then(res => {
                toastSuccess(res.data.message)
            })
            .catch(e => {
                toastError(e.message)
            })
    }
    const onEdit = (id) => {
        callApi(`room/${id}`, 'PUT', {}, authState.token)
            .then(res => {
                toastSuccess(res.data.message)
            })
            .catch(e => {
                toastError(e.message)
            })
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
                <button
                    className='ml-80 button is-link'
                    onClick={() => setOpen(!open)}
                >
                    Add room
                </button>
                <AddRoom
                    onOpen={open}
                />
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

