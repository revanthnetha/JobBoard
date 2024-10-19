import React from 'react'

const Card = ({children}:any) => {
  return (
    <div className='w-[619px] h-full pb-20 pt-12 border border-[#3F71FF] rounded-[15px]'>
       <div className="font-[DM Sans] text-[32px] flex justify-center font-semibold">Sign Up</div> 
       <div className="font-[DM Sans] text-[16px] text-[#292929B2] flex justify-center ">Lorem Ipsum is simply dummy text</div>
        {children}
    </div>
  )
}

export default Card
