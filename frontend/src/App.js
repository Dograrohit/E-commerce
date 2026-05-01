import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Product from "./pages/Product"
import Login from "./pages/Login"
import Cart from "./pages/Cart"
import Collection from "./pages/Collection"
import Orders from "./pages/Orders"
import PlaceOrder from "./pages/PlaceOrder"
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Searchbar from './components/Searchbar';
import React from 'react';
import { ToastContainer} from 'react-toastify';

function App() {
  return (
      <div className='px-4 sm:px-[5vw] md:px-[7w] lg:pw-[9vw]'>
        <ToastContainer/>
       <Navbar/>
       <Searchbar/>
         <Routes>
           <Route path='/' element={<Home/>} />
           <Route path='/about' element={<About/>} />
           <Route path='/contact' element={<Contact/>} />
           <Route path='/product/:productId' element={<Product/>} />
           <Route path='/login' element={<Login/>} />
           <Route path='/cart' element={<Cart/>} />
           <Route path='/collection' element={<Collection/>} />
           <Route path='/orders' element={<Orders/>} />
           <Route path='/placeOrder' element={<PlaceOrder/>} />
         </Routes>
         <Footer/>
      </div>
  );
}

export default App;
