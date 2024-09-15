

import {TextInput,Label,Button,Table} from "flowbite-react"
import React from 'react'
import { useState } from "react"
import axios from "axios"
import { useContext } from "react"
import { StoreContext } from "../context/store"
import { useEffect } from "react"
import {toast} from "sonner"

export default function Coupon() {

    const {url} = useContext(StoreContext)

    const [data,setData] = useState({})

    const [coupons ,setCoupons] = useState([])

    // handleChangeData
    const handleChangeData = (e) => {

        setData({...data,[e.target.name]:e.target.value})

    }

    // handleSubmitCoupon
    const handleSubmitCoupon = async (e) => {

        e.preventDefault()

        try
        {
            console.log("ok")

            const res = await axios.post(url + "/api/coupon/generate-coupon",data)

            if(res.data.success)
            {
                toast.success("coupon created successfully")
                
                setData({})

                getCoupons()
            }
            else
            {
                console.log(res.data.message)
            }

        }
        catch(error)
        {
            console.log(error.message)
        }
        
    }

    // handleGetCoupons
    const getCoupons = async () => {

        try
        {
            const res = await axios.get( url + "/api/coupon/get-coupons")

            if(res.data.success)
            {
                setCoupons(res.data.coupons)
            }
        }
        catch(error)
        {
            console.log(error.message)
        }

    }

    useEffect(() => {

        getCoupons()

    },[])

    console.log(coupons)

    console.log(data)

  return (

    <main className="px-5 space-y-10 mx-auto max-w-xl">

        {/* generate coupon */}
        <div className="">

            <h2 className="subtitle">Generate coupon</h2>

            <form onSubmit={handleSubmitCoupon} className="space-y-5">

                <div className="">

                    <Label value="Discount"/>

                    <TextInput 
                        type="number"
                        placeholder="percentage %"
                        name="discount"
                        value={data.discount}
                        onChange={handleChangeData}
                     />

                </div>

                <div className="">

                    <Label value="max uses"/>

                    <TextInput 
                        type='number'
                        placeholder=""
                        name="maxUses"
                        value={data.maxUses}
                        onChange={handleChangeData}
                     />

                </div>

                <Button
                    type="submit"
                    gradientDuoTone="purpleToBlue"
                >
                    Submit
                </Button>

            </form>

        </div>

        {/* list of coupons */}
        <div className="contain table-auto overflow-x-scroll md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 ">

            <h2 className="subtitle">coupons</h2>

            <Table>

                <Table.Head>

                    <Table.HeadCell></Table.HeadCell>

                    <Table.HeadCell>code</Table.HeadCell>

                    <Table.HeadCell>discount</Table.HeadCell>

                    <Table.HeadCell>uses</Table.HeadCell>

                    <Table.HeadCell>max uses</Table.HeadCell>

                </Table.Head>

                {coupons.map((coupon,index) => (

                    <Table.Body>

                        <Table.Row>

                            <Table.Cell>{index + 1}.</Table.Cell>

                            <Table.Cell>{coupon.code}</Table.Cell>

                            <Table.Cell>{coupon.discount}%</Table.Cell>

                            <Table.Cell>{coupon.uses}</Table.Cell>

                            <Table.Cell>{coupon.maxUses}</Table.Cell>
                            
                        </Table.Row>

                    </Table.Body>

                ))}
                

            </Table>

        </div>

    </main>

  )

}
