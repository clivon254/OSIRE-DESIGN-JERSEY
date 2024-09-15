

import { Footer } from 'flowbite-react'
import React from 'react'
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs"
import { Link } from 'react-router-dom'
import Logo from './Logo'


export default function FooterComp() {

  return (

    <Footer className=" border-t-4 border-amber-300 p-4 dark:bg-black">

        <div className="w-full max-w-7xl mx-auto">

            <div className="flex flex-col sm:flex-row sm:items-start gap-x-20 gap-y-5">

                <div className="">

                    <Link to="/">

                        <Logo/>

                    </Link>

                </div>

                <div className=" w-full md:w-[60%] flex items-start justify-between md:justify-around ">

                    <div className="">

                        <Footer.Title title="About"/>

                        <Footer.LinkGroup col>

                            <Footer.Link
                                href="#"
                                target='_blank'
                                rel="noopener noreferrer"
                            >
                                Get to Know us
                            </Footer.Link>

                        </Footer.LinkGroup>

                    </div>

                    <div className="">

                        <Footer.Title title="Follow us"/>

                        <Footer.LinkGroup col>

                            <Footer.Link
                                href="#"
                                target='_blank'
                                rel="noopener noreferrer"
                            >
                               Github
                            </Footer.Link>

                            <Footer.Link href="#" > Discord</Footer.Link>

                        </Footer.LinkGroup>

                    </div>

                    <div className="">

                        <Footer.Title title="Legal"/>

                        <Footer.LinkGroup col> 

                            <Footer.Link href="#" >privacy Policy</Footer.Link>

                            <Footer.Link href="#" >Terms &amp; conditions </Footer.Link>

                        </Footer.LinkGroup>

                    </div>

                </div>

            </div>

            <Footer.Divider/>

            <div className="w-full sm:flex sm:items-center sm:justify-between space-y-4">

                <Footer.Copyright
                    href="#"
                    by="Clivon Osire"
                    year={new Date().getFullYear()}
                />

                <div className="flex gap-x-6 sm:mt-0 sm:justify-center">

                    <Footer.Icon href="#" icon={BsFacebook}/>

                    <Footer.Icon href="#" icon={BsInstagram}/>

                    <Footer.Icon href="#" icon={BsTwitter}/>

                    <Footer.Icon href="#https://github.com/clivon254" icon={BsGithub}/>

                    <Footer.Icon href="#" icon={BsDribbble}/>

                </div>

            </div>

        </div>

    </Footer>

  )

}
