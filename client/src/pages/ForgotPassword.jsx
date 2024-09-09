

import React from 'react'
import Logo from '../components/Logo'
import { useState } from 'react'
import axios from "axios"
import { useContext } from 'react'
import { StoreContext } from '../context/store'
import { Alert, Button, Label, TextInput } from 'flowbite-react'
import { TbCheckbox } from "react-icons/tb"

export default function ForgotPassword() {

    const [formData, setFormData] = useState({})

    const {url} = useContext(StoreContext)

    const [emailSuccess, setEmailSuccess] = useState(null)

    const [emailFailure, setEmailFailure] = useState(null)

    // handleChange
    const handleChange = (e) => {

        setFormData({...formData,[e.target.name]:e.target.value})

    }

    // handleSubmit
    const handleSubmit = async (e) => {

        e.preventDefault()

        setEmailSuccess(null)

        setEmailFailure(null)

        try
        {
            const res = await axios.post(url + "/api/auth/forgot-password",formData)

            if(res.data.success)
            {
                setEmailSuccess("Link sent to email")
            }
            else
            {
                setEmailFailure("user not found")
            }

        }
        catch(error)
        {
            console.log(error.message)
        }
    }


  return (

    <div className="w-full h-screen flex flex-col gap-y-10 items-center justify-center bg-white dark:bg-gradient-to-b md:dark:bg-gradient-to-r from-black via-[#071b3e] to-black py-10">

        <div className="">

            <Logo/>

        </div>

        <div className="w-full max-w-md">
            
            <h2 className="text-center  px-5 text-sm md:text-base">
                Enter your email and a link will be sent to your email account to reset password
            </h2>

            <form onSubmit={handleSubmit} className=" flex flex-col gap-y-5 px-10">

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

                <Button
                    type="submit"
                    gradientDuoTone="pinkToOrange"
                >
                    {
                        emailSuccess ? 
                        (
                            <span className="flex items-center gap-x-2">
                                Email Sent <TbCheckbox size={20}/>
                            </span>
                        ) : 
                        ("send")                    
                    }
                </Button>

            </form>


            <div className="px-10">

                {emailSuccess && (

                    <Alert color="success" className="my-5">{emailSuccess}</Alert>

                )}

                {emailFailure && (

                    <Alert color="failure" className="my-5">{emailFailure}</Alert>

                )}

            </div>

        </div>

    </div>

  )

}
