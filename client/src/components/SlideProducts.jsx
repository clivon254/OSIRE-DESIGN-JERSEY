

import React, { useContext,useEffect, useState } from 'react'
// swiper components
import {Swiper, SwiperSlide} from "swiper/react"
// Swiper styles
import "swiper/css"
import {Autoplay,Navigation} from "swiper/modules"
import ItemCard from './ItemCard'
import {FaChevronRight,FaChevronLeft} from "react-icons/fa"
import { StoreContext } from '../context/store'


export default function SlideProducts({products}) {
    
  const [Loadings, setLoadings] = useState([
    {},{},{},{},{},{},{},{},{},{},
  ])

  const {Loading} = useContext(StoreContext)
  

  return (

    <>
        {!Loading && products &&  (

            <div className="">

                    <Swiper
                        className="mySwiper"
                        spaceBetween={10}
                        slidesPerView={2}
                        // loop={true}
                        autoPlay={
                        {
                            delay:2000,
                            disableOnInteraction:false
                        }
                        }
                        modules={[Autoplay,Navigation]}
                        breakpoints={{
                            0: {
                            slidesPerView: 2,
                            spaceBetween:10
                            },
                            640: {
                            slidesPerView:3 ,
                            spaceBetween: 20,
                            },
                            768: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                            },
                            1024: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                            },
                        }} 
                        navigation={{
                        prevEl:'.prev',
                        nextEl:'.next'
                        }}
                    >
                        {products?.map((product,index) => (

                            <SwiperSlide key={index}>

                                <ItemCard  product={product}/>

                            </SwiperSlide>

                        ))}
                    </Swiper>
                    
                {/* navigation btns */}
                
                    {/* <div className="next absolute z-50 -top-16 right-0 h-6 justify-center cursor-pointer">

                        <FaChevronRight className="text-sm font-bold"/>

                    </div> */}

                    {/* <div className="prev absolute z-50 -top-16 right-12 h-6 justify-center cursor-pointer">

                        <FaChevronLeft className="text-sm font-bold"/>

                    </div> */}

                    

            </div>

        )}

        {Loading && (

            <div className="">

                <Swiper
                    className="mySwiper"
                    spaceBetween={10}
                    slidesPerveiw={2}
                    Loop={"true"}
                    autoPlay={
                    {
                        delay:2000,
                        disableOnInteraction:false
                    }
                    }
                    modules={[Autoplay,Navigation]}
                    breakpoints={{
                        0: {
                        slidesPerView: 2,
                        spaceBetween:20
                        },
                        640: {
                        slidesPerView:3 ,
                        spaceBetween: 20,
                        },
                        768: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                        },
                        1024: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                        },
                    }} 
                    navigation={{
                    prevEl:'.prev',
                    nextEl:'.next'
                    }}
                >
                    {Loadings?.map((product,index) => (

                        <SwiperSlide key={index}>

                            <div className="w-full animate-pulse group shadow-md dark:border dark:border-slate-800 flex flex-col gap-y-2 p-2 rounded-md">

                                <div className="w-full h-[100px] relative shadow-md dark:bg-gray-800 rounded-md bg-gray-300"/>

                                <div className="space-y-2">

                                    <span className="block py-3 w-full dark:bg-gray-800 bg-gray-300 rounded-md"/>

                                    <span className="block py-3 w-full dark:bg-gray-800 bg-gray-300 rounded-md"/>

                                </div>

                            </div>

                        </SwiperSlide>

                    ))}
                </Swiper>

            </div>

        )}
    
    </>
  )

}
