

import React from 'react'
import { useContext } from 'react'
import { StoreContext } from '../context/store'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {CircularProgressbar} from "react-circular-progressbar"
import 'react-circular-progressbar/dist/styles.css' 
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from '../firebase'
import axios from "axios"
import { toast } from 'sonner'
import { Alert, Button, FileInput, Label, Select, TextInput } from 'flowbite-react'




export default function AddProduct() {


  const {url} = useContext(StoreContext)

  const [files , setFiles] = useState([])

  const [uploading ,setUploading] = useState(false)

  const [ImageUploadProgress ,setImageUploadProgress] = useState(null)

  const [imageUploadError ,setImageUploadError] = useState(null)

  const [publishError ,setPublishError] = useState(null)

  const [loading ,setLoading] = useState(false)

  const [formData ,setFormData] = useState({
    imageUrls:[]
  })


  const navigate = useNavigate()


  // handleImageSubmit
  const handleImageSubmit = (e) => {

    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
     
      setUploading(true);
      
      setImageUploadError(false);
      
      const promises = [];


      for (let i = 0; i < files.length; i++) {

        promises.push(storageImage(files[i]));

      }

      Promise.all(promises)
        .then((urls) => {

          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });

          setImageUploadError(false);

          setUploading(false);

        })
        .catch((err) => {

          setImageUploadError('Image upload failed (2 mb max per image)');

          setUploading(false);

        });
    } 
    else
    {
      setImageUploadError('You can only upload 6 images per listing');

      setUploading(false);

    }
  };

  // storageImage
  const storageImage = async (file) => {

    return new Promise((resolve, reject) => {
      
      const storage = getStorage(app);
     
      const fileName = new Date().getTime() + file.name;
     
      const storageRef = ref(storage, fileName);
     
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {

          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setImageUploadProgress(progress.toFixed(0))

        },
        (error) => {
          reject(error);
          
        },
        () => {

          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

            resolve(downloadURL);

          });
        }
      );

    });
  };



  // handleRemoveImage
  const handleRemoveImage = (index) => {

    setFormData({
      ...formData,
      imageUrls:formData?.imageUrls.filter((_,i) => i !== index)
    })

  }


  // handleChange
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })

  }


  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    try
    {
        if(formData?.imageUrls?.length < 1)
        {
          return setPublishError("you must upload atleast one image")
        }

        if(formData.regularprice <+ formData.discountprice)
        {
          return setPublishError("Discount must lower than regular price")
        }

        setLoading(true)

        setPublishError(false)

        const res = await axios.post( url + "/api/product/add-product",formData)

        if(res.data.success)
        {
          toast.success(res.data.message)

          setLoading(false)

          navigate(`/product-details/${res.data.product._id}`) 
        }
        else
        {
          setPublishError('something went wrong')

          setLoading(false)
        }

    }
    catch(error)
    {
      console.log(error.message)

      setLoading(false)
    }

  }

  console.log(formData)

  
  return (

   <div className="p-5">

     <div className="contain min-h-screen">

        <h2 className="title">Add Product</h2>

        <form onSubmit={handleSubmit} className="px-5 flex flex-col sm:flex-row gap-10">

          <div className="flex flex-col gap-4 w-full md:w-[60%]">

            {/* team & league */}
            <div className="flex flex-col gap-4 md:flex-row md:justify-between">

              <div className="flex flex-col gap-2 w-full">

                <Label value="Team"/>

                <TextInput
                    type="text"
                    className="w-full"
                    placeholder='team'
                    name="team"
                    value={formData.team}
                    onChange={handleChange}
                />

              </div>

              <div className="flex flex-col gap-2 w-full">

                <Label value="League"/>

                <TextInput
                    type="text"
                    className="w-full"
                    placeholder='league'
                    name="league"
                    value={formData.league}
                    onChange={handleChange}
                />

              </div>

            </div>

            {/* season & status*/}
            <div className="flex flex-col gap-4 md:flex-row md:justify-between w-full">

              <div className="flex flex-col gap-2 w-full">

                <Label value="Season"/>

                <TextInput
                    type="text"
                    placeholder='season'
                    name="season"
                    value={formData.season}
                    onChange={handleChange}
                />

              </div>

               <div className="flex flex-col gap-2 w-full">

                <Label value="status"/>

                <Select
                  value={formData.status}
                  onChange={handleChange}
                  name="status"
                >
                  
                  <option value=""></option>

                  <option value="HOME">HOME</option>

                  <option value="AWAY">AWAY</option>

                  <option value="THIRD KIT">THIRD KIT</option>
                  
                </Select>

              </div>

            </div>

            {/* tag & status instock*/}
            <div className="flex flex-col gap-4 md:flex-row md:justify-between w-full">

              <div className="flex flex-col gap-2 w-full">

                <Label value="Tag"/>

                <Select
                  value={formData.tag}
                  onChange={handleChange}
                  name="tag"
                >

                  <option value=""></option>

                  <option value="selling version">selling version</option>

                  <option value="AUTHENTIC">AUTHENTIC</option>

                  <option value="RETRO">RETRO</option>
                  
                  <option value="KIDS">KIDS</option>
                  
                </Select>

              </div>

              <div className="flex flex-col gap-2 w-full">

                <Label value="Instock"/>

                <TextInput
                    type="number"
                    placeholder='instock'
                    name="instock"
                    value={formData.instock}
                    onChange={handleChange}
                />

              </div>

            </div>

            {/* wholesale & regularprice & discountprice */}
            <div className="flex flex-col gap-4 md:flex-row md:justify-between w-full">

              <div className="flex flex-col gap-2">

                <Label value="Whosale"/>

                <TextInput
                    type="number"
                    placeholder='whole sale'
                    name="wholesale"
                    value={formData.wholesale}
                    onChange={handleChange}
                />

              </div>

              <div className="flex flex-col gap-2">

                <Label value="Regular price"/>

                <TextInput
                    type="number"
                    placeholder='Regular price'
                    name="regularprice"
                    value={formData.regularprice}
                    onChange={handleChange}
                />

              </div>

              <div className="flex flex-col gap-2">

                <Label value="discountprice"/>

                <TextInput
                    type="number"
                    placeholder='Discount price'
                    name="discountprice"
                    value={formData.discountprice}
                    onChange={handleChange}
                />

              </div>

            </div>

          </div>

          {/* images */}
          <div className="flex flex-col gap-4 w-full md:w-[30%]">

            <p className="font-gray">
              Images :
              <span className="font-normal text-gray-600 ml-2">
                The first Image will cover the (max 6)
              </span>

            </p>

            <div className="flex gap-4 justify-between items-center">

              <FileInput 
                type="file"
                name="imageUrls"
                accept="image/*"
                multiple
                onChange={(e) => setFiles(e.target.files)}
              />

              <Button
                type="button"
                disable={uploading || ImageUploadProgress}
                onClick={handleImageSubmit}
                gradientDuoTone="purpleToBlue"
              >
                {
                  ImageUploadProgress ?
                  <div className="w-16 h-16 flex justify-center items-center">

                    <CircularProgressbar
                      value={ImageUploadProgress}
                      text={`${ImageUploadProgress || 0}`}
                    />

                  </div>
                  :
                  'upload'
                }
              </Button>

            </div>

            <p className="text-red-700 text-sm">
              {imageUploadError && (imageUploadError)}
            </p>

            {
              formData?.imageUrls?.length > 0 && 
                formData?.imageUrls?.map((url,index) => (

                  <div 
                    key={url}
                    className="flex justify-between p-3 items-center shadow-md"
                  >
                    <img 
                      src={url}
                      alt="images" 
                      className="w-20 h-20 object-contain rounded-lg" 
                    />

                    <button 
                      className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                      onClick={() => handleRemoveImage(index)}
                    >
                      Delete
                    </button>

                  </div>

                ))
            }

            <Button 
              type="submit"
              disabled={loading || uploading}
              gradientDuoTone="pinkToOrange"
            >
              {loading ? "Adding...." :"Add product"}
            </Button>

            {
              publishError && (
                <Alert color="failure">
                  {publishError}
                </Alert>
              )
            }

          </div>

        </form>

     </div>

   </div>

  )
  
}
