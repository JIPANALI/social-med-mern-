import React, { useState } from 'react'
import Button from '../../components/Button'
import Input from '../../components/Input'
import {ReactComponent as Avatar1} from '../../assets/avatar1.svg'
import postImg from '../../assets/PostImg.jpg'
import { stats, navigation } from './data'
//import { ReactComponent as Avatar } from ''

import {Link, useNavigate} from 'react-router-dom'

const Home = () => {
    const navigate=useNavigate();
    const [data, setData] = useState([])
    const [user, setUser]=useState({})
    useEffect(() => {
      const fetchPosts=async()=>{
        const response=await fetch('http://localhost:8000/api/profile',
        {
            method:'GET',
            headers:{
                'Content-type':'application/json',
                Authorization:`Bearer ${localStorage.getItem('user:token')}`
            }
        })
        const data=await response.json()
        setData(data.posts)
        setUser(data.user)
      }
      fetchPosts()
    }, [])

    console.log(data, 'data');
    //
    const {_id='', username='', email=''}=user | {}
    
  return (
    <div className='h-screen bg-[#d2cfdf] flex overflow-hidden'>
        <div className='w-[20%] bg-white flex flex-col'>
            <div className='h-[30%]  flex flex-col justify-center items-center '>
               <Avatar1  width={'75px'} height={'75px'}/> 
               <div className='my-4 text-center'>
                <h3 className='text-xl font-semibold '>{user.username}</h3>
                <p className='text-sm font-light'>{user.email} </p>
               </div>
               <div className=' h-[50px] flex justify-arround w-[300px] text-center ml-20'>

                        {
                            stats.map(({id,name,stats})=>{

                                return(
                                  <div key={id}>
                                    <h4 className='font-bold'>{stats}</h4>
                                    <p className='font-light text-sm'>{name}</p>
                                  </div> 
                                ) 
                            })
                        }

                    
                </div>

                
            </div>
            <div className='h-[55%]  flex flex-col justify-evenly pl-12 border-b text-gray-400 text-md font-medium'>
                {
                    navigation.map(({id, name, icon, url})=>{
                        return (
                            <Link  to={url} key={id} className='flex cursor-pointer hover:text-[#F00F51]'><span 
                            className='mr-4'>
                            {name}

                            </span>
                            {name}

                            </Link>
                        )
                    })
                }
                
                    
                

            </div>
           
            <div className='h-[15%] '>
                <div className='ml-12 cursor-pointer'>Log out</div>

            </div>
            
        </div>
        <div className='w-[60%] overflow-scroll h-full scrollbar-hide'>
                <div className='bg-white h-[75px] border-l flex justify-evenly item-center pt-4'>
                    <div className='flex justify-center item-center'>
                        <Input placeholder='Enter your Search' label=''/>
                        <Button label='Search' className='h-[40px] mb-4 ml-4'/>

                    </div>

                    <Button label='+ Create new Post' className='rounded-lg bg-red-400 hover:bg-red-500 h-[40px] mb-4'
                      onClick={()=>{navigate('/new-post')}}  />
                    
                        
                </div>
                        {
                            data?.posts.map(({caption='', description='', image='' }=data || {})=>{
                                return(
                                    <div className='bg-white w-[60%]  mx-auto mt-32 p-8 '>
                    <div className='border-b flex items- pb-4'>
                            <Avatar1 className='items-left mr-15' witdth={'50px'} height={'50px'} mr-10/>

                            <div className='mr-80'>
                                <h3>{user.username}</h3>
                                <p> {user.email}</p>
                            </div>
                    </div>

                    <div className='border-b pb-4 mb-4'>
                        <img src={postImg} className='rounded-xl'/>

                    </div>

                    <div className='flex justify-evenly'>
                        <div>10.5k Likes</div>
                        <div>10.6k Comments</div>
                        <div>10.7 Shares </div>
                    </div>
                    
                    </div>


                                )
                                })
                        }
                
               
               
        </div>
        <div className='w-[20%] bg-white'>

            <div className='ml-4 mt-4'>Trending Feeds</div>    
            <div className='h-[30%] w-[80%] bg-red-500 mx-auto mt-4 p-16'></div>

            <div className='ml-4 mt-4'>Suggestions for you</div>    
            <div className='h-[30%] w-[80%] bg-blue-500 mx-auto mt-4 p-16'></div>
            <div></div>

            <div className='ml-4 mt-4'>Active follower</div>    
            <div className='h-[20%] w-[80%] bg-red-700 mx-auto mt-4 p-16'></div>
        </div>


        
    </div>
  )
}

export default Home