import { useMemo } from "react";
import MovieForm from "./MovieForm";
import DeleteMovieModal from "./DeleteMovieModal";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from 'moment';
import { openModal, openDeleteModal, closeModal, closeDeleteModal } from "../../redux/movieSlice";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
//import { render } from "@testing-library/react";
//import { useMovies } from "../../hooks/useMovies";

const MovieList = () => {
    //Fetching the Movie States
    const {
        list: movies,
        selectedMovie,
        isModalOpen,
        isDeleteModalOpen,
        formType,
        status,
        error } = useSelector((store) => store.movies);

    const dispatch = useDispatch();

    //Adding keys to Movies
    const moviesData = useMemo(() => {
        return movies.map((item) => {
            return { ...item, key: `movie${item._id}` }
        })
    }, [movies]);

    //Table Heading for Movie Table
    const tableHeadings = [
        {
            title: "Poster",
            dataIndex: "poster",
            render: (text, data) => {
                return <img src={data.poster} width="79" height="115" />
            }
        },
        { title: "Movie Name", dataIndex: "movieName", },
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
                        <Button className="btn-tables" onClick={() => {
                            dispatch(openModal({ movie: data, formType: "edit" }));
                        }} > <EditOutlined /></Button>
                        <Button className="btn-tables" onClick={() => {
                            dispatch(dispatch(openDeleteModal({ movie: data, formType: "delete" })));
                        }}><DeleteOutlined /> </Button>
                    </div>
                )
            }
        }

    ];

    if (status === 'loading') {
        return (
            <div className="d-flex justify-content-end align-end   flex-col">
                Loading ...
            </div>
        )
    }
    return (
        <>
            <div className="d-flex justify-content-end align-end   flex-col">
                <Button className='max-width-100 ' onClick={() => {
                    dispatch(openModal({ movie: null, formType: "add" }));
                }}>Add Movie</Button>
            </div>

            <Table dataSource={moviesData} columns={tableHeadings} />
            {
                isModalOpen && (<MovieForm />)
            }
            {
                isDeleteModalOpen && (<DeleteMovieModal />)
            }

        </>
    );


}
export default MovieList;