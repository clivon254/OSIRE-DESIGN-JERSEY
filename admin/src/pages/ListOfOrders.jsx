


import { Table ,Select} from 'flowbite-react'
import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import axios from "axios"


export default function ListOfOrders() {

  const {orders,url,fetchOrders} = useContext(StoreContext)

  // statusHandler
  const statusHandler = async (event,orderId) => {

    try
    {
      const res = await axios.post(url + "/api/order/update-status",{orderId,status:event.target.value})

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

      <h2 className="subtitle">Orders</h2>

      <div className=" table-auto overflow-x-scroll md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">

        <Table>

          <Table.Head>

            <Table.HeadCell></Table.HeadCell>

            <Table.HeadCell>items</Table.HeadCell>

            <Table.HeadCell>no items</Table.HeadCell>

            <Table.HeadCell>Amount</Table.HeadCell>

            <Table.HeadCell>Address</Table.HeadCell>

            <Table.HeadCell>status</Table.HeadCell>

          </Table.Head>

          {
            orders.map((order,index) => (

              <Table.Body className="">

                <Table.Row>

                  <Table.Cell>{index + 1}</Table.Cell>

                  <Table.Cell>

                    <div className="">
                      {order.items.map((item,index) => {

                        if(index === order.items.length-1)
                        {
                          return <span className="block text-xs font-semibold">{item.team} x {item.quantity}</span>
                        }
                        else
                        {
                          return <span className="block text-xs font-semibold">{item.team} x {item.quantity},</span>
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

                      <Select
                        name="status"
                        value={order.status}
                        onChange={(event) => statusHandler(event,order._id)}
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
