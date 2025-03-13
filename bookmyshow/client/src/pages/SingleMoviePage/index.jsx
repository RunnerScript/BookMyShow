import { Col, Flex, Input, Row, Card } from "antd";
import { useEffect, useMemo } from "react";
import { Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
//import { getMovieById } from "../../api/movies";
import moment from 'moment';
//import { getAllShowsByMovie } from "../../api/shows";
import { getMovieWithId, getShowsOfMovie } from '../../redux/singleMovieSlice';
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "../../redux/singleMovieSlice";
const SingleMoviePage = () => {
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const { movie, shows, status, error, date } = useSelector((store) => store.singleMovie);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMovieWithId(params.id));
        dispatch(setDate(moment().format('YYYY-MM-DD')));
    }, [])


    useEffect(() => {
        if (date) {
            dispatch(getShowsOfMovie({ id: params.id, date: date }));
        }
    }, [date]);

    const showsData = shows.map((item) => {
        return { ...item, key: `show${item._id}` }
    })

    const handleDate = (e) => {
        // console.log("Date is", moment(e.target.value).format('DD-MM-YYYY'));
        const selectDate = moment(e.target.value).format('YYYY-MM-DD');
        dispatch(setDate(selectDate));
        navigate(`/movie/${params.id}?date=${moment(e.target.value).format('YYYY-MM-DD')}`);
    }
    //console.log("Movie", error);

    if (status === 'loading' || status === 'idle') {
        return <>Loading...</>
    }

    if (status === 'failed') {
        return "<h1>Internal Server Error</h1>"
    }

    //console.log(date);
    return (
        <>
            {movie && (
                <Flex justify='center' align='center' gap='large'>
                    <div>
                        <img src={movie.poster} width={200} />
                    </div>
                    <div>
                        <h1>{movie.movieName}</h1>
                        <p>Language:{movie.language}</p>
                        <p>Genre:{movie.genre}</p>
                        <p>Release Date:{moment(movie.releaseDate).format("DD-MM-YYYY")}</p>
                        <p>Duration:{movie.duration}</p>
                        <hr />
                        <label>Choose a Date: </label>
                        {date && (<Input type='Date' value={date} onChange={handleDate}></Input>)}
                    </div>

                </Flex>
            )}

            {
                shows && showsData.length > 0 && (
                    <>
                        <h1 className="m-2">Theatre</h1>
                        <Flex justify='center' align='center' gap='middle' className="m-2">

                            {
                                showsData.map((showData) => {
                                    const theatreId = showData.theatreId;
                                    const theatreDetails = showData.theatreDetails;
                                    const allShowsForThisTheatre = showData.allShowsPerticularTheatre;
                                    return (
                                        <Card title={theatreDetails.name}>

                                            <p>{theatreDetails.address}</p>
                                            <ul className="show-ul">
                                                {allShowsForThisTheatre.map((show) => {
                                                    return <li onClick={() => {
                                                        navigate(`book-show/${show._id}`);
                                                    }}>{show.time}</li>
                                                })}
                                            </ul>
                                        </Card>
                                    )
                                })

                            }
                        </Flex>
                    </>


                )
            }
        </>
    )
}
export default SingleMoviePage;