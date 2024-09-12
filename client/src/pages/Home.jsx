

import React, { useContext } from 'react'
import Divider from '../components/Divider'
import SlideProducts from '../components/SlideProducts'
import { StoreContext } from '../context/store'

export default function Home() {

  const {products} = useContext(StoreContext)

  return (
    
    <main className="">
      
      {/* WEEKLY FEATURED PRODUCTS */}
      <section className="px-5 my-10 space-y-5">

        <Divider title="Weekly products" bg="text-red-500"/>
        
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
        
        <SlideProducts products={products}/>

      </section>


      {/* KIDS */}
      <section className="px-5 my-10 space-y-5">

        <Divider title="KIDS COLLECTION" />
        
        <SlideProducts products={products}/>

      </section>

      {/* AUTHENTIC PLAYER VERSION */}
      <section className="px-5 my-10 space-y-5">

        <Divider title="AUTHENTIC PLAYER VERSION" />
        
        <SlideProducts products={products}/>

      </section>

    </main>

  )

}
