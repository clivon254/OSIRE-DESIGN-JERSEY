


import React from 'react'
import { useContext } from 'react'
import { StoreContext } from '../context/store'
import {useDispatch} from "react-redux"
import { signOutSuccess } from '../redux/user/userSlice'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { Sidebar } from 'flowbite-react'
import { HiAdjustments, HiDatabase, HiDocumentAdd, HiLogout, HiViewList } from "react-icons/hi"
import axios from "axios"

export default function DashSidebar() {


    const {url} = useContext(StoreContext)


    const dispatch = useDispatch()

    const navigate = useNavigate()


    // handleSignOut
    const handleSignOut = async () => {

        try
        {
            const res = await axios.post(url + "/api/auth/sign-out")

            if(res.data.success)
            {
                dispatch(signOutSuccess())

                toast.success("you have signout successfully")

                navigate('/sign-in')
            }

        }
        catch(error)
        {
            console.log(error.message)
        }

    }


  return (

    <Sidebar className="w-full h-full">

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

                    <Sidebar.Item
                          icon={HiLogout}
                          as="div"
                          onClick={handleSignOut}
                          className="cursor-pointer"
                    >
                        sign out
                    </Sidebar.Item>

                </div>

            </Sidebar.ItemGroup>

        </Sidebar.Items>

    </Sidebar>

  )

}
