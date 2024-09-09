


import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"
import React from 'react'
import {useSelector} from "react-redux"
import {Toaster} from "sonner"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import ProductDetail from "./pages/ProductDetail"
import Search from "./pages/Search"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import ListOfOrders from "./pages/ListOfOrders"
import Header from "./components/Header"
import Home from "./pages/Home"

function Layout(){

    const {currentUser} = useSelector((state) => state.user)

    return(

        <div className="w-full">

            <Header />

            <div className="w-full">

              <Outlet />

            </div>

        </div> 

    )
}


export default function App() {

  return (

    <BrowserRouter>

      <main className="w-full min-h-screen">

        <Toaster richColors/>

        <Routes>

          <Route  element={<Layout/>}>

              <Route path="/" element={<Home/>}/>

              <Route path="/list-orders" element={<ListOfOrders/>}/>

              <Route path="/product-details/:productId" element={<ProductDetail/>}/>

              <Route path="/profile" element={<Profile/>}/>

              <Route path="/search" element={<Search/>}/>

          </Route>

          <Route path="/sign-in" element={<SignIn/>}/>

          <Route path="/forgot-password" element={<ForgotPassword/>}/>

          <Route path="/reset-password/:token" element={<ResetPassword/>}/>

          <Route path="/sign-up" element={<SignUp/>}/>

        </Routes>

      </main>

    </BrowserRouter>

  )

}
