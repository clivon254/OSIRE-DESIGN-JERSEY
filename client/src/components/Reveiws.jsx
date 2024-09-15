
import React from 'react'
import Rating from "react-rating"
import { FaStar } from "react-icons/fa"
import moment from "moment"

export default function Reveiws({reveiw}) {

  return (

    <div className=" flex p-4 text-sm mt-5 border-b border-gray-400 dark:border-gray-700">

        <div className="flex-shrink-0 mr-3">

            <img 
                src={reveiw.userId.profilePicture}
                alt={reveiw.userId.username}
                className="h-10 w-10 rounded-full bg-amber-100" 
            />

        </div>

        <div className="flex-1">

            <div className="">

                <Rating 
                    initialRating={reveiw.rating}
                    emptySymbol={<FaStar className=""/>}
                    fullSymbol={<FaStar className="text-amber-300"/>}
                    readonly
                />

            </div>

            <div className="flex items-center mb-1">

                <span className="font-bold mr-1 text-xs truncate">
                    {reveiw.userId.username}
                </span>

                <span className="text-gray-500 text-xs">
                    {moment(reveiw.createdAt).fromNow()}
                </span>

            </div>

            <p className="text-gray-500 pb-2">
                {reveiw.content}
            </p>

        </div>

    </div>

   )

}
