import './App.css';
import Header from './components/header/header';
import Container from './components/container/container';
import Footer from './components/footer/footer'; 
import {Routes, Route} from 'react-router-dom'
import Game1 from './components/Game1/Game1';
import Game2 from './components/Game2/Game2';

function App() {

  return (
    <div className="App">
      <Header />
      <Container id={'container'}/>
      <Footer />
    <Routes>
      <Route path='/game1' element={<Game1/>} />
      <Route path='/game2' element={<Game2/>} />
    </Routes>
    </div>    
  );
}

export default App;
