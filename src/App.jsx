import './App.css';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import Tvshow from './Components/Tvshow/Tvshow';
import People from './Components/People/People';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Notfound from './Components/NotFound/Notfound';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import ProtectedRoutes from './Components/ProtectedRoute/ProtectedRoute';
import MovieDetails from './Components/MovieDetails/MovieDetails';
// import ProtectedRoutes from '../../../week 3/project/project/src/Component/ProtectedRoutes/ProtectedRoutes';


function App() {
  const [userData, setUserData] = useState(null)

  useEffect(() =>{
    if (localStorage.getItem("userToken")) {
      saveUser()
    }
  },[])
  function saveUser() {
    let encodedToken = localStorage.getItem("userToken")
    let decoded = jwtDecode(encodedToken);
    // console.log(decoded);
    setUserData(decoded)
  }
  let routers = createHashRouter([
    { path: "", element: <Layout userData={userData} setUserData={setUserData} /> , children: [
      {index:true , element: <ProtectedRoutes><Home/></ProtectedRoutes>},
      {path:"movies" , element: <ProtectedRoutes><Movies/></ProtectedRoutes>},
      {path:"home" , element: <ProtectedRoutes><Home/></ProtectedRoutes>},
      {path:"tvshow" , element: <ProtectedRoutes><Tvshow/></ProtectedRoutes>},
      {path:"people" , element: <ProtectedRoutes><People/></ProtectedRoutes>},
      {path:"moviedetails/:id/:mediaType" , element: <ProtectedRoutes><MovieDetails /></ProtectedRoutes>},
      {path:"login" , element: <Login saveUser={saveUser}/>},
      {path:"register" , element: <Register/>},
      {path:"*" , element: <Notfound/>},
    ]}
  ])
  
  return <RouterProvider router={routers}></RouterProvider>
}

export default App;
