


import React, { useContext, useState } from 'react'
import {useSelector} from "react-redux"
import { Link } from 'react-router-dom'
import Reveiws from './Reveiws'
import { Alert, Button, Select, Textarea } from 'flowbite-react'
import Rating from 'react-rating'
import { FaStar } from "react-icons/fa"
import { StoreContext } from '../context/store'
import {toast} from "sonner"
import axios from "axios"

export default function Reveiw({reveiws,productId}) {

   const {url} = useContext(StoreContext)

   const {currentUser} = useSelector(state => state.user)

   const [error, setError] = useState(null)
    
   const [formData , setFormData] = useState({})

   
    // handleChange
    const handleChange = (e) => {

        setFormData({...formData , [e.target.name]:e.target.value})
    }

    // handleRating
    const handleRating = (rate) => {

        setFormData({...formData , rating:rate})

    }

    // handleSubmit
    const handleSubmit = async (e) => {

        e.preventDefault()

        try
        {
            const res = await axios.post( url + `/api/reveiw/add-reveiw/${productId}`,{formData, userId:currentUser._id})

            if(res.data.success)
            {
                toast.success("reveiw added successfully")
               
                setFormData({})
            }
            else
            {
                setError(res.data.message)
            }

        }
        catch(error)
        {
            console.log(error.message)
        }


    }

  return (

    <div className="">

        <h2 className="">Reveiws ({reveiws.length})</h2>

        {
            currentUser ?
            (
                <div className="flex items-center gap-x-2 my-5 text-gray-500 text-sm">

                    <p className="">Signed in as </p>

                    <img 
                        src={currentUser.profilePicture}
                        alt="" 
                        className="h-5 w-5 object-cover rounded-full" 
                    />

                    <Link 
                        to="/profile"
                        className="text-xs text-amber-500 hover:underline "
                    >
                        @{currentUser.username}
                    </Link>

                </div>
            )
            :
            (
                <div className="text-sm text-teal-500 my-5 flex gap-x-3">
                    You must be signed in to add a revei

                    <Link to="/sign-in" className="text-amber-500 hover:underline">sign in</Link>

                </div>
            )
        }

        {
            currentUser && (

               <form onSubmit={handleSubmit} className="max-w-xl border p-3 rounded-md space-y-5">

                    <div className="flex flex-col gap-2">

                        <Rating 
                            initialRating={formData.rating}
                            emptySymbol={<FaStar className=""/>}
                            fullSymbol={<FaStar className="text-amber-300"/>}
                            onChange={handleRating}
                        />

                        <Textarea
                            name="content"
                            placeholder='Add a reveiw'
                            value={formData.content}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="flex justify-end">

                        <Button
                            type="submit"
                            gradientDuoTone="purpleToBlue"
                            outline
                        >
                            submit
                        </Button>

                    </div>

               </form>

            )
        }

        { error && (
            <Alert color="failure">
                {error}
            </Alert>
        )}
        

        {
            reveiws.length === 0 ? 
            (
                <p className="text-sm my-3">
                    No reveiws yet be first one
                 </p>
            )
            :
            (
                <>

                {
                    reveiws?.map((reveiw) => (

                        <Reveiws 
                            key={reveiw._id}
                            reveiw={reveiw}
                        />
                    ))
                }

                </>
            )
        }

    </div>
  )

}
