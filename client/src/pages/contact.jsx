

import React, { useState } from 'react'
import icon1 from "../assets/01.png"
import icon2 from "../assets/02.png"
import icon3 from "../assets/03.png"
import icon4 from "../assets/04.png"
import GoogleMaps from '../components/GoogleMaps'
import { Button, Textarea, TextInput } from 'flowbite-react'


export default function Contact() {

  const contactList = [
    {
      imageUrl:icon1,
      title:"Shop Address",
      desc:"1201 park street, FifthAvenue"
    },
    {
      imageUrl:icon2,
      title:"phone number",
      desc:"+254 708 045 840"
    },
    {
      imageUrl:icon3,
      title:"send email",
      desc:"prestone99@gamil.com"
    },
    {
      imageUrl:icon4,
      title:"Our website",
      desc:"www.OSIREDESIGN.com"
    },
  ]

  const [formData, setFormData] = useState({})

  // handleChange
  const handleChange = () => {

    setFormData({...formData, [e.target.name]:e.target.value})

  }

  // handleSubmit
  const handleSumbit = () => {}
  
  return (

    <div>

      <div className="bg-amber-100 px-5 py-10">

        <div className="">

          <h2 className="subtitle text-center uppercase">Get in touch with us</h2>

          <h2 className="subtitle text-center ">We are always eagar to hear from you</h2>

        </div>

        <div className="w-full">

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-10">

            {/* google Maps */}
            <div className="col-span-2 h-full w-full">

              <GoogleMaps />

            </div>

            <div className="">
              {contactList.map((val,i) => (

                <div key={i} className="flex gap-x-5 mb-5 items-center bg-white p-2">

                  <div className="">

                    <img src={val.imageUrl} alt="" className="" />

                  </div>

                  <div className="">

                    <h6 className="text-xl font-bold">{val.title}</h6>

                    <p className="text-gray-700">{val.desc}</p>

                  </div>

                </div>

              ))}
            </div>

          </div>

        </div>

      </div>

      <div className="px-5">

        {/* form */}
        <div className="w-full py-10 ">

          <div className="max-w-2xl mx-auto">

            <h2 className="subtitle text-center">Contact us</h2>

            <h2 className="subtitle text-center ">Fill the form Below so we can get to know and Your Needs Better</h2>

          </div>

          <form action="" className="space-y-5 max-w-lg mx-auto">

            <TextInput
              placeholder='Your name'
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <TextInput
              placeholder='Your Email'
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <TextInput
              placeholder='Phone Number'
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

              <TextInput
              placeholder='Subject'
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />


            <Textarea
              placeholder='Your Message'
              name="message"
              value={formData.message}
              onChange={handleChange}
            />

            <Button
              type="submit"
              gradientMonochrome="info"
            >
              Send message
            </Button>

          </form>

        </div>

      </div>

    </div>

  )
  
}
