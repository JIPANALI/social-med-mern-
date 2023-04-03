import React from 'react'

const Input = ({
    name='',
    label='Username',
    type='text',
    placeholder='',
    className='',
    value='',
    onChange=()=>null,
    isRequired=true


}) => {
  return (
    <div class="mb-4">
        {
            label && 
            <label class="block text-gray-700 text-sm font-bold mb-2 " for={name}> 
                {label}
            </label>

        }
    

    <input class={`shadow appearance-none border rounded w-full py-2 px-3 
    text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`} value={value} onChange={onChange}
    id={name} type={type} placeholder={placeholder} required={isRequired}/>
    </div>
  )
}

export default Input