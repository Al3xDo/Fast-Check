import { useState, useEffect } from "react"
import Calendar from "../../components/Calendar"
import { callApi } from "../../utils/apiCaller";
import { useSelector } from "react-redux";
import { selectAuth } from "../auth/authSlice";
import "./style.css"
import { toastError, toastSuccess } from "../../utils/toastNotify";
export const User = (props) => {
    const authState = useSelector(selectAuth)
    const [user, setUser] = useState(null)
    const [name, setName] = useState("")
    const [showEditForm, setShowEditForm] = useState(false)
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
        callApi("user/", "PUT", { name: name }, authState.token)
            .then((res) => {
                fetchUser()
                toastSuccess(res.data.message)
            })
            .catch((err) => {
                toastError(err.message)
            })
    }
    const onSubmitEdit = () => {
        setShowEditForm(false)
        onEdit()
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
                    <button
                        className="button is-rounded mt-20"
                        style={{ width: "100%" }}
                        onClick={() => setShowEditForm(true)}
                    >
                        <span className="icon mr-1">
                            <ion-icon name="create-outline"></ion-icon>
                        </span>
                        Edit User
                    </button>
                    {showEditForm ? (
                        <div className="box mt-20">
                            <h1>Name</h1>
                            <input className="input is-normal is-hovered"
                                onChange={(e) => setName(e.target.value)}
                            />
                            <div className="box-footer mt-20">
                                <div className="level-right">
                                    <button className="button is-primary level-item"
                                        onClick={onSubmitEdit}
                                    > Save</button>
                                    <button className="button level-item"
                                        onClick={() => setShowEditForm(false)}
                                    > Cancel</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        user && (
                            <div className="mt-20 ml-20">
                                <h1 className="is-size-4">{user.email}</h1>
                                <h1 className="is-size-5 has-text-weight-light">{user.name}</h1>
                            </div>
                        )
                    )}

                </div>

            </div>
            <div className="columns w-800">
                <div className="information ml-200" >
                    {/* <div className="buttons">
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
                    </div> */}
                    <Calendar />
                </div>
            </div>
        </div>
    )
}