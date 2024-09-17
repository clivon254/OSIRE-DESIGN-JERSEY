

import axios from 'axios'
import React, { useContext, useEffect ,useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ItemCard from '../components/ItemCard'
import { Button, Label, Select, TextInput } from 'flowbite-react'
import { StoreContext } from '../context/store'

export default function Search() {

  const [sidebarData, setSidebarData] = useState({
    searchTerm:'',
    sort:'desc',
    season:"",
    tag:'',
    status:'',
    league:''
  })

  const {url} = useContext(StoreContext)

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
          tag:tagFromUrl,
          league:leagueFromUrl
        })
    }
    
    const fetchProducts = async () => {

      try
      {

        setLoading(true)

        const searchQuery = urlParams.toString() ;

        const res = await axios.get(url + `/api/product/get-products?${searchQuery}`)

        if(res.data.success)
        {
            setProducts(res.data.products)

            setLoading(false)
        }
        else
        {
          setLoading(false)

          console.log(res.data.message)
        }

      }
      catch(error)
      {
        console.error(error.message)

        setLoading(false)
      }

    } 

    fetchProducts()
    
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

      if(e.target.name === 'league')
        {
          setSidebarData({...sidebarData, league:e.target.value})
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

      navigate(`/shop?${searchQuery}`)
      
    }

  return (

    <div className="flex flex-col md:flex-row">

        <div className=" px-5 py-2 border-b md:border-r md:min-h-screen border-gray-500">

            <form  onSubmit={handelSubmit} className="md:flex md:flex-col md:gap-y-5 mx-auto grid grid-cols-2">

              {/* search term */}
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

              {/* season */}
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

                  <option value="2021/2022">2021/2022</option>

                  <option value="2020/201">2020/201</option>

                  <option value="2019/2020">2019/2020</option>

                  <option value="2018/2019">2018/2019</option>

                  <option value="2017/2018">2017/2018</option>

                  <option value="2022/2023">2022/2023</option>

                  <option value="2022/2023">2022/2023</option>

                  <option value="2022/2023">2022/2023</option>

                  <option value="2007/2008">2007/2008</option>

                </Select>

              </div>

               {/*status  */}
              <div className="flex flex-col md:flex-row p-2  md:items-center gap-2">

                <Label value="status"/>

                <Select
                  value={sidebarData.status}
                  onChange={handleChange}
                  name="status"
                >
                  <option value=""></option>

                  <option value="HOME">HOME</option>

                  <option value="AWAY">AWAY</option>

                  <option value="THIRD KIT">THIRD KIT</option>

                </Select>

              </div>

              {/* league */}
              <div className="flex flex-col md:flex-row p-2  md:items-center gap-2">

                <Label value="League"/>

                <Select
                  value={sidebarData.league}
                  onChange={handleChange}
                  name="league"
                >
                    
                  <option value="choose a league">choose a league</option>

                  <option value="PREMIER LEAGUE">PREMIER LEAGUE</option>

                  <option value="LALIGA">LALIGA</option>

                  <option value="SERIE A">SERIE A</option>

                  <option value="BUNDESLIGA">BUNDESLIGA</option>

                </Select>

              </div>
              
              {/* tag */}
              <div className="flex flex-col md:flex-row p-2  md:items-center gap-2">

                <Label value="tag"/>

                <Select
                  value={sidebarData.tag}
                  onChange={handleChange}
                  name="tag"
                >

                  <option value="AUTHENTIC">Authentic</option>

                  <option value="RETRO">Retro</option>

                  <option value="KIDS">Kids</option>

                </Select>

              </div>

              {/* sort */}
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

              <div className="ml-3">

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

        <div className="w-full px-5 py-2">

          <h1 className="text-3xl font-semibold mb-7">
            Product results:
          </h1>

          
          {!loading && products.length === 0 && (

              <p className="text-xl text-gray-500">
                No product found
              </p>

           )}

           {loading && <p className="text-xl text-gray-500"> Loading .....</p>}
           
           <div className="grid grid-cols-2 md:grid-cols-3  xl:grid-cols-4  gap-x-6 gap-y-5">
           {!loading && 
              products &&
              products?.map((product) => 
                
                <ItemCard product={product}/>

            )}
           </div>

        </div>

    </div>

  )
  
}
