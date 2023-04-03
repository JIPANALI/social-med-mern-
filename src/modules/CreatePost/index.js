import React, { useState } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { set } from 'mongoose'
import {useNavigate} from 'react-router-dom'



// normally we will store imgae in couldury and that will provide the link of the image and that link we will save in the mongoDB
//that  cloudinary img hosting
const CreatePost = () => {

    const [data,setData]=useState({
        caption:'',
        desc:'',
        img:''
    })
const [url, setUrl]=useState('')
const navigate=useNavigate()
    const uploadImage=async()=>{
        const formData=new FormData(); //how to upload to imagecloudinary  this is the way TO UPLOAD
        formData.append('file', data.img);  //where is the image => data.img
        formData.append('upload_preset', 'insta-clone');
        formData.append('cloude_name', 'dlh1mgyvp')

        const res=await fetch(`https://api.cloudinary.com/v1_1/dlh1mgyvp/upload`,
        {
            method:'POST',
            body:formData
        })
        if(res.status===200){
            return await res.json()
        }else{
            return "Error"
        }
  
        
    }
    const handleSubmit= async(e)=>{
        e.preventDefault()

          const {secure_url}= await uploadImage()
          setUrl(secure_url);
          const response= await fetch('http://localhost:8000/api/new-post',{
            method:'POST',
            header:{
                "contentType":'application/json',
                Authorization:`Bearer ${localStorage.getItem('user:token')}`
            },
            body:JSON.stringify({
                caption:data.caption,
                desc:data.desc,
                url:secure_url,
                
            })
          });
        if(response.status===200){
            navigate('/')

        }else{
            console.log('Error');
        }
    }
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='border w-[800px] h-[600px] p-6'>
        <form onSubmit={()=>handleSubmit()}>
            <Input placeholder='Caption...' name='title' className='py-4' value={data.caption } onChange={(e)=>
                 setData({...data, caption:e.target.value})} isRequired={true}

            />
            <textarea rows={7} className='w-full border shadow p-4 resize-none' placeholder='Description'
                value={data.desc} onChange={(e)=> {setData({...data, desc:e.target.value})}} required
            />
           
            <Input type='file' name='image' className='py-4 hidden' onChange={(e)=> setData({...data,
                     img:e.target.file[0]})}  isRequired={false}

            />
            <label for='image' className='cursor-pointer p-4 border shadow w-full'>{data?.img?.name || 'Upload image'}</label>
            <Button label='Create post' type='submit' className='bg-[#F00F51] hover:bg-[#d20d48]'/>

        </form>
        
        </div>
    </div>
  )
}

export default CreatePost
