

import { Button, ButtonGroup, Table, TextInput , } from 'flowbite-react'
import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/store'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from "axios"
import {toast} from "sonner"
import { MdTag } from 'react-icons/md'
import SlideProducts from '../components/SlideProducts'


export default function Cart() {
   
  const {currentUser} = useSelector(state => state.user)

  const {url,products ,cartItems,setCartItems,getTotalCartAmount} = useContext(StoreContext)
  
  const navigate = useNavigate()

   // increase cart
   const increaseCart = async (itemId) => {
    
    let formData = {
       itemId:itemId,
       userId:currentUser?._id
    }

    try
    {


       const res = await axios.post( url + "/api/cart/increase-cart",formData)

       if(res.data.success)
       {
          if(cartItems[itemId])
          {
            setCartItems((prev) => ({...prev, [itemId]:prev[itemId]+1 }))
          }

       }
       else
       {
        console.log("check the api")
       }

    }
    catch(error)
    {
      console.log(error.message)
    }

   }
   
    // removeCart
    const removeCart = async (itemId) => {
        
        let formData = {
          itemId:itemId,
          userId:currentUser?._id
        }

        try
        {
            const res = await axios.put(url + "/api/cart/remove-cart",formData)

            if(res.data.success)
            {
                setCartItems((prev) => ({...prev, [itemId]:prev[itemId]-1 }))
            }
        }
        catch(error)
        {
            console.log(error.message)
        }

    }

    // apply Coupon
    const applyCoupon = async () => {


    }
  

  return (

    <main className="px-5 py-8">

      {cartItems.length === 0 && (

        <div className="flex flex-col justify-center gap-y-5">

          <p className="text-xl font-semibold">Your cart is empty</p>

          <div className="">

            <Button
              gradientDuoTone="pinkToOrange" 
            >

              <Link to="">
                RETURN TO SHOPPING
              </Link>

            </Button>

          </div>

        </div>

      )}

      <div className="w-full flex flex-col md:flex-row md:divide-x-4 gap-x-10 gap-y-5 ">

        {/* cart table */}
        <div className="md:w-[60%] table-auto overflow-x-scroll md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">

            <Table>

                <Table.Head className="uppercase text-red-600 ">

                  <Table.HeadCell>
                    Product
                  </Table.HeadCell>

                  <Table.HeadCell>
                    description
                  </Table.HeadCell>

                  <Table.HeadCell  className="">
                    price
                  </Table.HeadCell>

                  <Table.HeadCell>
                    quantity
                  </Table.HeadCell>

                  <Table.HeadCell>
                    subtotal
                  </Table.HeadCell>

                </Table.Head>

                {products.map((item,index) => {

                  if(cartItems[item._id] > 0)
                  {
                      return(   

                        <Table.Body key={index}>

                            <Table.Row>

                              <Table.Cell className="flex gap-x-5">
                              
                                <Link to={`/product-details/${item._id}`}>

                                <img 
                                  src={item?.imageUrls[0]}
                                  alt="" 
                                  className="h-20 w-20" 
                                /> 

                                </Link>

                              </Table.Cell>

                              <Table.Cell className="">
                              
                                <div className="flex-col">

                                <span className="block text-xs font-bold text-black">{item?.team} {item?.season} {item?.status}</span>

                                <span className="block text-xs"><b>Size:</b>{item?.size}</span>

                                {item?.name && <span className="block text-xs"><b>Name:</b>{item?.name}</span>}

                                {item?.number && <span className="block text-xs"><b>Number:</b>{item?.number}</span>}

                                </div>

                              </Table.Cell>
                              
                              <Table.Cell className="text-center">

                                <span className="">

                                  {item?.discountprice?.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                              
                                </span>

                              </Table.Cell>

                              <Table.Cell className="">

                              <div className="flex">

                                <span 
                                    onClick={() => increaseCart(item._id)} 
                                    className="border p-1 font-black flex items-center justify-center cursor-pointer"
                                >
                                  +
                                </span>

                                <span className="border p-1 font-black flex items-center justify-center ">{cartItems[item._id]}</span>

                                <span
                                    onClick={() => removeCart(item._id)} 
                                    className="border p-1 font-black flex items-center justify-center cursor-pointer"
                                >
                                  -
                                </span>

                              </div>

                              </Table.Cell>

                              <Table.Cell>
                              {(cartItems[item._id] * item?.discountprice).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                              </Table.Cell>

                            </Table.Row>

                        </Table.Body>
                        
                      )
                  }
                  
                })}

            </Table>

        </div>

        
        <div className="md:w-[40%] space-y-10 px-5">

          <Table>

            <Table.Head>

              <Table.HeadCell className="text-red-600 text-2xl">CART TOTALS</Table.HeadCell>

            </Table.Head>

            <Table.Body>

              <Table.Row>

                <Table.Cell className="font-bold capitalize text-black">subtotals </Table.Cell>

                <Table.Cell className="font-semibold">
                    {(getTotalCartAmount()).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                </Table.Cell>

              </Table.Row>

              <Table.Row>

                <Table.Cell className="font-bold capitalize text-black">Total </Table.Cell>

                <Table.Cell className="font-semibold">
                    {(getTotalCartAmount()).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                </Table.Cell>

              </Table.Row>

              <Table.Row>

                <Table.Cell colSpan={2}>

                  <Button 
                    className="w-full"
                    gradientDuoTone="pinkToOrange"
                    onClick={() => navigate('/check-out')}
                  >

                    PROCEED TO CHECKOUT

                  </Button>
                
                </Table.Cell>

              </Table.Row>

            </Table.Body>

          </Table>
            
          <div className="">

            <h2 className="flex items-center gap-x-5 text-2xl font-semibold "><MdTag/> Coupon</h2>

            <hr className="font-bold my-3 bg-slate-500" />
            
            <div className="space-y-4">

              <TextInput
                type="text"
                placeholder="Enter your coupon code"
                name="coupon"
              />

              <Button
                gradientDuoTone="purpleToBlue"
                outline
                className='w-[70%] md:w-full'
              >
                Apply Coupon
              </Button>
            
            </div>

          </div>

        </div>

      </div>
      
      {/* featured Products */}
      <div className="my-10 space-y-5">

        <h2 className="subtitle">featured products</h2>

        <SlideProducts products={products}/>

      </div>
      
    </main>

  )
  
}
