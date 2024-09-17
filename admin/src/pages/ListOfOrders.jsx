


import { Table ,Select} from 'flowbite-react'
import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import axios from "axios"
import {FaCheck } from "react-icons/fa"
import {MdClose} from "react-icons/md"
import {toast} from "sonner"


export default function ListOfOrders() {

  const {orders,url,fetchOrders} = useContext(StoreContext)

  // statusHandler
  const statusHandler = async (event,orderId) => {

    try
    {
      const res = await axios.put(url + "/api/order/update-status",{orderId, status:event.target.value})

      if(res.data.success)
      {
          fetchOrders()

          toast.success("updated successfully")
      }

    }
    catch(error)
    {
      console.log(error.message)
    }

  }

  return (

    <main className="p-5 max-w-4xl mx-auto">

      <h2 className="subtitle text-center">Orders</h2>

      <div className=" table-auto overflow-x-scroll md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">

        <Table>

          <Table.Head>

            <Table.HeadCell></Table.HeadCell>

            <Table.HeadCell>items</Table.HeadCell>

            <Table.HeadCell>no items</Table.HeadCell>

            <Table.HeadCell>Amount</Table.HeadCell>

            <Table.HeadCell>Address</Table.HeadCell>

            <Table.HeadCell>Payment Method</Table.HeadCell>

            <Table.HeadCell>paid</Table.HeadCell>

            <Table.HeadCell>status</Table.HeadCell>

          </Table.Head>

          {
            orders.map((order,index) => (

              <Table.Body key={index} className="">

                <Table.Row>

                  <Table.Cell>{index + 1}</Table.Cell>

                  <Table.Cell>

                    <div className="">
                      {order.items.map((item,index) => {

                        if(index === order.items.length-1)
                        {
                          return <span className="block text-xs font-semibold whitespace-nowrap">{item.team} x {item.quantity}</span>
                        }
                        else
                        {
                          return <span className="block text-xs font-semibold whitespace-nowrap">{item.team} x {item.quantity},</span>
                        }
                      })}
                    </div>

                  </Table.Cell>

                  <Table.Cell>
                    {order.items.length}
                  </Table.Cell>

                  <Table.Cell>
                    {order.amount.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                  </Table.Cell>

                  <Table.Cell>
                    <div className="">

                      <span className="block text-xs">{`${order.address.firstName} ${order.address.lastName}`}</span>
                      
                      <span className="block text-xs">{order.address.city} </span>
                      
                      <span className="block text-xs">{order.address.address}</span>

                      <span className="block text-xs font-bold">{order.address.phone}</span>

                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    {order.paymentmethod}
                  </Table.Cell>

                  <Table.Cell>
                    {order.payment ? 
                      (
                        <FaCheck size={20} className="text-green-500"/>
                      ) 
                      : 
                      (
                        <MdClose size={20} className="text-red-500"/>
                      )
                    }
                  </Table.Cell>

                  <Table.Cell>

                      <Select
                        name="status"
                        value={order.status}
                        onChange={(event) => statusHandler(event,order._id)}
                        className="whitespace-nowrap w-32"
                      >

                        <option value="order processing">order processing</option>

                        <option value="out for delivery">out for delivery</option>

                        <option value="Delivered">Delivered</option>

                      </Select>

                  </Table.Cell>

                </Table.Row>

              </Table.Body>

            ))
          }

        </Table>

      </div>

    </main>

  )
  
}
