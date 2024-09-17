

import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { deleteUserFailure, deleteUserSuccess, updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice'
import axios from 'axios'
import { StoreContext } from '../context/store'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Alert, Button, Modal, TextInput } from 'flowbite-react'
import {HiOutlineExclamationCircle} from "react-icons/hi"

export default function Profile() {

  const {url} = useContext(StoreContext)

  const {currentUser, error,loading} = useSelector(state => state.user)

  const [imageFile ,setImageFile] = useState(null)

  const [imageFileUrl, setImageFileUrl] = useState(null)

  const [imageFileUploadProgess, setImageFileUploadProgess] = useState(null)

  const [imageFileUploadError, setImageFileUploadError] = useState(null)

  const [imageFileUploading, setImageFileUploading] = useState(false)

  const [updateUserSucces, setUpdateUserSuccess] = useState(null)

  const [updateUserError, setUpdateUserError] = useState(null)
  
  const [formData, setFormData] = useState({
    userId:currentUser?._id
  })

  const [showModal, setShowModal] = useState(false)

  const filePickerRef = useRef()

  const dispatch = useDispatch()

  const handleImageChange = (e) => {

    const file = e.target.files[0]

    if(file)
    {
      setImageFile(file)
      setImageFileUrl(URL.createObjectURL(file))
    }

  }

  useEffect(() => {
    
    if(imageFile)
    {
      UploadImage()
    }

  },[imageFile])

  // uploadimage
  const UploadImage = async () => {

    setImageFileUploading(true)

    setImageFileUploadError(null)

    const storage = getStorage(app)

    const fileName = new Date().getTime() + imageFile.name

    const storageRef  = ref(storage,fileName)

    const uploadTask = uploadBytesResumable(storageRef, imageFile)

    uploadTask.on(
      'state_changed',
      (snapshot) => {

        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100 ;

        setImageFileUploadProgess(progress.toFixed(0))
      },
      (error) => {

        setImageFileUploadError('could not upload (File must be less than 2MB)')

        setImageFileUploadProgess(null)

        setImageFile(null)

        setImageFileUrl(null)

        setImageFileUploading(false)

      },
      () => {

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

            setImageFileUrl(downloadURL)

            setFormData({...formData, profilePicture:downloadURL})

            setImageFileUploading(false)

        })
      }

    )

  }

  // handleChange
  const handleChange =  (e) => {

    setFormData({...formData, [e.target.name]:e.target.value})

  }

  // handleSubmit
  const handleSubmit =  async (e) => {

    e.preventDefault()

    setUpdateUserError(null)

    setUpdateUserSuccess(null)


    if(Object.keys(formData).length === 0)
    {
      setUpdateUserError('No changes made')

      return ;
    }

    if(imageFileUploading)
    {
      setUpdateUserError('Please wait for image to upload')
      return
    }

    try
    {
      dispatch(updateStart())

      const res = await axios.put( url + `/api/user/update-user/${currentUser._id}`,formData)

      if(res.data.success)
      {
        dispatch(updateSuccess(res.data.rest))

        setUpdateUserSuccess("user's profile has been updated successfully")

        setFormData({})
      }
      else
      {
        dispatch(updateFailure(res.data.message))

        setUpdateUserError(res.data.message)
      }

    }
    catch(error)
    {
      dispatch(updateFailure(error.mesage))

      setUpdateUserError(error.message)
    }


  }

  // handleDeleteUser
  const handleDeleteUser =  async () => {

    try
    {
      
      const res = await axios.delete(url + `/api/user/delete-user/${currentUser._id}`,formData)

      if(res.data.success)
      {
        dispatch(deleteUserSuccess(res.data.message))

        setShowModal(false)
      }

    }
    catch(error)
    {
      dispatch(deleteUserFailure(error.message))
    }

  }


  return (

    <div className="max-w-lg mx-auto p-3 w-full">

      <h1 className="my-7 text-center font-semibold text-3xl">
        Profile
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input 
          type="file" 
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />

        <div 
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgess && (

            <CircularProgressbar
              value={imageFileUploadProgess || 0}
              text={`${imageFileUploadProgess}%`}
              strokeWidth={5}
              styles={{
                root:{
                  width:'100%',
                  height:'100%',
                  position:'absolute',
                  top:0,
                  left:0,
                },
                path:{
                  stroke:`rgba(62,152,199,${imageFileUploadProgess/100})`
                }
              }}

            />

          )}

          <img 
              src={imageFileUrl || currentUser?.profilePicture}
              alt="user" 
              className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
                  imageFileUploadProgess && 
                  imageFileUploadProgess < 100 &&
                  'opacity-60'
              }`}
          />

        </div>

        {imageFileUploadError && (

          <Alert color="failure">
            {imageFileUploadError}
          </Alert>

        )}

        <TextInput 
          type="text"
          placeholder='username'
          name="username"
          defaultValue={currentUser?.username}
          onChange={handleChange}
        />

        <TextInput 
          type="text"
          placeholder='email'
          name="email"
          defaultValue={currentUser?.email}
          onChange={handleChange}
        />

        <TextInput 
          type="text"
          placeholder='password'
          name="username"
          onChange={handleChange}
        />

        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          disabled={loading || imageFileUploading}
        >
          {loading ? 'Loading ...' : 'update'}
        </Button>

        <div className="text-red-500 text-center cursor-pointer">

          <span  onClick={() => setShowModal(true)} className="">Delete Account</span>

        </div>

        {updateUserSucces && (
          <Alert color="success" className="mt-5">
            {updateUserSucces}
          </Alert>
        )}

        {updateUserError && (
          <Alert color="failure" className="mt-5">
            {updateUserError}
          </Alert>
        )}

        {error && (
          <Alert color="failure" className="mt-5">
            {error}
          </Alert>
        )}

      </form>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
        className="my-auto"
      >

        <Modal.Header/>

        <Modal.Body>

            <div className="text-center">

              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />

                <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete your account
                </h3>

                <div className="flex justify-center gap-4">

                  <Button onClick={handleDeleteUser} gradientMonochrome="failure">
                    Yes ,I'm sure
                  </Button>

                  <Button onClick={() => setShowModal(false)} gradientMonochrome="success">
                    No, Cancel
                  </Button>

                </div>

            </div>
            
        </Modal.Body>

      </Modal>

    </div>

  )
  
}
