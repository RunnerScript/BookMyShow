import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SingleMoviePage from './pages/SingleMoviePage';
import BookShow from './pages/BookShow';
import store from './redux/store';
import { Provider } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoutes';
import Dashboard from './pages/Admin/Dashboard';
import PartnerDashboard from './pages/Partner/Dashboard';
import ShowList from './pages/Partner/ShowList';
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>

        <Routes>
          <Route path='' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='login/' element={<Login />} />
          <Route path='register/' element={<Register />} />
          <Route path='admin/' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path='partner/' element={<ProtectedRoute><PartnerDashboard /></ProtectedRoute>} />
          <Route path='movie/:id' element={<ProtectedRoute><SingleMoviePage /></ProtectedRoute>} />
          <Route path='shows/:theatre' element={<ProtectedRoute><ShowList /></ProtectedRoute>} />
          <Route path='movie/:movieId/book-show/:showId' element={<BookShow />} />
          <Route path="*" element={<><h1>No Page Found</h1></>} />
        </Routes>
      </BrowserRouter>

    </Provider>
  );
}

export default App;
