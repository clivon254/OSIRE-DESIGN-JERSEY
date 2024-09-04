

import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios"
import { useContext } from 'react'
import { StoreContext } from '../context/store'
import { Button, Modal, Table } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { toast } from 'sonner'


export default function ListOfProducts() {
  
    const [products, setProducts] = useState([])

    const [showModal , setShowModal] = useState(false)

    const [productIdToDelete, setProductIdToDelete] = useState(null)

    const [loading , setLoading] = useState(false)
    
    const [error , setError] = useState(null)

    const {url} = useContext(StoreContext)


    useEffect(() => {

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

            setError(null)
          }

        }
        catch(error)
        {
          console.log(error.message)

          setError("something went wrong") 
        }

      }

      fetchProducts()

    },[])

    // handleDeleteProduct
    const handleDeleteProduct = async () => {

      try
      {
        const res = await axios.delete(url + `/api/product/delete-product/${productIdToDelete}`)

        if(res.data.success)
        {
          setProducts((prev) => 
            prev.filter((post) => post._id !== productIdToDelete)
          )

          setShowModal(false)

          toast.success('product has been deleted')

        }

      }
      catch(error)
      {
        console.log(error.message)
      }

    }

    return (

    <>

      <div className="p-5">

        

          <h2 className="title">products</h2>

          
            <div className="contain">

              <div className="table-auto overflow-x-scroll md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 ">
                  
                  {products && (

                    <div className="">
                      {
                        products.length > 0 ? 
                          (
                            <div className="">

                              <Table hoverable className="shadow-md">

                                <Table.Head>

                                <Table.HeadCell></Table.HeadCell>

                                  <Table.HeadCell>Image</Table.HeadCell>

                                  <Table.HeadCell>Team</Table.HeadCell>
                                  
                                  <Table.HeadCell>Pice</Table.HeadCell>

                                  <Table.HeadCell>Discount Price</Table.HeadCell>

                                  <Table.HeadCell>Instock</Table.HeadCell>

                                  <Table.HeadCell>actions</Table.HeadCell>

                                </Table.Head>

                                {
                                  products.map((product,index) => (

                                    <Table.Body key={product._id}>

                                      <Table.Row>

                                        <Table.Cell>
                                          {index + 1}.
                                        </Table.Cell>

                                        <Table.Cell>
                                          
                                          <img 
                                            src={product?.imageUrls[0]}
                                            alt="img" 
                                            className="w-20 h-10 bg-amber-100"
                                          />

                                        </Table.Cell>

                                        <Table.Cell>
                                          {product?.team}
                                        </Table.Cell>

                                        <Table.Cell>
                                          {product?.regularprice}
                                        </Table.Cell>

                                        <Table.Cell>
                                          {product?.discountprice}
                                        </Table.Cell>

                                        <Table.Cell>
                                          {product?.instock}
                                        </Table.Cell>

                                        <Table.Cell>
                                          
                                          <div className="flex items-center gap-x-3">

                                            <Link to={`/product-details/${product._id}`}>

                                              <FaEye 
                                                className=""
                                                size={20}
                                              />

                                            </Link>

                                            <Link to={`/edit-product/${product._id}`}>

                                              <FaEdit 
                                                size={20}
                                                className="text-blue-500"
                                              />
                                              
                                            </Link>

                                            <FaTrash 
                                              size={20}
                                              onClick={() => {setShowModal(true); setProductIdToDelete(product._id)}}
                                              className="text-red-500 cursor-pointer"
                                            />

                                          </div>

                                        </Table.Cell>

                                      </Table.Row>

                                    </Table.Body>

                                  ))
                                }

                              </Table>

                            </div>
                          )
                          : 
                          (
                            <p className="text-xl text-center my-2">No products yet</p>
                          )
                      }
                    </div>

                  )}

                  {loading && (
                      
                      <div className="space-y-10">

                          <div class="border border-gray-100 shadow rounded-md p-4  w-full mx-auto">
                        
                              <div class="animate-pulse flex space-x-4">

                                <div class="rounded-full bg-slate-300 h-10 w-10"></div>

                                <div class="flex-1 space-y-6 py-1">
                                  <div class="h-2 bg-slate-300 rounded"></div>
                                  <div class="space-y-3">
                                    <div class="grid grid-cols-3 gap-4">
                                      <div class="h-2 bg-slate-300 rounded col-span-2"></div>
                                      <div class="h-2 bg-slate-300 rounded col-span-1"></div>
                                    </div>
                                    <div class="h-2 bg-slate-300 rounded"></div>
                                  </div>
                                </div>

                              </div>

                          </div>

                          <div class="border border-gray-100 shadow rounded-md p-4  w-full mx-auto">
                        
                            <div class="animate-pulse flex space-x-4">

                              <div class="rounded-full bg-slate-300 h-10 w-10"></div>

                              <div class="flex-1 space-y-6 py-1">
                                <div class="h-2 bg-slate-300 rounded"></div>
                                <div class="space-y-3">
                                  <div class="grid grid-cols-3 gap-4">
                                    <div class="h-2 bg-slate-300 rounded col-span-2"></div>
                                    <div class="h-2 bg-slate-300 rounded col-span-1"></div>
                                  </div>
                                  <div class="h-2 bg-slate-300 rounded"></div>
                                </div>
                              </div>

                            </div>

                          </div>

                          <div class="border border-gray-100 shadow rounded-md p-4  w-full mx-auto">
                        
                            <div class="animate-pulse flex space-x-4">

                              <div class="rounded-full bg-slate-300 h-10 w-10"></div>

                              <div class="flex-1 space-y-6 py-1">
                                <div class="h-2 bg-slate-300 rounded"></div>
                                <div class="space-y-3">
                                  <div class="grid grid-cols-3 gap-4">
                                    <div class="h-2 bg-slate-300 rounded col-span-2"></div>
                                    <div class="h-2 bg-slate-300 rounded col-span-1"></div>
                                  </div>
                                  <div class="h-2 bg-slate-300 rounded"></div>
                                </div>
                              </div>

                            </div>

                          </div>

                          <div class="border border-gray-100 shadow rounded-md p-4  w-full mx-auto">
                        
                            <div class="animate-pulse flex space-x-4">

                              <div class="rounded-full bg-slate-300 h-10 w-10"></div>

                              <div class="flex-1 space-y-6 py-1">
                                <div class="h-2 bg-slate-300 rounded"></div>
                                <div class="space-y-3">
                                  <div class="grid grid-cols-3 gap-4">
                                    <div class="h-2 bg-slate-700 rounded col-span-2"></div>
                                    <div class="h-2 bg-slate-700 rounded col-span-1"></div>
                                  </div>
                                  <div class="h-2 bg-slate-700 rounded"></div>
                                </div>
                              </div>

                            </div>

                          </div>

                      </div>

                  )}

                  {error && (
            
                     <p className="">Something went wrong</p>

                   )}

              </div>

            </div>

        </div>
      

        

      <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
          className="mt-20 md:mt-0"
        >
          <Modal.Header/>

          <Modal.Body>

              <div className="text-center">

                <HiOutlineExclamationCircle size={30} className="mx-auto text-gray-400 dark:text-gray-200 mb-4"/>

                <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete the product ?
                </h3>

                <div className="flex justify-center gap-4">

                  <Button 
                    gradientMonochrome="success"
                    onClick={() => handleDeleteProduct()}
                  >
                    Yes, I'm Sure
                  </Button>

                  <Button 
                    gradientMonochrome="failure"
                    onClick={() => setShowModal(false)}
                  >
                    No, cancel
                  </Button>

                </div>

              </div>

          </Modal.Body>

      </Modal>

      </>

  )
  
}
