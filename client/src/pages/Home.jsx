

import React, { useContext } from 'react'
import Divider from '../components/Divider'
import SlideProducts from '../components/SlideProducts'
import { StoreContext } from '../context/store'

export default function Home() {

  const {products} = useContext(StoreContext)

  return (
    
    <main className="">
      
      {/* WEEKLY FEATURED PRODUCTS */}
      <section className="px-5">

        <Divider title="Weekly products" bg="text-red-500"/>
        
        <SlideProducts products={products}/>

      </section>

    </main>

  )

}
