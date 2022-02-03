import React from 'react';
import "./room.css"
import { WarningModal } from './WarningModal';
import { useState } from 'react';
export const Room = (props) => {
    const { name, participantNumber, isAdmin, id } = props
    const [active, setActive] = useState("")
    const showButton = () => {
        if (isAdmin) {
            return (
                <button className="button is-primary level-right">
                    Thực hiện điểm danh
                </button>
            )
        } else {
            return (
                <button className="button is-primary level-right">
                    Điểm danh
                </button>
            )
        }
    }
    const onClose = (event) => {
        if (event) {
            props.onDelete(id)
        }
        setActive("")
    }
    return (
        <div className="course box w-h-200 level block">
            <div className="title-div">
                <h1 className="title">{name}</h1>
                <ion-icon
                    className="delete-icon"
                    name="close-outline"
                    onClick={() => { setActive("is-active") }}
                ></ion-icon>
                <WarningModal
                    onOpen={active}
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
