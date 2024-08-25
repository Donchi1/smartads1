import React from 'react'
import CustomIcon from './CustomIcon'


interface ButtonInterface {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
  title: string | React.ReactNode
  className?: string
  icon?: React.ReactNode
  type?: "button" | "submit" | "reset" | undefined
  disabled?: boolean
}

function Button({ title,icon, onClick,type, className, disabled, ...others}: ButtonInterface) {
  return (
    <button className={`${className} rounded-full px-3 py-2 flex justify-center items-center gap-2 text-white uppercase `} type={type} onClick={onClick} disabled={disabled} {...others}>
      {icon && <span>{icon}</span>} {title}
    </button>
  )
}
export function IconButton({ title, onClick, className, icon=(<CustomIcon className="w-[30px] h-[30px]" color='white' icon={<span className="text-g-ancent-text">₿</span>} />) }: ButtonInterface) {
  return (
    <div className="bg-main-color max-w-fit group  hover:bg-main-color/20 rounded-full p-px pr-1 hover:pr-px hover:pl-1 transition-all ease-linear duration-300">
      <button className={`${className} bg-[#0D192F] font-bold shadow-inner  group-hover:bg-main-color rounded-full px-3 py-2 text-white uppercase flex  items-center gap-3`} onClick={onClick}>
          <span>
            {icon}
          </span>
        {title}
      </button>
    </div>
  )
}

export default Button