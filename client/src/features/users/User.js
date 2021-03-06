import { useState, useEffect } from "react"
import Calendar from "../../components/Calendar"
import { callApi, callApiUploadImage } from "../../utils/apiCaller";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../auth/authSlice";
import "./style.css"
import { toastError, toastSuccess } from "../../utils/toastNotify";
import UploadSampleImage from "./UploadSampleImage";
import { setLoading } from "../Loading/loadingSlice";
import { SampleImage } from "./SampleImage";
export const User = (props) => {
    const authState = useSelector(selectAuth)
    const dispatch = useDispatch()
    const [user, setUser] = useState(null)
    const [name, setName] = useState("")
    const [openUploadSampleImageModal, setOpenUploadSampleImageModal] = useState("")
    const [showEditForm, setShowEditForm] = useState(false)
    const [fileUpload, setFileUpload] = useState({
        name: "",
        file: ""
    })
    function fetchUser() {
        dispatch(setLoading(true))
        callApi("user/", "GET", {}, authState.token)
            .then((res) => {
                setUser(res.data)
            })
            .catch((err) => {
                toastError(err.message)
            })
        setTimeout(() => {
            dispatch(setLoading(false));
        }, 1000);
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
    const onUploadAvatar = () => {
        const formData = new FormData();
        formData.append("image", fileUpload.file);
        callApiUploadImage("user/uploadAvatar", "POST", formData, authState.token)
            .then((res) =>
                toastSuccess(res.data.message))
            .catch((err) => {
                toastError(err.response.data.message)
            })
        fetchUser()
    }
    return (
        <div className="user-board columns" >
            <div className="column is-6">
                <div className="div">
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
                            style={{ width: "300px" }}
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
                                <div className="box-footer mt-10">
                                    <div className="level-right">
                                        <button className="button is-primary level-item"
                                            onClick={onSubmitEdit}
                                        > Save</button>
                                        <button className="button level-item"
                                            onClick={() => setShowEditForm(false)}
                                        > Cancel</button>
                                    </div>
                                </div>
                                <div className="file has-name mt-10"
                                    onChange={(e) => setFileUpload({
                                        name: e.target.files[0].name,
                                        file: e.target.files[0]
                                    })}
                                >
                                    <label className="file-label">
                                        <input className="file-input" type="file" name="resume" />
                                        <span className="file-cta">
                                            <span className="file-icon">
                                                <ion-icon name="cloud-upload-outline"></ion-icon>
                                            </span>
                                            <span className="file-label">
                                                Choose a file???
                                            </span>
                                        </span>
                                        <span className="file-name">
                                            {fileUpload.name}
                                        </span>
                                    </label>
                                </div>
                                {fileUpload.name && (
                                    <div className="level-right">
                                        <button className="button is-primary mt-10 level-right"
                                            onClick={onUploadAvatar}
                                        >
                                            Upload file
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            user && (
                                <div className="mt-20 ml-20">
                                    <h1 className="is-size-4">{user.email}</h1>
                                    <h1 className="is-size-5 has-text-weight-light">{user.name}</h1>
                                </div>
                            )
                        )}
                        <button className="button is-primary"
                            onClick={() => setOpenUploadSampleImageModal("is-active")}
                        >
                            <span className="icon is-medium">
                                <ion-icon name="camera"></ion-icon>
                            </span>
                            <span>
                                Upload sample image
                            </span>
                        </button>
                        <UploadSampleImage
                            open={openUploadSampleImageModal}
                            onClose={() => setOpenUploadSampleImageModal("")}
                        />
                    </div>
                </div>

            </div>
            <div className="column is-6">
                <div className="columns mt-20">
                    <div className="information" >
                        <div className="columns">
                            <div>
                                <button
                                    className="button is-info mgr-10"
                                > <ion-icon name="list-outline"></ion-icon></button>
                                <button
                                    className="button is-info mgr-10"
                                > <ion-icon name="calendar-outline"></ion-icon></button>
                                <button
                                    className="button is-info mgr-10"
                                > <ion-icon name="add-outline"></ion-icon></button>
                                <input className="search-field" type="text" placeholder="class name" />
                            </div>
                        </div>
                        <h1 className="is-size-3 has-text-centered">Sample Image</h1>

                        <SampleImage />

                        {/* <Calendar /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}