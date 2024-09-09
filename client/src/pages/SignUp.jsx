




import {useSelector,useDispatch} from "react-redux"
import React from 'react'
import { useState } from 'react'
import { useContext } from "react"
import { StoreContext } from "../context/store"
import { Link, useNavigate } from "react-router-dom"
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice"
import axios from "axios"
import {toast} from "sonner"
import Logo from "../components/Logo"
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"

export default function SignUp() {

  const [formData ,setFormData] = useState({})

  const {loading, error} = useSelector(state => state.user)

  const {url} = useContext(StoreContext)

  const dispatch = useDispatch()

  const navigate = useNavigate()


  // handleChange
  const handleChange = (e) => {

    const name = e.target.name ;

    const value = e.target.value ;

    setFormData(data => ({...data,[name]:value}))

  }

  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    if(!formData.email || !formData.password || !formData.username)
    {
        return dispatch(signInFailure('please fill all the feilds'))
    }

    try
    {
        dispatch(signInStart())

        const res = await axios.post(url + `/api/auth/sign-in`,formData)

        if(res.data.success)
        {

          toast.success('signed up successfully')

          navigate('/sign-in')
        }
        else
        {
          dispatch(signInFailure(res.data.message))
        }

    }
    catch(error)
    {
      dispatch(signInFailure(error.message))

      console.log(error.message)
    }

  }

  console.log(formData)

  return (

    <div className="w-full h-screen flex">

      <div className="hidden bg:white dark:bg-black md:flex flex-col items-center justify-center gap-y-5 min-h-screen w-1/3 ">

          <Logo />

          <span className="text-2xl lg:text-3xl font-black">
            Welcome back !
          </span>

      </div>

      <div className=" w-full md:w-2/3 h-full flex flex-col items-center justify-center bg-white dark:bg-gradient-to-b md:dark:bg-gradient-to-r from-black via-[#071b3e] to-black px-10 md:px-28">
          
          {/* logo */}
          <div className="md:hidden flex justitify-center ">

            <Logo />

          </div>

          <div className="max-w-md w-full">

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-5">

              <div className="flex flex-col gap-2">

                <Label value="username"/>

                <TextInput 
                  type="text"
                  placeholder="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />

              </div>

              {/* email */}
              <div className="flex flex-col gap-2">

                <Label value="email"/>

                <TextInput 
                  type="email"
                  placeholder="name@gmail.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />

              </div>

              {/* password */}
              <div className="flex flex-col gap-2">

                <Label value="password"/>

                <TextInput 
                  type="password"
                  placeholder="*********"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />

              </div>

              {/* Have an account*/}
              <div className="flex items-center text-xs gap-x-1">

                <span className="">Already have an account?</span>

                <span className="text-xs font-semibold cursor-pointer text-amber-500">
                 
                  <Link to="/sign-in">
                    click here
                  </Link>

                </span>

              </div>

              <Button 
                type="submit"
                gradientDuoTone="pinkToOrange"
                onSubmit={handleSubmit}
                disabled={loading}
              >
                {
                  loading ? 
                  <>
                    <Spinner className="ml-3"/>

                    <span className="">Loading ....</span>
                  </>
                  :
                  "Sign up"
                }
              </Button>

            </form>

            {
              error && (
                <Alert className="mt-5" color="failure">
                  {error}
                </Alert>
              )
            }

          </div>

      </div>

    </div>

  )
  
}
