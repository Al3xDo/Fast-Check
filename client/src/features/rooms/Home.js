import React from 'react';
import "./style.css"
import { Room } from './Room';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toastError, toastSuccess } from '../../utils/toastNotify';
import { selectAuth } from '../auth/authSlice';
import { callApi } from '../../utils/apiCaller';
import { AddRoom } from "./AddRoom"
import { EditRoom } from "./EditRoom"
import { WarningModal } from "./WarningModal"
import { useDebounce } from '../../hook/useDebounce';
export const Home = () => {
    const authState = useSelector(selectAuth)
    const [rooms, setRooms] = useState([])
    const [open, setOpen] = useState("")
    const [openEdit, setOpenEdit] = useState("")
    const [editRoom, setEditRoom] = useState(null)
    const [deleteId, setDeleteId] = useState("")
    const [openWarning, setOpenWarning] = useState("")
    const [searchName, setSearchName] = useDebounce("")
    const [searchRooms, setSearchRooms] = useState([])
    function fetchRooms() {
        callApi("room/rooms", "GET", {}, authState.token)
            .then(res => {
                setRooms(res.data)
            })
            .catch(e => {
                toastError(e.message)
            })
    }
    useEffect(() => {

        fetchRooms()
    }, [])
    const formatDate = (date) => {
        if (!date) {
            return null
        }
        const year = date.slice(0, 4)
        const month = date.slice(6, 7)
        const day = date.slice(8)
        const formatedDate = day + "/" + month + "/" + year
        return formatedDate
    }

    const onDelete = () => {
        callApi(`room/${deleteId}`, 'DELETE', {}, authState.token)
            .then(res => {
                toastSuccess(res.data.message)
                var temp = rooms
                temp = temp.filter((room) => room.id !== deleteId)
                setRooms(temp)
            })
            .catch(e => {
                toastError(e.message)
            })
    }
    const onAdd = (newRoom) => {
        callApi(`room/create`, 'POST', newRoom, authState.token)
            .then(res => {
                toastSuccess(res.data.message)
            })
            .catch(e => {
                toastError(e.message)
            })
        fetchRooms()
    }
    const onEdit = () => {
        setEditRoom({
            ...editRoom,
            dateSchedule: formatDate(editRoom.dateSchedule)
        })
        callApi(`room/`, 'PUT', editRoom, authState.token)
            .then(res => {
                toastSuccess(res.data.message)
            })
            .catch(e => {
                toastError(e.message)
            })
        fetchRooms()
        setEditRoom("")
    }
    const onOpenEditModal = (id) => {
        setOpenEdit("is-active")
        const temp = rooms.filter(room => room.id === id)[0]
        setEditRoom(temp)
    }
    const onCloseEditModal = () => {
        setOpenEdit("")
        setEditRoom(null)
    }
    const onOpenWarningModal = (id) => {
        setOpenWarning("is-active")
        setDeleteId(id)
    }
    const onCloseWarningModal = (choice) => {
        setOpenWarning("")
        if (choice) {
            onDelete()
        }
        setDeleteId("")
    }
    const onChange = (e) => {
        var name = e.target.name
        var val = e.target.value
        setEditRoom({
            ...editRoom,
            [name]: val
        })
    }
    const showRoom = (rooms) => {
        var result = null;
        if (rooms.length > 0) {
            result = rooms.map((room, index) => {
                return (<Room
                    key={index}
                    roomName={room.roomName}
                    id={room.id}
                    participantNumber={room.participantNumber}
                    isAdmin={room.isAdmin}
                    onDelete={onDelete}
                    onOpenWarningModal={onOpenWarningModal}
                    onOpenEditModal={onOpenEditModal}
                />)
            })
        }
        return result
    }
    function removeAccents(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    const onSearch = (e) => {
        setSearchName(e.target.value)
        if (searchName) {
            setSearchRooms(rooms.filter((room) => removeAccents(room.roomName).toLowerCase().indexOf(removeAccents(searchName.toLowerCase())) !== -1))
        }
    }
    return (
        <>
            <div className="course-button">
                <button
                    className="button is-link"
                >All Course</button>
                <button
                    className='ml-80 button is-link'
                    onClick={() => setOpen("is-active")}
                >
                    Add room
                </button>
                <AddRoom
                    onOpen={open}
                    onAddRoom={onAdd}
                    onClose={() => setOpen("")}
                />
                <WarningModal
                    onOpen={openWarning}
                    onClose={onCloseWarningModal}
                />
                {editRoom &&
                    <EditRoom
                        onOpen={openEdit}
                        onEditRoom={onEdit}
                        editRoom={editRoom}
                        onClose={onCloseEditModal}
                        onChangeEdit={onChange}
                    />
                }
                <div className=" search-field">
                    <button
                        className="ml-80 button is-link"
                    ><ion-icon name="search-outline"></ion-icon></button>
                    <input className="input search"
                        type="text"
                        name="searchName"
                        // value={searchName}
                        onChange={(e) => onSearch(e)}
                        placeholder="Tìm phòng học" />
                </div>

                <button
                    className=" button is-link menu"
                ><ion-icon name="apps-outline"></ion-icon></button>
            </div>
            <hr />
            <div className="course-board">
                {searchName ?
                    showRoom(searchRooms) : showRoom(rooms)}
            </div>
        </>
    );
}

