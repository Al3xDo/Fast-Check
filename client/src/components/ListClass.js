import React from 'react';
import RoomItemTable from './RoomItemTable';
export const ListClass = (props) => {
    const showRoom = () => {
        const { rooms } = props
        var result = null;
        if (rooms.length > 0) {
            result = rooms.map((room, index) => {
                return (
                    <RoomItemTable
                        key={index}
                        index={index}
                        name={room.name}
                        participantNumber={room.participantNumber}
                        isAdmin={room.isAdmin}
                    />)
            })
        }
        return result
    }
    return (
        <div className="infor-board">
            <table className="table is-fullwidth is-bordered is-scrollable">
                <thead>
                    <tr>
                        <th>Mã lớp</th>
                        <th>Tên lớp</th>
                        {/* <th>Ngày bắt đầu - Ngày kết thúc</th> */}
                        <th>Sĩ số</th>
                        <th>Lịch sử điểm danh</th>
                    </tr>
                </thead>
                <tbody height="450px">
                    {showRoom()}
                </tbody>
            </table>
        </div>
    );
}
