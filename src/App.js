// import { Router } from 'react-router-dom';
import { Route,Routes } from 'react-router-dom';
import './App.css';
import '../src/components/styles/style.css'
import LoginPage from './components/auth/login';
import Signin from './components/auth/signin';
import Dashboard from './pages/dashboard';
import PrivateRoutes from './components/auth/privateRoutes';
function App() {
  return(
    <Routes>
      <Route path='/' element={<PrivateRoutes><Dashboard/></PrivateRoutes>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<Signin/>}/>
      <Route path='/dashboard' element={<PrivateRoutes><Dashboard/></PrivateRoutes>}/>
    </Routes>
  )

}

export default App;
