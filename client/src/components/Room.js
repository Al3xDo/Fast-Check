import React from 'react';
import "./room.css"
import WarningModal from './WarningModal';
import { useState } from 'react';
import { callApiWithToken } from '../utils/apiCaller';
import * as RoomAction from "../actions/room"
import { connect } from 'react-redux';
import { ROOM_DELETE_ENDPOINT } from '../constant/api';
import { toastError, toastSuccess } from '../utils/toastNotify';
const Room = (props) => {
    const { name,participantNumber, isAdmin, id } = props
    const [active, setActive]= useState("")
    const showButton =() => {
        if (isAdmin)
        {
            return (
            <button className="button is-primary level-right">
            Thực hiện điểm danh
            </button>
            )
        } else 
        {
            return (
                <button className="button is-primary level-right">
                Điểm danh
                </button>
                )
        }
    }
    const onClose =(event) => {
        if (event)
        {
            callApiWithToken(`${ROOM_DELETE_ENDPOINT}${String(id)}`, "DELETE",{},props.token )
            .then(() => {
                toastSuccess("Xoá phòng thành công")
            })
            .catch(err => {
                toastError(String(err.response.message))
            })
            setActive("")
            props.getRoomsRequest(props.token)
        }
        else {
            setActive("")
        }
        
    }
    return (
        <div className="course box w-h-200 level block">
        <div className="title-div">
        <h1 className="title">{name}</h1>
            <ion-icon  
            className="delete-icon" 
            name="close-outline"
            onClick={() => {setActive("is-active")}}
            ></ion-icon>
            <WarningModal 
            onOpen= {active}
            onClose={onClose}
            id={id}
            />
        </div>
            
            <div className="course-description">
                <h2>Sĩ số: {participantNumber}</h2>
                {/* <h2>Time: {timeEnd} - {timeStart}</h2> */}
                {/* <h2>Class size: 52</h2> */}
            </div>
            <div className="course-icon row">
                {showButton()}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getRoomsRequest: (token) => {
            dispatch(RoomAction.getRoomsRequest(token))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Room);
