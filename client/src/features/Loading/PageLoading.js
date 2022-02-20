import React from 'react';
import LoadingGif from "../../asset/image/loading.gif"
import "./PageLoading.css"
import { useSelector } from 'react-redux';
import { selectLoading } from './loadingSlice';
export const PageLoading = () => {
    const loadingState = useSelector(selectLoading)
    if (!loadingState.load) return null
    return (
        <div className="loader-container is-grey-light">
            <img src={LoadingGif} className="loading-gif" />
        </div>
    );
}
