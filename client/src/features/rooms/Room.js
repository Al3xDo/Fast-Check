import React from 'react';
import "./room.css"

export const Room = (props) => {
    const { roomName, participantNumber, isAdmin, id, publicId } = props.room
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
    const onOpenEditModal = (id) => {
        props.onOpenEditModal(id)
    }
    const onOpenWarningModal = (id) => {
        props.onOpenWarningModal(id)
    }
    return (
        <div className="course box w-h-200 level block">
            <div className="title-div">
                <h1 className="title">{roomName}</h1>
                <ion-icon name="ellipsis-vertical-outline"
                    onClick={() => onOpenEditModal(id)}
                ></ion-icon>
                <ion-icon name="trash-outline"
                    onClick={() => onOpenWarningModal(id)}
                ></ion-icon>

            </div>

            <div className="course-description">
                <h2>Sĩ số: {participantNumber}</h2>
                {/* <h2>Time: {timeEnd} - {timeStart}</h2> */}
                {/* <h2>Class size: 52</h2> */}
            </div>
            <div className="course-icon row">
                <button className="button"
                    onClick={() => props.onOpenInviteModal(publicId)}
                >
                    <span className="icon is-small">
                        <ion-icon name="share-social-outline"></ion-icon>
                    </span>
                </button>
                {showButton()}
            </div>
        </div>
    );
}
