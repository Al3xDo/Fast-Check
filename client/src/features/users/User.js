import { useState, useEffect } from "react"
import ListClass from "../../components/ListClass";
import Calendar from "../../components/Calendar"
// import AddRoom from "../../components/AddRoom"
import EditUserModal from "../../components/EditUserModal";
import "./style.css"
export const User = (props) => {

    // 0 -> show calendar
    // 1 -> show list class
    // 2 -> show add class
    const [showItem, setShowItem] = useState(1);

    const showItems = () => {
        if (showItem === 0) {
            return <Calendar />
        }
        else if (showItem === 1) {
            return <ListClass />
        }
        // else if (showItem === 2) {
        //     return <AddRoom />
        // }
    }
    useEffect(() => {
        props.UserActionsCreator.getUserRequest(props.token)
    }, [props.UserActionsCreator.getUserRequest])
    return (
        <div className="user-board columns">
            <div className="columns">
                <div className="avatar">
                    <img
                        className="is-avatar"
                        src={`data:image/jpeg;base64,${props.user.avatar}`}
                        alt="user-avatar"
                    />
                    <EditUserModal name={props.user.name} email={props.user.email} />
                </div>

            </div>
            <div className="columns w-800">
                <div className="information ml-200" >
                    <div className="buttons">
                        <button
                            className="button is-info mgr-10"
                            onClick={() => setShowItem(0)}
                        > <ion-icon name="list-outline"></ion-icon></button>
                        <button
                            className="button is-info mgr-10"
                            onClick={() => setShowItem(1)}
                        > <ion-icon name="calendar-outline"></ion-icon></button>
                        <button
                            className="button is-info mgr-10"
                            onClick={() => setShowItem(2)}
                        > <ion-icon name="add-outline"></ion-icon></button>
                        <input className="search-field" type="text" placeholder="class name" />
                    </div>
                    {showItems()}
                </div>
            </div>
        </div>
    )
}