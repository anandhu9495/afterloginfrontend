import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Pages/Footer';
import Headre from './Pages/Headre';
import Auth from './Components/Auth';
import Home from './Components/Home';
import FrontPage from './Components/FrontPage';

function App() {
  return (
    <div className="App">

      <Headre/>


      <Routes>


        <Route path='/' element={<FrontPage/>}/>


      <Route path='/login' element={<Auth/>}/>
        <Route path='/register' element={<Auth register/>}/>
        <Route path='/home' element={<Home/>}/>



      </Routes>


      <Footer/>
     
    </div>
  );
}

export default App;
