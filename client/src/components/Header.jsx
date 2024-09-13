

import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Logo from './Logo'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaMoon, FaShoppingCart, FaSun } from 'react-icons/fa'
import { toggleTheme } from '../redux/theme/themeSlice'
import { MdClose, MdMenu } from 'react-icons/md'
import { StoreContext } from '../context/store'
import axios from "axios"
import { signOutSuccess } from '../redux/user/userSlice'
import { toast } from 'sonner'


export default function Header() {

  const {cartItems,products,url} = useContext(StoreContext)

  const {currentUser} = useSelector(state => state.user)

  const {theme} = useSelector(state => state.theme)

  const dispatch = useDispatch()

  const [isOpen ,setIsOpen] = useState(false)

  const [isSticky ,setIsSticky] = useState(false)

  const navigate = useNavigate()

   //  ToatalCartItems
   const getTotalCartItems = () => {

    let totalItems = 0;

    for (const item in cartItems) {

      totalItems += cartItems[item]

    }

    return totalItems;

  }

  // hanleSignOut
  const handleSignOut = async () => {

    try
    {
       const res = await axios.post(url + "/api/auth/sign-out")

       if(res.data.success)
       {
          dispatch(signOutSuccess())

          toast.success('you have successfully signed out')
       }

    }
    catch(error)
    {
      console.log(error.message)
    }

  }

  useEffect(() => {
   

    let prevScrollPosition = 0;

    const handleScroll = () => {

        const scrollPosition = window.scrollY;

        const scrollDirection = scrollPosition - prevScrollPosition;

        prevScrollPosition = scrollPosition; // Update prevScrollPosition

        if (scrollDirection < 0 && scrollPosition > 0) {
          setIsSticky(true);
        } else if (scrollDirection > 0) {
          setIsSticky(false);
        }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, []);



  return (

    <Navbar className={`py-5 border-b shadow-md transition duration-500 ease-in-out ${isSticky ? 'sticky top-0' : ''}`}>

      <div className="md:hidden">

        {
          isOpen ?
          <MdClose 
              className="cursor-pointer"
              onClick={() => setIsOpen(true)}
              size={25}
          />
          :
          <MdMenu 
             className="cursor-pointer"
             onClick={() => setIsOpen(false)}
             size={25}
          />
        }
      </div>

      {/* logo */}
      <div className="">
        
        <Link to="/">

            <Logo />

        </Link>

      </div>

      <ul className="text-sm hidden md:flex items-center gap-x-10 font-semibold">

        <NavLink to="/" className={({isActive}) => isActive ? "active-link" :"hover:active-link"}>HOME</NavLink>
        
        <NavLink to="/shop" className={({isActive}) => isActive ? "active-link" :"hover:active-link"}>SHOP</NavLink>

        <NavLink to="/contact" className={({isActive}) => isActive ? "active-link" :"hover:active-link"}>CONTACT</NavLink>

        <NavLink to="/about" className={({isActive}) => isActive ? "active-link" :"hover:active-link"}>ABOUT</NavLink>

      </ul>

      <div className="flex gap-x-4 md:order-2 items-center">

          <button 
            className="hidden w-8 h-8 border rounded-full md:flex items-center justify-center"
            onClick={() => dispatch(toggleTheme())}
           >
            {theme === 'light' ? <FaSun/> : <FaMoon/>}
          </button>

          <div className="relative ">

              <Link to="/cart">

                <FaShoppingCart size={25}/>

                <span className="absolute bottom-[65%] -right-2 w-5 h-5 border border-amber-500 bg-amber-500 text-black rounded-full flex justify-center items-center text-xs font-medium">
                  {getTotalCartItems()}
                </span>

              </Link>

          </div>

        {currentUser ? 
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
              
              <span className="block text-sm font-medium truncate">{currentUser.email}</span>
            
            </Dropdown.Header>

            <Dropdown.Divider/>

            <Link to="/profile">

              <Dropdown.Item>Profile</Dropdown.Item>

            </Link>

            <Link to="/list-orders">

              <Dropdown.Item>My Orders</Dropdown.Item>

            </Link>

            <Dropdown.Item onClick={handleSignOut}>
              Sign out
            </Dropdown.Item>

          </Dropdown> 
            :
          <div className="">

            <Link to="/sign-in">

              <Button 
                  gradientDuoTone="purpleToBlue"
                  outline
              >
                Sign In
              </Button>

            </Link>

          </div>
        }
        

      </div>

    </Navbar>

  )
  
}
