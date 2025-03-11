import { Col, Flex, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getAllMovies } from "../../api/movies";
import MovieList from "../../components/MovieList";
import moment from "moment";
import { useSelector } from "react-redux";

const Home = () => {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    const { list: movies } = useSelector((store) => store.movies);

    const onSearchTextChange = (e) => {
        setSearchText(e.target.value);
    }


    return (<>
        <Row className='d-flex justify-center' gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={16} className='my-2'>
                <Input placeholder="Type here to search for movies" onChange={(e) => onSearchTextChange(e)} />
            </Col>
        </Row>

        <Row className='d-flex justify-center' gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {
                movies && movies.filter((movie) => movie.movieName.toLowerCase().includes(searchText.toLocaleLowerCase())).map((movie) => {
                    return (
                        <Col
                            className="card"
                            span={{
                                sm: 24,
                                md: 12,
                                xs: 24,
                                lg: 8
                            }}
                        >
                            <div className="text-center">
                                <img src={movie.poster}
                                />
                                <h3
                                    onClick={() => {
                                        navigate(`/movie/${movie._id}?date=${moment().format('YYYY-MM-DD')}`);
                                    }}
                                    className='cursor-pointer'
                                >{movie.movieName}</h3>
                            </div>
                        </Col>
                    );
                })

            }


        </Row>
    </>)
}
export default Home;