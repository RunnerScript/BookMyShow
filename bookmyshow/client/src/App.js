import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Greeting from './components/Greetings';
import Counter from './components/Counter';
function App() {
  return (
    // <>
    //   <Greeting name='pradeep'></Greeting>
    //   <Counter />
    // </>
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='login/' element={<Login />} />
        <Route path='register/' element={<Register />} />
        <Route path="*" element={<><h1>No Page Found</h1></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
