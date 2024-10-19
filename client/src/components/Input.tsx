import React from 'react'
import icons from "../assets/index"

const Input = ({placeholder,onChange,icon,value,type,name,isVerify}:{
    placeholder:string,
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void,
    icon: string,
    value?:string,
    type?:string,
    name:string,
    isVerify?:boolean
}) => {
  const {check} = icons;
  return (
    <div className="relative md:w-[542px] md:h-[59px] mt-4 ">
      <div className="absolute inset-y-6 left-0 flex flex-col  items-center pl-3 w-[42px] h-[10px] justify-center">
        <img src={icon} alt="icon" />
      </div>
      <input
        type= {type || "text"}
        name={name}
        value={value}
        className="text-[DM Sans] w-full h-full pl-10 pr-4 py-2 ml-2 text text-gray-700 placeholder-gray-500 bg-[#F4F4F4] border border-gray-300 rounded-[7px]  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder={placeholder}
        onChange={onChange}
        style={{
          borderWidth: '1px 0px 0px 0px',
          opacity: 1, 
        }}
      />
      {isVerify?
        <div className="absolute inset-y-6 right-0 flex flex-col  items-center pl-3 w-[42px] h-[10px] justify-center">
        <img src={check} alt="icon" />
      </div>: "" }
    </div>
  )
}

export default Input
