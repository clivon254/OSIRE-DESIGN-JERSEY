
import { Table } from 'flowbite-react'
import React, { useContext } from 'react'
import { StoreContext } from '../context/store'

export default function ListOfOrders() {

  const {orders} = useContext(StoreContext)

  return (

    <main className="p-5 max-w-4xl mx-auto">

      <h2 className="subtitle text-center">Orders</h2>

      <div className=" table-auto overflow-x-scroll md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">

        <Table striped>

          <Table.Head>

            <Table.HeadCell></Table.HeadCell>

            <Table.HeadCell colSpan={2}>items</Table.HeadCell>

            <Table.HeadCell>Amount</Table.HeadCell>

            <Table.HeadCell>status</Table.HeadCell>

          </Table.Head>

          {
            orders.map((order,index) => (

              <Table.Body className="">

                <Table.Row>

                  <Table.Cell>{index + 1}</Table.Cell>

                  <Table.Cell colSpan={2}>

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
                    {order.amount.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                  </Table.Cell>

                  <Table.Cell>
                    <span className="">
                      &#x25cf; <b className="">{order.status}</b>
                    </span>
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
