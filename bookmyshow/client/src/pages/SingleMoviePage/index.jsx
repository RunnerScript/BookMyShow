import { Flex, Input } from "antd";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../../api/movies";
import Navbar from "../../components/Navbar";
import moment from 'moment';

const SingleMoviePage = () => {
    const params = useParams();
    const [movie, setMovie] = useState(null);
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const navigate = useNavigate();
    console.log(params.id);
    useEffect(() => {
        const getData = async () => {
            const response = await getMovieById(params.id);
            setMovie(response.data.data);
        }
        getData();
    }, []);

    const handleDate = (e) => {
        setDate(e.target.value);
        navigate(`/movie/${movie._id}?date=${e.target.value}`);
    }
    return (
        <>
            <Navbar />
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
        </>
    )
}
export default SingleMoviePage;