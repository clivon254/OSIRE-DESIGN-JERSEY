
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"
import React from 'react'
import {useSelector} from "react-redux"
import {Toaster} from "sonner"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import EditProduct from "./pages/EditProduct"
import AddProduct from "./pages/AddProduct"
import ProductDetail from "./pages/ProductDetail"
import Reveiw from "./pages/Reveiw"
import Search from "./pages/Search"
import Dashboard from "./pages/Dashboard"
import ListOfProducts from "./pages/ListOfProducts"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import DashSidebar from "./components/DashSidebar"
import ListOfOrders from "./pages/ListOfOrders"
import Header from "./components/Header"
import Coupon from "./pages/Coupon"

function Layout(){

    const {currentUser} = useSelector((state) => state.user)

    return(

      currentUser ? 

        <div className="w-full flex">

          <div className="hidden md:block w-1/4 h-screen border-r border-slate-300 top-0 left-0 sticky">

              <DashSidebar />

          </div>

          <div className="w-full md:w-3/4">

            <Header />

            <div className="w-full">

              <Outlet />

            </div>

          </div>

        </div> 
        :
        <Navigate to="/sign-in" />
    )
}


export default function App() {

  return (

    <BrowserRouter>

      <main className="w-full min-h-screen">

        <Toaster richColors/>

        <Routes>

          <Route  element={<Layout/>}>

              <Route path="/" element={<Dashboard/>}/>

              <Route path="/list-products" element={<ListOfProducts/>}/>

              <Route path="/list-orders" element={<ListOfOrders/>}/>

              <Route path="/product-details/:productId" element={<ProductDetail/>}/>

              <Route path="/add-product" element={<AddProduct/>}/>

              <Route path="/edit-product/:productId" element={<EditProduct/>}/>

              <Route path="/profile" element={<Profile/>}/>

              <Route path="/reveiw" element={<Reveiw/>}/>

              <Route path="/search" element={<Search/>}/>

              <Route path="/coupon" element={<Coupon/>}/>

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
