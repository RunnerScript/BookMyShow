import { useParams } from 'react-router-dom';
const BookShow = () => {
    const params = useParams();
    console.log(params);
    return <h1>Gello thai gayo</h1>
}


export default BookShow;