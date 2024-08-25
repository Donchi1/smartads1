import React from 'react'


interface InputInterface {
  type?: string
  placeholder?: string
   onChange:React.ChangeEventHandler<HTMLInputElement> | undefined
   className?: string
   value?: string 
   error?: any
   id?: string
   title?: string
   disabled?:boolean
   name?: string
   onBlur?: any
   readOnly?: boolean
}

function Input({onChange,error,disabled, id, value,title,className, readOnly, placeholder, type,...orders}:InputInterface) {
  return (
    <input  readOnly={readOnly} disabled={disabled} title={title} {...orders}  className={`${className}  text-black border-none px-4 py-3 bg-main-gray/50 transition-colors ease-linear duration-500 outline-none rounded-full w-full`} placeholder={placeholder} id={id} value={value} onChange={onChange} type={type} />
  )
}

export default Input