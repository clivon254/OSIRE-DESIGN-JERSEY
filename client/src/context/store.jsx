

import axios from "axios"
import { createContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"



export const StoreContext = createContext(null)


export default function StoreContextProvider(props)
{   
    

    const url = "https://osire-design-jersey-backend.onrender.com"

    const {currentUser}  = useSelector(state => state.user)

    const [products ,setProducts] = useState([])

    const [users , setUsers] = useState([])

    const [reveiws , setReveiws] = useState([])

    const [orders , setOrders] = useState([])

    const [payments , setPayments] = useState([])

    const [cartItems, setCartItems] = useState([])

    const [data ,setData] = useState({
        userId:currentUser?._id
      })
    
    const [close ,setClose] = useState(false)

    const [details ,setDetails] = useState({})

    const [totalAmounts ,setTotalAmounts] = useState(null)

    const [couponApplied, setCouponApplied] = useState(false)

    const veiw = (product) => {

        setDetails({...product})

        setClose()

        console.log("yes am worling")

    }

    const [Loading ,setLoading] = useState(false)


    // fetchProducts
    const fetchProducts = async () => {

        try
        {
            setLoading(true)

            const res = await axios.get(url + "/api/product/get-products")

            if(res.data.success)
            {
                setProducts(res.data.products)

                setLoading(false)
            }
        }
        catch(error)
        {
            console.log(error.message)

            setLoading(false)
        }

    }

    // fetchProducts
    const fetchUsers = async () => {

        try
        {
            const res = await axios.get(url + "/api/user/get-users")

            if(res.data.success)
            {
                setUsers(res.data.users)
            }
        }
        catch(error)
        {
            console.log(error.message)
        }

    }

    // fetchProducts
    const fetchOrders = async () => { 

        try
        {
            const res = await axios.post(url + "/api/order/user-order",data)

            if(res.data.success)
            {
                setOrders(res.data.orders)
            }
        }
        catch(error)
        {
            console.log(error.message)
        }

    }

    // fetchCartItems
    const fetchCartItems = async () => {

    try
    {
        const res = await axios.post( url + "/api/cart/get-cart",data)

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


   // Total Amount
   const getTotalCartAmount = () => {

        let totalAmount = 0 ;
        
        for(const item in cartItems)
        {
            if(cartItems[item] > 0)
            {
                let itemInfo = products.find((product) => product._id === item)

                if(itemInfo)
                {
                    totalAmount += itemInfo.discountprice * cartItems[item]
                }

            }
        }

        return totalAmount
   }


    useEffect(() => {

        fetchProducts()

        fetchUsers()

        if(currentUser?._id)
        {
            fetchCartItems()

            fetchOrders()
        }
            

    },[currentUser?._id])


    const contextValue = { 
        url,
        products,
        setProducts,
        users,
        setUsers,
        cartItems,
        setCartItems,
        veiw,
        details,
        setDetails,
        close,
        setClose,
        getTotalCartAmount,
        orders,
        setOrders,
        totalAmounts,
        setTotalAmounts,
        couponApplied,
        setCouponApplied,
        setLoading,
        Loading
    }

   
    return(

        <StoreContext.Provider value={contextValue}>

            {props.children}

        </StoreContext.Provider>
    )
}
