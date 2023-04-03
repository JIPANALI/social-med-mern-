import React, { useState } from 'react'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { useNavigate } from 'react-router-dom'

const Form = ({
    isSignInPage=false,
  
}) => {

    //const [isSignInPage, setIsSignInPage]=useState(true);

    const navigate=useNavigate();

    const [data, setData]=useState({
        ...(!isSignInPage && {username :""}),
        email:'',
        password:''
    })



    //it is for when submit click all the information store and take from the mongodb and from front end to back end and vice versa 
    // data posting in this backend url `http://localhost:8000/api/${isSignInPage ? 'login':'register'
    const handleSubmit=async (e)=> {
        e.preventeDefault()

        const res=await fetch(`http://localhost:8000/api/${isSignInPage ? 'login':'register'}`,{
            method:postMessage,
            header:{
                contentType:'application/json'
            },
            body:JSON.stringify(...data)
        })
        console.log(res, 'res');
        if(res.status===200 && isSignInPage)
        {
            const {token, user }=await res.json()
            console.log(token, user, 'response');
            localStorage.setItem('user: token', token); //it will going to set new token for login need not to again again required pass
            navigate('/')  //if this condidion will satisfied then it will go to the main home page so that is why navigate('/')
        }

    }

  return (
    <div className='bg-[#d2cfdf] h-screen w-full flex justify-center items-center'>
        <div className='h-[600px] w-[800px] bg-white flex justify-center identify-center'> 
            <div className={`h-full w-full  flex flex-col justify-center items-center ${!isSignInPage && 
            'order-2'}`}>
                <div className='text-4xl font-extrabold'> WELCOME {isSignInPage && 'BACK'}</div>
                <div className='mb-[50px] font-light'>PLEASE {isSignInPage ? 'LOGIN' : 'REGISTER'} TO CONTINUE</div>
                <form className='w-[350px]' onSubmit={(e)=> handleSubmit(e)}>
                    {
                        !isSignInPage &&        
                        <Input label='Username' type='text' placeholder='Enter your username' value={data.username}
                            onChange={(e)=>setData({...data, username:e.target.value})}
                        />
                    }
                
                    <Input label='Email' type='email' placeholder='Enter your email' value={data.email} 
                    onChange={(e)=> setData({...data, email:e.target.value})}/>

                    <Input label='Password' type='password' placeholder='Enter your password' value={data.password} 
                    onChange={(e)=>setData({...data, password:e.target.value})}/>

                    <Button type={'submit'} label={ isSignInPage ? 'Sign in':'Register'} className='my-5'/>
                    
                    <div className='cursor-ponter text-md hover:text-blue-700 underline ' onClick={() =>
                navigate(`${isSignInPage ? '/account/signup' : '/account/signin'}`)}> {isSignInPage ? 
                    'create new account' : 'sign in'}
                </div>

                     
                </form>

             
            </div>
        <div className={`h-full w-full  flex justify-center bg-gray-400 ${isSignInPage && 'order-1'}`}>


                        
        </div>
        </div>
    </div>
  )
}

export default Form