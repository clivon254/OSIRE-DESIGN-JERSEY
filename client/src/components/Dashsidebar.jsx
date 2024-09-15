


import { Sidebar } from 'flowbite-react'
import React, { useContext } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {toast} from "sonner"
import { signOutSuccess } from '../redux/user/userSlice'
import { FaMoon, FaSun } from 'react-icons/fa'
import {HiLogout} from "react-icons/hi"
import { toggleTheme } from '../redux/theme/themeSlice'


export default function Dashsidebar() {


  const dispatch = useDispatch()

  const {theme} = useSelector(state => state.theme)



  return (

    <Sidebar className="w-full h-full">

      <Sidebar.ItemGroup>

        <div className="flex flex-col">

        <Sidebar.Item
          icon={HiLogout}
          as="div"
          onClick={handleSignOut}
          className="cursor-pointer"
        >
          Sign Out
        </Sidebar.Item>

        <Sidebar.Item>

          <button 
            className="hidden w-8 h-8 border rounded-full md:flex items-center justify-center"
            onClick={() => dispatch(toggleTheme())}
          >
                {theme === 'light' ? <FaSun/> : <FaMoon/>}
          </button>

        </Sidebar.Item>

        </div>

      </Sidebar.ItemGroup>

    </Sidebar>

  )

}
