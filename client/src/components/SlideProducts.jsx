

import React from 'react'
// swiper components
import {Swiper, SwiperSlide} from "swiper/react"
// Swiper styles
import "swiper/css"
import {Autoplay,Navigation} from "swiper/modules"
import ItemCard from './ItemCard'
import {FaChevronRight,FaChevronLeft} from "react-icons/fa"

export default function SlideProducts({products}) {
    

  return (

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

  )

}
