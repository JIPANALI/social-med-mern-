import React from 'react'
import { ReactComponent as Avatar1 } from '../../assets/avatar1.svg'
import { stats } from '../Home/data'
import postImg from '../../assets/PostImg.jpg'
import { IconBookmark, IconHeart, IconMessage, IconMessageCircle } from '@tabler/icons'

const Profile = () => {
    const [posts, setposts] = useState([])

    useEffect(() => {       //in useEffect atleast one time it will rendering  when component will run
        const getPosts = async () => {
            const response = await fetch('http://localhost:8000/api/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('user:token')}`
                }
            })
            setposts(await response.json())
        }
        getPosts(); //call the method to get getPost
    }, [])


    return (
        <div className='h-screen flex justify-center item-center'>
            <div className='w-[1000px] h-[800px] border flex flex-col items-center p-10'>
                <div className='h-[30%]  flex flex-col justify-center items-center '>
                    <Avatar1 width={'120px'} height={'120px'} />

                    <p className='my-4'> Jipan Ali</p>
                    <div className=' h-[50px] flex justify-arround w-[300px] text-center ml-20 border p-4'>

                        {
                            stats.map(({ id, name, stats }) => {

                                return (
                                    <div key={id}>
                                        <h4 className='font-bold text-2xl'>{stats}</h4>
                                        <p className='font-light text-lg'>{name}</p>
                                    </div>
                                )
                            })
                        }


                    </div>


                </div>
                <div className='flex justify-between items-center flex-wrap'>
                    {
                        posts?.posts.length > 0 &&
                        posts?.posts.map(({_id, caption='', description='', image=''}) => {  //if not recieved then take default value
                            return (
                                <div className='w-[400px] mt-6 mx-2 flex flex-col border p-4 rounded-lg'>
                                    <image src={image} className='rounded-xl' />
                                    <div className='flex mt-4 mb-2 pb-2 justify-center'>
                                        <p className='font-medium text-center'>{caption}</p>

                                    </div>
                                    <p className='mb-4 text-sm font-normal text-center'>{description}</p>
                                    <p className='mb-4 text-sm font-normal text-center'></p>
                                    <div className='flex justify-evenly text-black text-sm font-medium'>
                                        <div className='flex item-center'><span className='mr-2'><IconHeart /></span> 10.5k</div>
                                        <div className='flex item-center'><span className='mr-2'><IconMessage /></span> 10.5k</div>
                                        <div className='flex item-center'><span className='mr-2'><IconMessageCircle /></span> 10.5k</div>
                                        <div className='flex item-center'><span className='mr-2'><IconBookmark /></span> 10k</div>
                                    </div>
                                </div>


                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default Profile