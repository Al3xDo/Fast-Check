import { useState, useEffect } from "react"
import ListClass from "../../components/ListClass";
import Calendar from "../../components/Calendar"
import { callApi } from "../../utils/apiCaller";
import { useSelector } from "react-redux";
import { selectAuth } from "../auth/authSlice";
import "./style.css"
import { toastError, toastSuccess } from "../../utils/toastNotify";
export const User = (props) => {
    const authState = useSelector(selectAuth)
    const [user, setUser] = useState(null)
    function fetchUser() {
        callApi("user/", "GET", {}, authState.token)
            .then((res) => {
                setUser(res.data)
            })
            .catch((err) => {
                toastError(err.message)
            })
    }
    useEffect(() => {
        fetchUser()
    }, []);
    // 0 -> show calendar
    // 1 -> show list class
    // 2 -> show add class
    const [showItem, setShowItem] = useState(1);
    const showItems = () => {
        if (showItem === 0) {
            return <Calendar />
        }
        // else if (showItem === 1) {
        //     return <ListClass />
        // }
    }

    const onDelete = () => {
        callApi("user", "DELETE", {}, authState.token)
            .then((res) => {
                toastSuccess(res.data.message)
            })
            .catch((err) => {
                toastError(err.message)
            })
    }
    const onEdit = () => {
        callApi("user", "PUT", {}, authState.token)
            .then((res) => {
                fetchUser()
                toastSuccess(res.data.message)
            })
            .catch((err) => {
                toastError(err.message)
            })
    }
    return (
        <div className="user-board columns">
            <div className="columns">
                <div className="avatar">
                    {user && (
                        <img
                            className="is-avatar"
                            src={`data:image/jpeg;base64,${user.avatar}`}
                            alt="user-avatar"
                        />
                    )}
                    <div className="user-infor">
                        {user && (
                            <>
                                <h1>{user.email}</h1>
                                <h1>{user.name}</h1>
                            </>
                        )}
                    </div>
                    {/* <EditUserModal name={user.name} email={user.email} /> */}
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