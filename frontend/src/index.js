import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router,Routes,Route,Navigate }  from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './components/Home';
import Render3D from './components/Render3D';
import UserReservation from './components/UserReservation';
import AdminAddRoom from './components/admin/AdminAddRoom';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SnackbarProvider maxSnack={3}>
  <Router>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path='/reservation' element={<UserReservation/>}></Route>
      <Route path="/d" element={<Render3D/>}></Route>
      <Route path='/addrooms' element={<AdminAddRoom/>}></Route>

    </Routes>
  </Router>
  </SnackbarProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
