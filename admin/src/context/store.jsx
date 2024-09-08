import axios from "axios"
import { createContext, useEffect, useState } from "react"


export const StoreContext = createContext(null)

export default function StoreContextProvider(props)
{   
    

    const url = "http://localhost:700"


    const contextValue = {
        url,
    }

    return(

        <StoreContext.Provider value={contextValue}>

            {props.children}

        </StoreContext.Provider>
    )
}