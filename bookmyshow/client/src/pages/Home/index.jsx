import { Col, Flex, Input, Row, Card } from "antd";
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
    const { Meta } = Card;
    const onSearchTextChange = (e) => {
        setSearchText(e.target.value);
    }
    useEffect(() => {

    }, []);

    const moviesData = movies.map(movie => ({ ...movie, key: `movie${movie.id}` }))

    return (<>
        <Row className='d-flex justify-center px-2' gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={16} className='my-2'>
                <Input placeholder="Type here to search for movies" onChange={(e) => onSearchTextChange(e)} />
            </Col>
        </Row>

        <Flex justify='center' align='center' gap={20} className='flex-wrap'>
            {
                moviesData && moviesData.filter((movie) => movie.movieName.toLowerCase().includes(searchText.toLocaleLowerCase())).map((movie) => {
                    return (

                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img src={movie.poster} />}
                        >
                            <Meta title={movie.movieName} onClick={() => {
                                navigate(`/movie/${movie._id}?date=${moment(new Date()).format('YYYY-MM-DD')}`);
                            }} />
                        </Card>


                    );
                })

            }


        </Flex>
    </>)
}
export default Home;