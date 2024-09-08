

import { Button, Label, Select, Spinner, TextInput } from 'flowbite-react'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from "axios"
import { useContext } from 'react'
import { StoreContext } from '../context/store'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Reveiw from '../components/Reveiw'
import SlideProducts from '../components/SlideProducts'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'

export default function ProductDetail() {

  const {currentUser} = useSelector(state => state.user)

  const params = useParams()

  const [loading ,setLoading] = useState(false)

  const [error,setError] = useState(null)

  const [product,setProduct] = useState({})

  const {url,cartItems,setCartItems} = useContext(StoreContext)

  const [formData ,setFormData] = useState({
    userId:currentUser._id,
    itemId:params.productId
  })

  const [reveiws, setReveiws] = useState([])

  const [relatedProducts, setRelatedProducts] = useState([])

  
  useEffect(() => {

    if(params.productId)
    {
      window.scrollTo({top:0 ,left:0 ,behavior:"smooth"})
    }

     // fetchProduct
     const fetchProduct = async () => {

      try
      {
        setLoading(true)

        setError(null)

        const res = await axios.get( url + `/api/product/get-product/${params.productId}`)

        if(res.data.success)
        {
          setProduct(res.data.product)

          setLoading(false)

          setError(null)
        }

      }
      catch(error)
      {
        console.log(error.message)

        setError("something went wrong")
      }

     }

     // fetchRelatedProducts
     const fetchRelatedProducts = async () => {

      try
      {
        setLoading(true)

        setError(null)

        const res = await axios.get( url + `/api/product/get-products?league=${product.league}`)

        if(res.data.success)
        {
          setRelatedProducts(res.data.products)

          setLoading(false)

          setError(null)
        }
        else
        {
          console.log("check the api")
        }

      }
      catch(error)
      {
        console.log(error.message)

        setError("something went wrong")
      }

     }

    //  fetchReveiw
    const fetchReveiw = async () => {

  
      try
      {
        const res = await axios.get(url + `/api/reveiw/get-reveiws/${params.productId}`)

        if(res.data.success)
        {
          setReveiws(res.data.reveiws)
        }

      }
      catch(error)
      {
        console.log(error.message)
      }

    }


    fetchReveiw()

    fetchProduct()

    if(product.league)
    {
       fetchRelatedProducts()
    }
   

  },[params.productId,product.league])



  // handleChange
  const handleChange = (e) => {

    setFormData({...formData,[e.target.name]:e.target.value})

  }

  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()
    
    let itemId = params.productId

    try
    {
      console.log("am working")

       const res = await axios.post( url + "/api/cart/add-cart",formData)

       if(res.data.success)
       {
          // if(!cartItems[itemId])
          // {
          //   setCartItems((prev) => ({...prev,[itemId]:1}))

          //   toast.success('product added to cart')
          // }
          // else
          // {
          //   toast.success('product already added to cart')
          // }
          toast.success('product added to cart')

          setFormData({})
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



  return (

    <main className="p-5 w-full">

      {loading && (

        <p className="text-center text-2xl">

          <Spinner /> Loading ....

        </p>

      )}

      {error && (

          <p className="">Something went wrong</p>

      )}

      {product && (

        <div className="contain">
          
          {/*  product*/}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-10">

            {/* right */}
            <div className="">

              <div className="text-white w-full max-w-[1360px] mx-auto sticky top-[50px]">

                <Carousel
                  infiniteLoop={true}
                  showIndicators={false}
                  showStatus={false}
                  thumbWidth={80}
                  className="productCarousel "
                >
                  {
                    product?.imageUrls?.map((image,index) => (

                      <img 
                        src={image} 
                        alt={`image ${index + 1}`}
                        className="bg-black/10" 
                      />

                    ))
                  }
                </Carousel>

              </div>

            </div>

            {/* left */}
            <div className="space-y-8">

              {/* breadcrum */}
              <div className="text-sm capitalize text-gray-400 dark:text-gray-500 font-normal">

                <Link to="/" className="">HOME</Link> / 
                <Link to="">{product.league}</Link> / 
                <Link to="">{product.team}</Link>

              </div>

              {/* title */}
              <div className="">
                
                <h3 className="text-3xl lg:text-4xl font-semibold text-gray-600">{product.team} {product.season} {product.status}</h3>

              </div>
              
              {/* prices */}
              <div className="flex items-center gap-x-3 text-2xl font-semibold">

                <span className="line-through text-gray-400">
                  {product?.regularprice?.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                </span>

                <span className="text-black">
                  {product?.discountprice?.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                </span>

              </div>

              {/* size chart */}
              <div className="">

                <span className="bg-green-400 text-white font-bold text-xs py-2 px-3 rounded-full">
                  SIZE CHART
                </span>

              </div>

              <form  onSubmit={handleSubmit} className="w-full space-y-5">
                
                {/* size */}
                <div className="flex items-center w-full gap-x-5 justify-between">

                  <Label value="size"/>

                  <Select
                     className="w-full"
                     name="size"
                     value={formData.size}
                     onChange={handleChange}
                     required
                  >

                    <option value="">Choose an option</option>

                    <option value="S">S</option>

                    <option value="M">M</option>

                    <option value="L">L</option>

                    <option value="XL">XL</option>

                    <option value="XXL">XXL</option>

                    <option value="XXL">XXL</option>

                  </Select>

                </div>
                
                {/* name */}
                <div className="flex flex-col gap-y-2">

                  <h3 className="text-base font-semibold">Name <span className="text-xs text-gray-400"> +{(200).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}</span></h3>

                  <TextInput 
                      className="w-full"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                  />

                </div>
                
                {/* number */}
                <div className="flex flex-col gap-y-2">

                  <h3 className="text-base font-semibold">Number
                    <span className="text-xs text-gray-400"> +{(200).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}</span>
                  </h3>

                  <TextInput 
                      className="w-full"
                      type="number"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                  />

                </div>
                
                {/* buttons */}
                <div className="flex flex-col lg:flex-row gap-x-5 gap-y-3 w-full">

                    <Button
                      gradientDuoTone="pinkToOrange"
                      className="w-full"
                      type='submit'
                    >
                      Add to Cart
                    </Button>

                    <Button
                      type="button"
                      className="w-full"
                      gradientDuoTone="greenToBlue"
                    >
                      CheckOut
                    </Button>

                </div>

              </form>

            </div>

          </div>

        
          {/* others */}
          <div className=" w-full py-10">
              
            <hr className="hr" />

            {/* description */}
            <div className=" mx-auto space-y-5">
                
              <h2 className="text-center text-red-500">Team: {product.team}</h2>

              <h2 className="text-center text-2xl text-slate-700 font-semibold">
                  Now on Sale at Only
                <span className="ml-4 text-3xl text-red-500 italic">
                  {product?.discountprice?.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                </span>
              </h2>
              
              <p className="max-w-xl mx-auto text-red-500">
                Highly breathable fabric helps keep sweat off your skin,so you stay cool and comfortable on the pitch or in the stands.
                This product is made from 100% recycled polyester fabric
              </p>
              
              <ul className="list-disc  max-w-xl mx-auto text-red-500">

                <li className="">slim fit,easy feel</li>

                <li className="">Dri-Fit Technology helps keep you dry and comfortable</li>

                <li className="">Lightweight Breath fabric hepls you  stay cool</li>

                <li className="">Raglan sleeves allow natural range of motion</li>

                <li className="">Fabric : 100% polyester</li>

                <li className="">Wash with hands in warm water</li>

                <li className="">Imported</li>

              </ul>

              <p className="text-red-500  mx-auto max-w-xl">
                <span className="text-red-600 font-bold">Shipping time :</span>Your order will be send within 3 business days
                . The total estimate is 5-25 business days. We will send the tracking number and photos of jersey to you via email when ship out your order.
              </p>

              <p className="text-red-500  mx-auto max-w-xl">
                If you have any other questions, please contact us and we will do iur best to help you out
              </p>

            </div>

            <hr className="hr" />

            {/* size*/}
            <div className="space-y-5">

              <h2 className="text-xl font-semibold">ADDITIONAL INFORMATION</h2>

                <p className="flex gap-x-10">

                  <span className="text-base text-red-600 font-semibold">SIZE</span>

                  <span className="">S , M ,L , XL , XXL ,3XL</span>

                </p>

            </div>

            <hr className="hr" />
            
            {/* reviews */}
            <Reveiw 
              reveiws={reveiws}
              productId={params.productId}
            />

            {/* Related products */}
            <div className="">

              <h2 className="subtitle">Related products</h2>
              
              <SlideProducts products={relatedProducts}/>

            </div>

          </div>

        </div>

      )}

    </main>

  )
  
}
