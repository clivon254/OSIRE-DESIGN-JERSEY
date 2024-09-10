

import React from 'react'

export default function Divider({title,bg}) {

  return (

    <div className="w-full text-center my-3 flex items-center justify-between px-10">

        <span className=" hidden sm:block border w-full"/>

        <span className={`block uppercase w-full text-2xl md:text-4xl px-2 ${bg ? bg : "text-slate-200 "} whitespace-nowrap  tracking-wider font-bold`}>{title}</span>

        <span className="hidden sm:block border w-full"/>

    </div>

  )

}
