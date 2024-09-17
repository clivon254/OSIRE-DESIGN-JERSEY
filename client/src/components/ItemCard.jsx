
import React, { useContext, useState } from 'react'
import Rating from "react-rating"
import { FaStar } from "react-icons/fa"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/store'
import { MdClose } from 'react-icons/md'

export default function ItemCard({product}) {
    
  const {veiw,close,setClose} = useContext(StoreContext)

  const navigate = useNavigate()

  return (
    <>

        {close && (

            <div className="w-full h-full fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">

                <div className="w-[85%] absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white duration-500 ease-in rounded">

                    <button className="mr-[95%]" onClick={() => setClose(false)}>
                       
                        <MdClose />

                    </button>

                </div>

            </div>

        )}

        <div className=" w-full group shadow-md dark:border dark:border-slate-800 flex flex-col gap-y-1 py-2" >
            
            {/* image */}
            <div className="w-full h-[150px] relative">

                <Link to={`/product-details/${product._id}`}>

                        <img 
                            src={product.imageUrls[0]}
                            alt="" 
                            className="group-hover:opacity-0 w-full h-full" 
                        />

                        <img 
                            src={product.imageUrls[1]}
                            alt="" 
                            className="absolute top-0 left-0  opacity-0 group-hover:opacity-100 w-full h-full" 
                        />

                </Link>

                {/* <div 
                    className="w-full text-center cursor-pointer absolute bg-blue-600 opacity-0 group-hover:opacity-100 bottom-0 left-0 duration-500 ease-in translate-y-0 transition-all py-2"
                    onClick={() => veiw(product)}
                >

                    <span className="font-semibold text-white">QUICK VEIW</span>

                </div> */}

            </div>

            <div className="w-full flex flex-col items-center justify-center ">

                <h2 className="UPPECASE text-xs md:text-sm text-red-600 font-light text-center">{product.team}</h2>

                <h2 className="text-base text-center">{product.team}  {product.season} {product.status}</h2>
                
                <Rating 
                    initialRating={product.rating}
                    emptySymbol={<FaStar className=""/>}
                    fullSymbol={<FaStar className="text-amber-300"/>}
                    readonly
                />


                <h2 className="text-center flex-col flex gap-x-2 ">

                    <span className="line-through text-slate-400 text-xs font-semibold">
                        {product?.regularprice?.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                    </span>

                    <span className="text-black dark:text-white text-sm font-semibold">
                        {product?.discountprice?.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                    </span>

                </h2>

                <span 
                    className=" cursor-pointer border-2 border-blue-700 w-[85%] text-center text-xs md:text-sm py-2 font-semibold text-blue-700" 
                >
                    <Link to={`/product-details/${product._id}`}>
                    SELECT OPTIONS
                    </Link>
                </span>

            </div>

        </div>

    </>

  )
}
