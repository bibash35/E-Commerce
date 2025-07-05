import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider,createRoutesFromElements,Route,Link} from "react-router-dom";
import Home from './page/Home.jsx';
import Menu from './page/Menu.jsx';
import About from './page/About.jsx';
import Contact from './page/Contact.jsx';
import Newproduct from './page/Newproduct.jsx';
import Login from './page/Login.jsx';
import Signup from './page/Signup.jsx';
import store from "./redux/index.js"
import { Provider } from "react-redux";
import Cart from './page/Cart.jsx';
import ProtectedRoute from './component/ProtectedRoute.jsx';
import SearchResultsPage from './component/SearchPage.jsx';
import Payment from './payment/Payment.jsx';
import Success from './payment/Success.jsx';
import Failure from './payment/Failure.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
<Route path='/' element={<App/>}>
<Route index element={<Home/>}/>
<Route path="menu/:filterby" element={<Menu />} />
<Route path='about' element={<About/>}/>
<Route path='contact' element={<Contact/>}/>
<Route path='new-product' element={<ProtectedRoute role="seller"><Newproduct /></ProtectedRoute>} />
<Route path='login' element={<Login/>}/>
<Route path='signup' element={<Signup/>}/>
<Route path='cart' element={<Cart/>}/>
<Route path='cart' element={<Cart/>}/>
<Route path='payment' element={<Payment/>}/>
<Route path='success' element={<Success/>}/>
<Route path='failure' element={<Failure/>}/>

<Route path='search-page' element={<SearchResultsPage/>}/>
</Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <RouterProvider router={router} />
</Provider>
)
