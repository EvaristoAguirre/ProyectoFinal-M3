import './App.css'
import Navbar from './components/Navbar/Navbar';
import Home from './views/Home/Home'
import MisTurnos from './views/MisTurnos/MisTurnos';
import Register from './views/Register/Register';
import Login from './views/Login/Login';
import {Routes, Route} from 'react-router-dom'
import Reservar from './views/Reservar/Reservar';
import Landing from './views/Landing/Landing';
import ErrorPage from './views/ErrorPage/ErrorPage';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/appointments' element={<MisTurnos />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/reservar' element={<Reservar />}/>
        <Route path='*' element={<ErrorPage />}/>

      </Routes>
    </>
  );

  
};

export default App
