

import { Drawer, Dropdown, Navbar,Avatar } from 'flowbite-react'
import React from 'react'
import { useState } from 'react'
import {useSelector,useDispatch} from "react-redux"
import DashSidebar from './DashSidebar'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/store'
import {toast} from "sonner"
import {MdClose,MdMenu} from "react-icons/md"
import {FaSun,FaMoon} from "react-icons/fa"
import Logo from './Logo'
import { toggleTheme } from '../redux/theme/themeSlice'
import axios from "axios"
import { signOutSuccess } from '../redux/user/userSlice'

export default function Header() {

    const [isOpen ,setIsOpen] = useState(false)

    const {url} = useContext(StoreContext)

    const {theme} = useSelector(state => state.theme)

    const {currentUser} = useSelector(state => state.user)

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
    <>
        <Navbar className="border-b sticky top-0 z-[100] p-5">

            <div className="">
                {
                    isOpen ? 
                    (
                        <MdClose 
                            className="cursor-pointer md:hidden"
                            size={25}
                            onClick={() => setIsOpen(false)}
                        />
                    )
                    :
                    (
                        <MdMenu 
                            className="font-bold cursor-pointer md:hidden"
                            size={25}
                            onClick={() => setIsOpen(true)}
                        />
                    )
                }
            </div>

            <div className="">

                <Logo/>

            </div>

            <div className="flex items-center gap-x-2 md:order-2">

                <button 
                    className="w-10 h-10 flex items-center justify-center border rounded-full border-gray-300"
                    onClick={() => dispatch(toggleTheme())}
                >

                    {theme === "light"  ? <FaSun/> : <FaMoon/>}

                </button>

                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar
                            alt="user"
                            img={currentUser.profilePicture}
                            rounded
                        />
                    }
                >
                    <Dropdown.Header>

                        <span className="block text-sm">{currentUser.username}</span>

                        <span className="text-sm block font-medium ">{currentUser.email}</span>

                    </Dropdown.Header>

                    <Link to="/profile">

                        <Dropdown.Item>
                            profile
                        </Dropdown.Item>

                    </Link>

                    <Dropdown.Item onClick={handleSignOut}>
                        Sign out
                    </Dropdown.Item>

                </Dropdown>

            </div>

        </Navbar>

        <Drawer
            open={isOpen}
            onClose={() =>setIsOpen(false)}
            className="md:hidden mt-6"
        >
            <Drawer.Header titleIcon={() => <></>}/>

            <Drawer.Items>

                <DashSidebar />

            </Drawer.Items>

        </Drawer>
    </>
  )

}
