import { Col, Flex, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../../api/movies";
import moment from 'moment';
import { getAllShowsByMovie } from "../../api/shows";

const SingleMoviePage = () => {
    const params = useParams();
    const [movie, setMovie] = useState(null);
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const [showsData, setShowsData] = useState([]);

    const navigate = useNavigate();

    const getData = async () => {
        const response = await getMovieById(params.id);
        setMovie(response.data.data);
    }

    const getAllShowsForSelectedMovie = async () => {
        console.log("Movie Details:", params.id, date);
        const response = await getAllShowsByMovie(params.id, date);
        setShowsData(response.data.data);
    }

    const handleDate = (e) => {
        setDate(e.target.value);
        navigate(`/movie/${movie._id}?date=${e.target.value}`);
    }

    console.log(showsData);
    useEffect(() => {
        getData();
    }, []);


    useEffect(() => {
        getAllShowsForSelectedMovie();
    }, [date]);



    return (
        <>
            {movie && (
                <Flex
                    justify='center'
                    align='center'
                    gap='large'
                >
                    <div>
                        <img src={movie.poster} width={200} />
                    </div>
                    <div>
                        <h1>{movie.movieName}</h1>
                        <p>Language:{movie.language}</p>
                        <p>Genre:{movie.genre}</p>
                        <p>Release Date:{movie.releaseDate}</p>
                        <p>Duration:{movie.duration}</p>
                        <hr />
                        <label>Choose a Date: </label>
                        <Input
                            type='Date'
                            value={date}
                            onChange={handleDate}
                        ></Input>
                    </div>

                </Flex>


            )}
            <div className="page-padding">
                {
                    showsData && showsData.length === 0 && (
                        <div className="mt-4">
                            <h3>Currently no theatres Available for this movie.</h3>
                        </div>
                    )
                }


                {
                    showsData && showsData.length > 0 && (
                        <>
                            <h1>Theatre</h1>
                            {
                                showsData.map((showData) => {
                                    const theatreId = showData.theatreId;
                                    const theatreDetails = showData.theatreDetails;
                                    const allShowsForThisTheatre = showData.allShowsPerticularTheatre;
                                    return (
                                        <Row gutter={24} className='justify-center align-center'>
                                            <Col lg={{ span: 8 }}>
                                                <h3>{theatreDetails.name}</h3>
                                                <p>{theatreDetails.address}</p>
                                            </Col>
                                            <Col lg={{ span: 16 }}>
                                                <ul className="show-ul">
                                                    {allShowsForThisTheatre.map((show) => {
                                                        return <li onClick={() => {
                                                            navigate(`book-show/${show._id}`);
                                                        }}>{show.time}</li>

                                                    })}
                                                </ul>
                                            </Col>
                                        </Row>
                                    )
                                })

                            }
                        </>


                    )
                }
            </div>
        </>
    )
}
export default SingleMoviePage;