import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SingleMoviePage from './pages/SingleMoviePage';
import BookShow from './pages/BookShow';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='login/' element={<Login />} />
        <Route path='register/' element={<Register />} />
        <Route path='movie/:id' element={<SingleMoviePage />} />
        <Route path='movie/:id/book-show/:showId' element={<BookShow />} />
        <Route path="*" element={<><h1>No Page Found</h1></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
