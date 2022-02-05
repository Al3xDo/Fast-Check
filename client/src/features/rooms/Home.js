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
import { JoinRoomModal } from './JoinRoomModal';
import { InviteModal } from "./InviteModal"
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
    const [openJoinRoomModal, setOpenJoinRoomModal] = useState("")
    const [openInviteModal, setOpenInviteModal] = useState("")
    const [publicId, setPublicId] = useState("")
    const [sort, setSort] = useState({
        type: 0,
        by: ""
    })
    const onSort = (choice) => {
        switch (parseInt(choice)) {
            case 1:
                rooms.sort((a, b) => {
                    if (a.roomName > b.roomName) return sort.type;
                    if (a.roomName < b.roomName) return -sort.type;
                    // name trùng nhau
                    else return 0;
                });
                break
            case 2:
                rooms.sort((a, b) => {
                    if (a.roomName > b.roomName) return -sort.type;
                    if (a.roomName < b.roomName) return sort.type;
                    // name trùng nhau
                    else return 0;
                });
                break
            case 3:
                rooms.sort((a, b) => {
                    if (a.participantNumber > b.participantNumber) return sort.type;
                    if (a.participantNumber < b.participantNumber) return -sort.type;
                    // name trùng nhau
                    else return 0;
                });
                break
            case 4:
                rooms.sort((a, b) => {
                    if (a.participantNumber > b.participantNumber) return -sort.type;
                    if (a.participantNumber < b.participantNumber) return sort.type;
                    // name trùng nhau
                    else return 0;
                });
                break
            default:
                return
        }
    }
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
                    room={room}
                    onDelete={onDelete}
                    onOpenWarningModal={onOpenWarningModal}
                    onOpenEditModal={onOpenEditModal}
                    onOpenInviteModal={onOpenInviteModal}
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
        else {
            setSearchName([])
        }
    }
    const onJoinRoom = (publicId) => {
        callApi(`room/join/${publicId}`, "GET", {}, authState.token)
            .then((res) => {
                toastSuccess(res.data.message)
            })
            .catch((err) => {
                toastError(err.message)
            })
    }
    const onOpenJoinRoomModal = () => {
        setOpenJoinRoomModal("is-active")
    }
    const onCloseJoinRoomModal = () => {
        setOpenJoinRoomModal("")
    }
    const onOpenInviteModal = (publicId) => {
        setOpenInviteModal("is-active")
        setPublicId(publicId)
    }
    const onCloseInviteModal = () => {
        setOpenInviteModal("")
        // setPublicId(publicId)
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
                <button
                    className='ml-80 button is-link'
                    onClick={onOpenJoinRoomModal}
                >
                    <ion-icon name="people-outline"></ion-icon>
                    Join room
                </button>
                <div className=" search-field">
                    <button
                        className="ml-80 button is-link"
                    ><ion-icon name="search-outline"></ion-icon></button>
                    <input className="input search"
                        type="text"
                        name="searchName"
                        onChange={(e) => onSearch(e)}
                        placeholder="Tìm phòng học" />
                </div>
                <div className=" search-field">
                    <div className="select ml-80">
                        <select
                            onChange={(e) => onSort(e.target.value)}
                        >
                            <option value={0}>Sort room</option>
                            <option value={1}>By name (A to Z)</option>
                            <option value={2}>By name (Z to A)</option>
                            <option value={3}> By participant number (low to high)</option>
                            <option value={4}>By participant number (high to low)</option>
                            {/* <option>By date schedule (early to</option>
                            <option>By time schedule</option> */}
                        </select>
                    </div>
                    {/* <button
                        className="ml-80 button is-link"
                    ><ion-icon name="funnel-outline"></ion-icon></button> */}
                </div>
                <button
                    className=" button is-link menu"
                ><ion-icon name="apps-outline"></ion-icon></button>
            </div>
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
            <JoinRoomModal
                open={openJoinRoomModal}
                onClose={onCloseJoinRoomModal}
                onSubmit={onJoinRoom}
            />
            <InviteModal
                open={openInviteModal}
                onClose={onCloseInviteModal}
                publicId={publicId}
            />
            <hr />
            <div style={{ minHeight: "500px" }}>
                <div className="columns">
                    {searchName ?
                        showRoom(searchRooms) :
                        (
                            showRoom(rooms))
                    }
                </div>
            </div>
        </>
    );
}

