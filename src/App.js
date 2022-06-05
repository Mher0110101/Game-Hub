import './App.css';
import Header from './components/header/header';
import Container from './components/container/container';
import Footer from './components/footer/footer'; 
import {Routes, Route} from 'react-router-dom'
import Game1 from './components/Game1/Game1';
import Game2 from './components/Game2/Game2';
import Game3 from './components/Game3/Game3';
import Login from './components/Login/login';
import Register from './components/Register/register';
import RegisterComponent from './components/RegisterComponent/registerComponent';

function App() {

  return (
    <div className="App">
    <Header />
      <Routes>
        <Route path='/Home' element={<Container id={'container'}/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='Register' element={<RegisterComponent/>}/>
        <Route path='/game1' element={<Game1/>} />
        <Route path='/game2' element={<Game2/>} />
        <Route path='/game3' element={<Game3/>} />

        <Route path='/' element={<Container />}/>
      </Routes>
    <Footer />
    </div>    
  );
}

export default App;
