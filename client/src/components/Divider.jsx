

import React from 'react'

export default function Divider({title,bg}) {

  return (

    <div className="w-full text-center my-3 flex items-center justify-between px-10">

        <span className=" hidden sm:block border w-full"/>

        <span className={`block uppercase w-full text-2xl  md:text-3xl  lg:text-4xl  px-2 ${bg ? bg : "dark:text-slate-200 text-slate-700 "}  font-black`}>{title}</span>

        <span className="hidden sm:block border w-full"/>

    </div>

  )

}
