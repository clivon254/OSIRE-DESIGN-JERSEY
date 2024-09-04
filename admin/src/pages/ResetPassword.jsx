




import React from 'react'
import Logo from '../components/Logo'
import { useState } from 'react'
import axios from "axios"
import { useContext } from 'react'
import { StoreContext } from '../context/store'
import { Alert, Button, Label, TextInput } from 'flowbite-react'
import { TbCheckbox } from "react-icons/tb"
import { useParams } from 'react-router-dom'

export default function ResetPassword() {

    const [formData, setFormData] = useState({})

    const {url} = useContext(StoreContext)

    const [resetSuccess, setResetSuccess] = useState(null)

    const [resetFailure, setResetFailure] = useState(null)

    const {token} = useParams()

    // handleChange
    const handleChange = (e) => {

        setFormData({...formData,[e.target.name]:e.target.value})

    }

    // handleSubmit
    const handleSubmit = async (e) => {

        e.preventDefault()

        setResetSuccess(null)

        setResetFailure(null)

        try
        {
            const res = await axios.post(url + `/api/auth/reset-password/${token}`,formData)

            if(res.data.success)
            {
                setResetSuccess("password reset successfully ")

                setFormData({})
            }
            else
            {
                setResetFailure("password do not match")
            }

        }
        catch(error)
        {
            console.log(error.message)
        }
    }

    console.log(formData)


  return (

    <div className="w-full h-screen flex flex-col gap-y-10 items-center justify-center bg-white dark:bg-gradient-to-b md:dark:bg-gradient-to-r from-black via-[#071b3e] to-black py-10">

        <div className="">

            <Logo/>

        </div>

        <div className="w-full max-w-md">
            

            <form onSubmit={handleSubmit} className=" flex flex-col gap-y-5 px-10">

                <div className="flex flex-col gap-2">

                    <Label value="password"/>

                    <TextInput 
                        type="password"
                        placeholder="*******"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                </div>

                <div className="flex flex-col gap-2">

                    <Label value="confirm password"/>

                    <TextInput 
                        type="password"
                        placeholder="********"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />

                </div>

                <Button
                    type="submit"
                    gradientDuoTone="pinkToOrange"
                >
                    {
                        resetSuccess ? 
                        (
                            <span className="flex items-center gap-x-2">
                                password reset successfully <TbCheckbox size={20}/>
                            </span>
                        ) : 
                        ("Reset password")                    
                    }
                </Button>

            </form>

            <div className="px-10">

                {resetSuccess && (

                    <Alert color="success" className="my-5">{resetSuccess}</Alert>

                )}

                {resetFailure && (

                    <Alert color="failure" className="my-5">{resetFailure}</Alert>

                )}

            </div>

        </div>

    </div>

  )

}
