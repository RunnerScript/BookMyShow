import { useParams } from 'react-router-dom';
const BookShow = () => {
    const { movieId, showId } = useParams();
    console.log(movieId, showId);
    return <h1>Gello thai gayo</h1>
}


export default BookShow;