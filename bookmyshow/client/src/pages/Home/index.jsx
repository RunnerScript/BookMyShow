import { useEffect } from "react";
import { getAllMovies } from "../../api/movies";
import MovieList from "../../components/MovieList";
const Home = () => {
    useEffect(() => {
        const getMovies = async () => {
            const response = await getAllMovies();
            console.log(response);
        }
        getMovies();

    }, []);
    return (<MovieList />)
}
export default Home;