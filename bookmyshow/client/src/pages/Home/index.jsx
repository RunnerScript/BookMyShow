import { Col, Flex, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getAllMovies } from "../../api/movies";
import MovieList from "../../components/MovieList";
import moment from "moment";

const Home = () => {
    const [movies, setMovies] = useState(null);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getMovies = async () => {
            const response = await getAllMovies();
            setMovies(response.data.data);
        }
        getMovies();

    }, []);

    const onSearchTextChange = (e) => {
        setSearchText(e.target.value);
    }
    return (<>
        <Row className="d-flex w-100" style={{
            marginTop: '5px',
            justifyContent: 'center'
        }}>
            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
                <Input placeholder="Type here to search for movies" onChange={(e) => onSearchTextChange(e)} />
            </Col>
        </Row>

        <Flex
            justify='center'
            align='center'
            gap='large'
            wrap
            style={{
                marginTop: '2rem',
                padding: '20px'
            }}
        >
            {
                movies && movies.filter((movie) => movie.movieName.toLowerCase().includes(searchText.toLocaleLowerCase())).map((movie) => {
                    return (
                        <div

                            className='mb-5'
                            span={{
                                lg: 10,
                                xs: 24,
                                md: 12
                            }}
                        >
                            <div className="text-center">
                                <img src={movie.poster} width={250}
                                    style={{
                                        borderRadius: '10px'
                                    }}
                                />
                                <h3
                                    onClick={() => {
                                        navigate(`/movie/${movie._id}?date=${moment().format('YYYY-MM-DD')}`);
                                    }}
                                    className='cursor-pointer'
                                >{movie.movieName}</h3>
                            </div>
                        </div>
                    );
                })

            }


        </Flex>
    </>)
}
export default Home;