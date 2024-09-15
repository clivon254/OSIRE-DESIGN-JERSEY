

import { Button, Checkbox, Label, Radio, Spinner, TextInput } from 'flowbite-react'
import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/store'
import { useSelector } from 'react-redux'
import {toast} from "sonner"
import axios from "axios"
import {useNavigate} from "react-router-dom"


export default function CheckOut() {

  const {getTotalCartAmount,products,cartItems,url,totalAmounts} = useContext(StoreContext)

  const {currentUser} = useSelector(state => state.user)

  const [data ,setData] = useState({})

  const [shippingMethod , setShippingMethod] = useState(null)

  const [paymentMethod , setPaymentMethod] = useState(null)

  const [prompt , setPrompt] = useState(false)

  const [Loading ,setLoading] = useState(false)
  
  const [error, setError] = useState(null)

  const [completeOrder, setCompleteOrder] = useState(false)
  
  let TotalAmount = Number(totalAmounts || getTotalCartAmount()) + Number(shippingMethod || 0);

  const navigate = useNavigate()

  //onChangeData
  const onChangeData = (e) => {

    setData({...data,[e.target.name]:e.target.value})

  }

  // changeShippingMethod
  const changeShippingMethod = (e) => {

    setShippingMethod(e.target.value)

  }

   //  placeorder
  const placeorder = async () => {

    let orderItems = [] ;

    products.map((item) => {

        if(cartItems[item._id] > 0)
        {
            let itemInfo = item ;

            itemInfo['quantity'] = cartItems[item._id]

            orderItems.push(itemInfo)
        }
    })


    console.log(orderItems)

    let orderData = {
        address:data ,
        items:orderItems,
        paymentMethod,
        amount:TotalAmount,
        userId:currentUser?._id
    }

    console.log(orderData)

    switch(paymentMethod)
    {

        case 'stripe':
            try
            {
                setLoading(true)

                const res = await axios.post(url + "/api/order/place-orderStripe", orderData)

                if(res.data.success)
                {
                    setLoading(false)

                    const {session_url} = response.data

                    window.location.replace(session_url)
                }
                else
                {
                    setLoading(false)

                    console.log("check the api")
                }
            }
            catch(error)
            {
                console.error(error.message)

                setLoading(false)
            }
           break;
        case 'mpesa':
            try
            {
                setLoading(true)

                const res = await axios.post(url + "/api/order/place-orderMpesa",orderData)

                if(res.data.success)
                {
                    setPrompt(true)

                    setCompleteOrder(true)

                    setLoading(false)

                    toast.success('prompt has been sent to your phone')
                }
                else
                {
                    setLoading(false)

                    console.log("check the api")
                }
            }
            catch(error)
            {
                console.log(error.message)

                setLoading(false)
            }
            break;
        case 'payment after delivery':
            try
            {
                setLoading(true)

                const res = await axios.post(url + "/api/order/place-orderAfterDelivery", orderData)

                if(res.data.success)
                {
                    toast.success("order completed successfully")

                    setLoading(false)

                    navigate('/list-orders')
                }
                else
                {
                    setLoading(false)

                    console.log("check the api")
                }
            }
            catch(error)
            {
                console.log(error.message)

                setLoading(false)
            }
            break;
        default:
            console.log('Invalid payment method')

    }

  }

    console.log(data)

    console.log(shippingMethod)

    console.log(paymentMethod)
    
  return (

    <main className="px-5 py-10">

        <div className="flex flex-col md:flex-row gap-10">

            {/* Billing Data*/}
            <div className="w-full md:w-[55%] space-y-5">

                {/* contact */}
                <div className="w-full ">

                    <h2 className="subtitle text-black">Contact</h2>

                    <TextInput
                        type="text"
                        placeholder='Phone Number (07XXXXXXXX) '
                        name="phone"
                        value={data.phone}
                        onChange={onChangeData}
                    />

                </div>

                {/* Delivery */}
                <div className="w-full space-y-3">

                    <h2 className="subtitle">Delivery</h2>

                    <TextInput
                        type="text"
                        placeholder='KENYA'
                        name="country"
                        value={data.country}
                        onChange={onChangeData}
                    />

                    <div className="flex w-full flex-col gap-y-3 sm:flex-row gap-x-3">

                        <TextInput
                            type="text"
                            placeholder='First Name'
                            name="firstName"
                            value={data.firstName}
                            onChange={onChangeData}
                            className="w-full"
                        />

                        <TextInput
                            type="text"
                            placeholder='Last Name'
                            name="lastName"
                            value={data.lastName}
                            onChange={onChangeData}
                            className="w-full"
                        />

                    </div>

                    <TextInput
                        type="text"
                        placeholder='Address'
                        name="address"
                        value={data.address}
                        onChange={onChangeData}
                    />

                    <div className="flex w-full flex-col gap-y-3 sm:flex-row gap-x-3">

                        <TextInput
                            type="text"
                            placeholder='City'
                            name="City"
                            value={data.City}
                            onChange={onChangeData}
                            className="w-full"
                        />

                        <TextInput
                            type="text"
                            placeholder='Post Code (optional)'
                            name="postcode"
                            value={data.postcode}
                            onChange={onChangeData}
                            className="w-full"
                        />

                    </div>

                </div>

                {/* shipping */}
                <div className="">

                    <h2 className="subtitle">Shipping method </h2>

                    <div className="flex items-center gap-x-5 border p-3 py-5">

                        <Radio 
                            type="radio"
                            className="flex-shrink"
                            name="shippingMethod"
                            id="niarobi"
                            value={300}
                            onChange={changeShippingMethod}
                        />

                        <div className="flex-1 flex items-center justify-between">

                            <span className="text-sm font-semibold">Nairobi Area</span>

                            <span className="text-sm font-semibold">
                                {(300).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                            </span>

                        </div>

                    </div> 

                    <div className="flex items-center gap-x-5 border p-3 py-5">

                        <Radio 
                            type="radio"
                            className="flex-shrink"
                            name="shippingMethod"
                            id="Kisumu"
                            value={500}
                            onChange={changeShippingMethod}
                        />

                        <div className="flex-1 flex items-center justify-between">

                            <span className="text-sm font-semibold">Kisimu</span>

                            <span className="text-sm font-semibold">
                                {(500).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                            </span>

                        </div>

                    </div> 

                    <div className="flex items-center gap-x-5 border p-3 py-5">

                        <Radio 
                            type="radio"
                            className="flex-shrink"
                            name="shippingMethod"
                            id="Gatundu"
                            value={350}
                            onChange={changeShippingMethod}
                        />

                        <div className="flex-1 flex items-center justify-between">

                            <span className="text-sm font-semibold">Gatundu</span>

                            <span className="text-sm font-semibold">
                                {(350).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                            </span>

                        </div>

                    </div> 

                    <div className="flex items-center gap-x-5 border p-3 py-5">

                        <Radio 
                            type="radio"
                            className="flex-shrink"
                            name="shippingMethod"
                            id="Kisii"
                            value={500}
                            onChange={changeShippingMethod}
                        />

                        <div className="flex-1 flex items-center justify-between">

                            <span className="text-sm font-semibold">Kisii</span>

                            <span className="text-sm font-semibold">
                                {(500).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                            </span>

                        </div>

                    </div> 

                    <div className="flex items-center gap-x-5 border p-3 py-5">

                        <Radio 
                            type="radio"
                            className="flex-shrink"
                            name="shippingMethod"
                            id="Gatundu"
                            value={400}
                            onChange={changeShippingMethod}
                        />

                        <div className="flex-1 flex items-center justify-between">

                            <span className="text-sm font-semibold">Juja</span>

                            <span className="text-sm font-semibold">
                                {(400).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                            </span>

                        </div>

                    </div> 

                </div>

            </div> 

            {/* order summary */}
            <div className="w-full md:w-[45%] md:sticky left-0 top-0">

                <h2 className="subtitle">Order summary</h2>

                <div className="space-y-10 my-10">

                    {products.map((item,index) => {

                        if(cartItems[item._id] > 0)
                        {
                            return(     

                            <div key={index} className="flex justify-between items-start">
                                
                                <div className="flex items-start gap-x-4"> 

                                    <img 
                                        src={item.imageUrls[0]} 
                                        alt="" 
                                        className="h-10 w-20" 
                                    />

                                    <div className="flex flex-col gap-y-1">

                                        <span className="text-xs font-bold text-black dark:text-slate-200">{item.team} {item.season} {item.status}</span>

                                        <span className="text-xs font-bold"> size: {item?.size}</span>

                                        {item.name && <span className="text-xs font-bold">Name:{item.name}</span>}

                                        {item.number && <span className="text-xs font-bold">Number:{item.number}</span>}

                                        <span className="text-xs font-bold text-black dark:text-slate-200">{cartItems[item._id]} X {(item.discountprice).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}</span>

                                    </div>

                                </div>

                                <div className="text-xs font-bold text-black dark:text-slate-200">
                                
                                    {(cartItems[item._id] * item?.discountprice).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}

                                </div>
                                
                            </div>

                            )
                        }

                    })}

                </div>
                
                <hr className="hr2" />
                
                {/* cart total */}
                <div className="flex items-center justify-between ">

                    <span className="text-base font-bold">Cart Total</span>

                    <span className="font-semibold">{(totalAmounts || getTotalCartAmount()).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}</span>

                </div>

                <hr className="hr2" />
                
                {/* delivery */}
                <div className="flex items-center justify-between">

                    <span className="text-base font-bold">Delivery Charges</span>

                    <span className="font-semibold">{(shippingMethod || 0).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}</span>

                </div>

                <hr className="hr2" />
                
                {/* total amount */}
                <div className="flex items-center justify-between">

                    <span className="text-base font-bold">Total</span>

                    <span className="font-semibold">{(TotalAmount).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}</span>

                </div>

                <hr className="hr2" />
                
                {/* method of payment */}
                <div className="my-10">

                    <h2 className="text-xl mb-5 font-semibold">Method of payment</h2>

                    <div className="">

                        {/* stripe */}
                        <div className="flex items-center gap-x-5">

                            <Radio
                                type="radio"
                                name="paymentmethod"
                                value="stripe"
                                onChange={(e) => setPaymentMethod(e.target.value)}    
                            />

                            <Label
                                 value="stripe"
                                 className="text-base capitalize"
                            />

                        </div>

                        {/* mpesa */}
                        <div className="flex items-center gap-x-5">

                            <Radio
                                type="radio"
                                name="paymentmethod"
                                value="mpesa"
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />

                            <Label
                                 value="mpesa"
                                 className="text-base capitalize"
                            />

                        </div>

                        {/* payment after delivery */}
                        <div className="flex items-center gap-x-5">

                            <Radio
                                type="radio"
                                name="paymentmethod"
                                value="payment after delivery"
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />

                            <Label
                                 value="payment after delivery"
                                 className="text-base capitalize"
                            />

                        </div>

                    </div>

                </div>
                
                {/* place order button */}
                <div className="flex items-center justify-center">

                    <Button
                        onClick={placeorder}
                        className="md:w-full w-[70%]"
                        gradientDuoTone="pinkToOrange"
                        disabled={Loading}
                    >
                        {Loading ? 
                            <span className="flex items-center">
                                <Spinner className="mr-3"/> Loading ...
                            </span>
                                :
                            "COMPLETE ORDER"
                        }
                    </Button>

                </div>

            </div>

        </div>

    

    </main>

  )

}
