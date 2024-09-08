

import axios from 'axios'
import React, { useContext, useEffect ,useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/store'
import { Button, Label, Select, Spinner, TextInput } from 'flowbite-react'
import ItemCard from '../components/ItemCard'

export default function Search() {

  const {url} = useContext(StoreContext)

  const [sidebarData ,setSidebarData] = useState({
    searchTerm:'',
    sort:'desc',
    league:'',
    status:'',
    tag:"",
  })

  const [products ,setProducts] = useState([])

  const [loading ,setLoading] = useState(false)

  const location = useLocation()

  const navigate = useNavigate()

  useEffect(() => {

    const urlParams = new URLSearchParams(location.search)

    const searchTermFromUrl = urlParams.get('searchTerm')

    const sortFromUrl = urlParams.get('sort')

    const leagueFromUrl = urlParams.get('league')

    const statusFromUrl = urlParams.get('status')

    const tagFromUrl = urlParams.get('tag')

    if(searchTermFromUrl || sortFromUrl || leagueFromUrl || statusFromUrl || tagFromUrl)
    {
        setSidebarData({
          ...sidebarData,
          searchTerm:searchTermFromUrl,
          sort:sortFromUrl,
          league:leagueFromUrl,
          status:sortFromUrl,
          tag:tagFromUrl,
        })
    }

    const fetchProducts = async () => {

      try
      {
        setLoading(true)
        
        const searchQuery = urlParams.toString()

        const res = await axios.get(url + `/api/product/get-products?${searchQuery}`)
  
        if(res.data.success)
        {
          setLoading(false)
  
          setProducts(products)
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

  const handleSubmit = (e) => {

    e.preventDefault()

    const urlParams = new URLSearchParams(location.search)

    urlParams.set('searchTerm' , sidebarData.searchTerm)

    urlParams.set('league' , sidebarData.league)

    urlParams.set('status' , sidebarData.status)

    urlParams.set('tag' , sidebarData.tag)

    urlParams.set('sort' , sidebarData.sort)

    const searchQuery = urlParams.toString()

   navigate(`/search?${searchQuery}`)

  }

  // handleChange
  const handleChange = (e) => {

    if(e.target.id === 'searchTerm')
    {}

    if(e.target.id === 'status')
    {}

    if(e)
    {}

  }

  console.log(products)

  return (

    <div className="flex flex-col md:flex-row">

      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">

          <div className="flex flex-col gap-2">

            <Label value="search Term"/>

            <TextInput 
               type="text"
               placeholder='search ...'
               id="searchTerm"
               value={sidebarData.searchTerm}
               onChange={handleChange}
            />

          </div>

          <div className="flex flex-col gap-2">

            <Label value="League"/>

            <Select
              onChange={handleChange}
              value={sidebarData.league}
              id='league'
            >

              <option value="LALIGA">LALIGA</option>

              <option value="RETERO">RETERO</option>

              <option value="SERIE A">SERIE A</option>

              <option value="Kids">Kids</option>

            </Select>

          </div>

          <div className="flex flex-col gap-2">

            <Label value="Latest"/>

            <Select
              onChange={handleChange}
              value={sidebarData.sort}
              id='sort'
            >

              <option value="desc">Latest</option>

              <option value="desc">Latest</option>

            </Select>

          </div>

          <div className="flex flex-col gap-2">

            <Label value="Type"/>

            <Select
              onChange={handleChange}
              value={sidebarData.tag}
              id='tag'
            >

              <option value=""></option>

              <option value="authentic">authentic</option>

              <option value="PREMIER LEAGUE">PREMEIR LEAGUE</option>

              <option value="SERIE A">SERIE A</option>

              <option value="BUNDESLIGA">BUNDESLIGA</option>

              <option value="OTHERS">Latest</option>

            </Select>

          </div>

          <div className="flex flex-col gap-2">

            <Label value="status"/>

            <Select
              onChange={handleChange}
              value={sidebarData.status}
              id='status'
            >

              <option value="HOME">HOME</option>

              <option value="AWAY">AWAY</option>

              <option value="THIRD KIT">THIRD KIT</option>

            </Select>

          </div>

          <Button 
            type="submit"
            outline
            gradientDuoTone="purpleToPink"
          >
            Apply Filters
          </Button>

        </form>

      </div>

      <div className="p-2">

        <h1 className="subtitle">Product results :</h1>

        <div className="p-7 flex flex-wrap">

          {!loading && products.length === 0 && (

            <p className="text-xl text-gray-500">No posts found</p>

          )}

          {loading && (

            <p className=""> <Spinner /> Loading ....</p>

          )}

          {!loading &&
            products && 
            products.map((post) => <ItemCard key={post._id} product={post}/>)
          }

        </div>

      </div>

    </div>

  )
  
}
