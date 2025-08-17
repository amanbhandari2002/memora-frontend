// import { Router } from 'react-router-dom';
import { Route,Routes } from 'react-router-dom';
import '../src/components/styles/style.css'
import LoginPage from './components/auth/login';
import Signin from './components/auth/signin';
import Dashboard from './pages/dashboard';
import PrivateRoutes from './components/auth/privateRoutes';
import Layout from './layout';
import Upload from './pages/uploadImage';
import SearchPage from './pages/searchPage';
import Gallery from './pages/galery';
function App() {
  return(
    <Routes>
      <Route path='/' element={<PrivateRoutes><Layout><Dashboard/></Layout></PrivateRoutes>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<Signin/>}/>
      <Route path='/dashboard' element={<PrivateRoutes><Layout><Dashboard/></Layout></PrivateRoutes>}/>
      <Route path='/upload' element={<PrivateRoutes><Layout><Upload/></Layout></PrivateRoutes>}/>
      <Route path='/search' element={<PrivateRoutes><Layout><SearchPage/></Layout></PrivateRoutes>}/>
      <Route path='/gallery' element={<PrivateRoutes><Layout><Gallery/></Layout></PrivateRoutes>}/>
    </Routes>
  )

}

export default App;
