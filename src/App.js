import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import HomeScreen from './Screens/HomeScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ProductScreen from './Screens/ProductScreen';
import UserScreen from './Screens/UserScreen';
import ProductInserScreen from './Screens/ProductInserScreen';
import LoginScreen from './Screens/LoginScreen';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Router>
      <Routes>
        <Route path='/home' exact element={<HomeScreen/>}/>
        <Route path='/register' exact element={<RegisterScreen/>}/>
        <Route path='/login' exact element={<LoginScreen/>}/>
        <Route path='/user' exact element={<UserScreen/>}/>
        <Route path='/product' exact element={<ProductScreen/>}/>
        <Route path='/productinsert' exact element={<ProductInserScreen/>}/>

      </Routes>
      </Router>
    </div>
  );
}

export default App;


