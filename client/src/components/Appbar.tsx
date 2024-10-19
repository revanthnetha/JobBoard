import React from 'react'
import icons from '../assets/index'

const Appbar = () => {
    const {logo} = icons;
  return (
    <div className='flex justify-between p-8 '>
      <div className='w-[165px] h-[43px]'><img src={logo}/></div>
      <div className='text text-[#576474]'>Contact</div>
    </div>
  )
}

export default Appbar
