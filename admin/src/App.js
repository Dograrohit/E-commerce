import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Add from './Pages/Add';
import List from './Pages/List';
import Orders from './Pages/Orders';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

export const backend = process.env.REACT_APP_BACKEND_URL
export const currency = "$"

function App() {

  const [auth,setAuth] = useState(false)

  let check = async()=>{
    try {
      let get = await axios.get(`${backend}/api/user/auth`,{ withCredentials:true })
      setAuth(get.data.authentication === true)
      console.log(get.data)
    } catch (error) {
      console.log(error)
      setAuth(false)
    }
  }

  useEffect(()=>{
    check()
  },[])

  return (
         <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />

      {auth && (
        <>
          <Navbar setAuth={setAuth} />
          <hr />
        </>
      )}

      <div className='flex w-full'>

        {auth && <Sidebar />}

        <div className='w-[90%] mx-auto ml-[max(5vw,25px)] text-gray-600 text-base'>
          <Routes>
            <Route path="/login" element={ auth ? <Navigate to="/add" replace /> : <Login setAuth={setAuth} /> }  />
            <Route path="/add" element={ auth ? <Add /> : <Navigate to="/login" replace /> } />
            <Route path="/list" element={ auth ? <List /> : <Navigate to="/login" replace /> } />
            <Route path="/orders" element={ auth ? <Orders /> : <Navigate to="/login" replace /> } />
            <Route path="*" element={  <Navigate to={auth ? "/add" : "/login"} replace /> } />
          </Routes>

        </div>
      </div>
    </div>
  );
}

export default App;
