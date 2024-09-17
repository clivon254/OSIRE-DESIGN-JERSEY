


import React from 'react'
import { useContext } from 'react'
import { StoreContext } from '../context/store'
import { Link } from 'react-router-dom'
import { Sidebar } from 'flowbite-react'
import { HiAdjustments, HiDatabase, HiDocumentAdd, HiLogout, HiViewList } from "react-icons/hi"
import axios from "axios"

export default function DashSidebar() {


    const {url} = useContext(StoreContext)

  return (


    <Sidebar className="w-full h-full mt-10">

        <Sidebar.Items>

            <Sidebar.ItemGroup className="">

                <div className="flex flex-col gap-y-2">

                    <Link to="/">

                        <Sidebar.Item
                          icon={HiDatabase}
                          as="div"
                          active={window.location.pathname === "/"}
                        >
                            DashBoard
                        </Sidebar.Item>

                    </Link>

                    <Link to="/list-products">

                        <Sidebar.Item
                          icon={HiViewList}
                          as="div"
                          active={window.location.pathname === "/list-products"}
                        >
                           List of products
                        </Sidebar.Item>

                    </Link>

                    <Link to="/list-orders">

                        <Sidebar.Item
                          icon={HiAdjustments}
                          as="div"
                          active={window.location.pathname === "/list-orders"}
                        >
                            List of orders
                        </Sidebar.Item>

                    </Link>

                    <Link to="/add-product">

                        <Sidebar.Item
                          icon={HiDocumentAdd}
                          as="div"
                          active={window.location.pathname === "/add-product"}
                        >
                            Add product
                        </Sidebar.Item>

                    </Link>

                    <Link to="/coupon">

                        <Sidebar.Item
                          icon={HiDocumentAdd}
                          as="div"
                          active={window.location.pathname === "/coupon"}
                        >
                            coupon
                        </Sidebar.Item>

                    </Link>

                    

                </div>

            </Sidebar.ItemGroup>

        </Sidebar.Items>

    </Sidebar>

  )

}
