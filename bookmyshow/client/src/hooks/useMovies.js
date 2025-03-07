import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/loaderSlice";
import { fetchMovies } from "../redux/movieSlice";
export const useMovies = (dispatch) => {
    dispatch(showLoading());
    dispatch(fetchMovies()).finally(() => {
        dispatch(hideLoading());
    });
}