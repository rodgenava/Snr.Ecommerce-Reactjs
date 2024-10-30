import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Componets/Home';
import DefaultLayout from './Componets/Layout/DefaultLayout';
import Pricebook2 from './Componets/Pricebook2';
import Pricebook3 from './Componets/Pricebook3';
import Pricebook4 from './Componets/Pricebook4';
import Pricebook5 from './Componets/Pricebook5';
import NotFound from './Componets/NotFound';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route element={<DefaultLayout/>}>
        <Route path='pricebook2' element={<Pricebook2/>} />
        <Route path='pricebook3' element={<Pricebook3/>} />
        <Route path='pricebook4' element={<Pricebook4/>} />
        <Route path='pricebook5' element={<Pricebook5/>} />
      </Route>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  );
}

export default App;
