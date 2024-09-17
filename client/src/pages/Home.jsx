

import React, { useContext,useEffect } from 'react'
import Divider from '../components/Divider'
import SlideProducts from '../components/SlideProducts'
import { StoreContext } from '../context/store'
import banner1 from "../assets/banner1.jpeg"
import banner2 from "../assets/banner2.jpeg"



export default function Home() {

  const {products} = useContext(StoreContext)

  // const shuffleArray = (array) => {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1))
  //     [array[i], array[j]] = [array[j], array[i]]
  //   }
  // }

  //  useEffect(() => {
  //     if (products && products.length > 0) {
  //         shuffleArray(products)
  //     }
  //   }, [products]);

  const retroProducts = products.filter(product => product.tag === 'Retro')

  const kidsProducts = products.filter(product => product.tag === 'Kids')

  return (
    
    <main className="h-full w-full">

      {/* BANNER */}
      <div className="h-[60vh] sm:h-[65vh] md:h-[70vh] lg:h-[75vh] w-full">

        <img 
            src={banner1}
           alt="" 
           className="h-full w-full"
        />

      </div>
      
      {/* WEEKLY FEATURED PRODUCTS */}
      <section className="px-5 my-10 space-y-5">

        <Divider title="Weekly FEATURED" bg="text-red-500"/>
        
        <SlideProducts products={products}/>

      </section>


      {/* BEST SELLING PRODUCTS */}
      <section className="px-5 my-10 space-y-5">

        <Divider title="best selling products"/>
        
        <SlideProducts products={products}/>

      </section>


      {/* RETRO */}
      <section className="px-5 my-10 space-y-5">

        <Divider title="RETRO COLLECTION" />
        
        <SlideProducts products={retroProducts}/>

      </section>


      {/* KIDS */}
      <section className="px-5 my-10 space-y-5">

        <Divider title="KIDS COLLECTION" />
        
        <SlideProducts products={kidsProducts}/>

      </section>

      {/* AUTHENTIC PLAYER VERSION */}
      <section className="px-5 my-10 space-y-5">

        <Divider title="AUTHENTIC PLAYER VERSION" />
        
        <SlideProducts products={products}/>

      </section>

    </main>

  )

}
