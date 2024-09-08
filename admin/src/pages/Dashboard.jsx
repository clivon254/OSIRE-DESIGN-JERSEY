

import { createContext, useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import React from 'react'
import { StoreContext } from "../context/store"
import axios from "axios"


export default function Dashboard() {

  const {url} = useContext(StoreContext)

  const {currentUser}  = useSelector(state => state.user)

  const [cartItems, setCartItems] = useState([])

  const [data ,setData] = useState({
    userId:currentUser._id
  })

  // fetchCartItems
  const fetchCartItems = async () => {

      try
      {
          const res = await axios.get( url + "/api/cart/get-cart",data)

          if(res.data.success)
          {
              setCartItems(res.data.cartData)
          }  
          else
          {
              console.log(res.data.message)
          }

      }
      catch(error)
      {
          console.log(error.message)
      }

  }

  useEffect(() => {
        
    if(currentUser._id)
    {
        fetchCartItems()
    }
    
},[currentUser._id])


  console.log(cartItems)

  console.log(data)

  return (

    <div>Dashboard</div>
    
  )

}
