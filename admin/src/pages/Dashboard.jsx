

import { createContext, useContext, useEffect, useState } from "react"
import React from 'react'
import { StoreContext } from "../context/store"
import axios from "axios"


export default function Dashboard() {

  const {url,products,users} = useContext(StoreContext)

  const admins = users.filter((user) => (user.isAdmin === true))



  return (

    <main className="p-5">

      <div className="contain">

        <h2 className="title">Admin dashboard</h2>

        {/* stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-10">

            <div className="shadow p-3 dark:border border-slate-800 rounded">

              <span className="block text-xl font-semibold">Total Products</span>

              <span className="block font-bold text-2xl">{products.length}</span>
              
            </div>

            <div className="shadow p-3 dark:border border-slate-800 rounded">

              <span className="block text-xl font-semibold">Total Users</span>

              <span className="block font-bold text-2xl">{users.length}</span>
              
            </div>

            <div className="shadow p-3 dark:border border-slate-800 rounded">

              <span className="block text-xl font-semibold">Admins</span>

              <span className="block font-bold text-2xl">{admins.length}</span>
              
            </div>

        </div>

      </div>

    </main>
    
  )

}
