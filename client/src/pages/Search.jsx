

import axios from 'axios'
import React, { useEffect ,useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ItemCard from '../components/ItemCard'
import { Button, Label, Select, TextInput } from 'flowbite-react'

export default function Search() {

  const [sidebarData, setSidebarData] = useState({
    searchTerm:'',
    sort:'desc',
    season:"",
    tag:'',
    status:'',
    league:''
  })

  const [loading, setLoading] = useState(false)

  const [products, setProducts] = useState([])

  const location = useLocation()

  const navigate = useNavigate()

    useEffect(() => {

      const urlParams = new URLSearchParams(location.search)

      const searchTermFromUrl = urlParams.get('searchTerm')

      const sortFromUrl = urlParams.get('sort')

      const leagueFromUrl = urlParams.get('league')

      const statusFromUrl = urlParams.get('status')

      const tagFromUrl = urlParams.get('tag')

      if(searchTermFromUrl || sortFromUrl || statusFromUrl || leagueFromUrl || tagFromUrl )
      {
          setSidebarData({
            ...sidebarData,
            searchTermFromUrl:searchTermFromUrl,
            sort:sortFromUrl,
            status:statusFromUrl,
            tag:tagFromUrl
          })
      }
      
      const fetProducts = async () => {

        setLoading(true)

        const searchQuery = urlParams.toString() ;

        const res = await axios.get(url + `/api/product/get-products?${searchQuery}`)

        if(res.data.success)
        {
            setProducts(res.data.products)

            setLoading(false)
        }

      } 
      
    },[location.search]) 


    // handleChange
    const handleChange = (e) => {

      if(e.target.name === 'searchTerm')
      {
        setSidebarData({...sidebarData, searchTerm:e.target.value})
      }

      if(e.target.name === 'sort')
      {
        setSidebarData({...sidebarData, sort:e.target.value})
      }

      if(e.target.name === 'tag')
      {
        setSidebarData({...sidebarData, tag:e.target.value})
      }

      if(e.target.name === 'season')
      {
        setSidebarData({...sidebarData, season:e.target.value})
      }

      if(e.target.name === 'status')
      {
        setSidebarData({...sidebarData, status:e.target.value})
      }

    }

    // handleSubmit
    const handelSubmit = (e) => {

      e.preventDefault()

      const urlParams = new URLSearchParams(location.search)

      urlParams.set('searchTerm', sidebarData.searchTerm)

      urlParams.set('sort', sidebarData.sort)

      urlParams.set('league', sidebarData.league)

      urlParams.set('season', sidebarData.season)

      urlParams.set('tag', sidebarData.tag)

      const searchQuery = urlParams.toString()

      navigate(`/search?${searchQuery}`)
      
    }

  return (

    <div className="flex flex-col md:flex-row">

        <div className=" px-5 border-b md:border-r md:min-h-screen border-gray-500">

            <form action="" className="md:flex md:flex-col md:gap-y-5 mx-auto grid grid-cols-2">

              <div className="flex flex-col md:flex-row p-2  md:items-center gap-2">

                <Label value="Search Term"/> 

                <TextInput 
                  placeholder='Search ...'
                  name="searchTerm"
                  type="text"
                  value={sidebarData.searchTerm}
                  onChange={handleChange}
                />

              </div>

              <div className="flex flex-col md:flex-row p-2  md:items-center gap-2">

                <Label value="season"/>

                <Select
                  value={sidebarData.season}
                  onChange={handleChange}
                  name="season"
                >

                  <option value="2024/2025">2024/2025</option>

                  <option value="2023/2024">2023/2024</option>

                  <option value="2022/2023">2022/2023</option>

                </Select>

              </div>

              <div className="flex flex-col md:flex-row p-2  md:items-center gap-2">

                <Label value="status"/>

                <Select
                  value={sidebarData.status}
                  onChange={handleChange}
                  name="status"
                >

                  <option value="HOME">HOME</option>

                  <option value="AWAY">AWAY</option>

                  <option value="THIRD KIT">THIRD KIT</option>

                </Select>

              </div>

              <div className="flex flex-col md:flex-row p-2  md:items-center gap-2">

                <Label value="tag"/>

                <Select
                  value={sidebarData.tag}
                  onChange={handleChange}
                  name="tag"
                >

                  <option value="AUTHENTIC">AUTHENTIC</option>

                  <option value="RETRO">RETRO</option>

                  <option value="KIDS">KIDS</option>

                </Select>

              </div>

              <div className="flex flex-col md:flex-row p-2  md:items-center gap-2">

                <Label value="sort"/>

                <Select
                  value={sidebarData.sort}
                  onChange={handleChange}
                  name="sort"
                >

                  <option value="desc">Latest</option>

                  <option value="asc">Oldest</option>

                </Select>

              </div>

              <div className="flex justify-center items-center">

                <Button
                  type="submit"
                  gradientDuoTone="pinkToOrange"
                  className
                >
                  Apply filters
                </Button>

              </div>
            </form>

        </div>

        <div className="w-full">

          <h1 className="text-3xl font-semibold ">
            Product results:
          </h1>

          
          {!loading && products.length === 0 && (

              <p className="text-xl text-gray-500">
                No product found
              </p>

           )}

           {loading && <p className="text-xl text-gray-500"> Loading .....</p>}

           {!loading && 
              products &&
              products?.map((product) => 
                
                <ItemCard product={product}/>

            )}

        </div>

    </div>

  )
  
}
