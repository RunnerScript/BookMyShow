import { useEffect, useState } from "react";
import MovieForm from "./MovieForm";
import DeleteMovieModal from "./DeleteMovieModal";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from 'moment';
import { openModal, openDeleteModal, closeModal, closeDeleteModal, fetchMovies } from "../../redux/movieSlice";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { render } from "@testing-library/react";

const MovieList = () => {
    const {
        list: movies,
        selectedMovie,
        isModalOpen,
        isDeleteModalOpen,
        formType,
        status,
        error } = useSelector((store) => store.movies);


    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(showLoading());
        dispatch(fetchMovies()).finally(() => {
            dispatch(hideLoading());
        });
    }, []);


    const tableHeadings = [
        {
            title: "Poster",
            dataIndex: "poster",
            render: (text, data) => {
                return <img src={data.poster} width="79" height="115" />
            }
        },
        { title: "Movie Name", dataIndex: "title", },
        { title: "Description", dataIndex: "description" },
        {
            title: "Duration",
            dataIndex: "duration",
            render: (text) => {
                return `${text} Mins`;
            }
        },
        { title: "Genre", dataIndex: 'genre' },
        { title: "Language", dataIndex: "language" },
        {
            title: "Release Date",
            dataIndex: "releaseDate",
            render: (text, data) => {

                return moment(data.releaseDate).format("MM-DD-YY");
            }
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, data) => {
                return (
                    <div>
                        <Button onClick={() => {
                            dispatch(openModal({ movie: data, formType: "edit" }));
                        }} > <EditOutlined /></Button>
                        <Button onClick={() => {
                            dispatch(openModal(data));
                        }}><DeleteOutlined /> </Button>
                    </div>
                )
            }
        }

    ];
    console.log(movies);
    return (
        <>
            <Table dataSource={movies} columns={tableHeadings} />
        </>
    );


}
export default MovieList;