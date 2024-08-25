import React from 'react'



interface CustomIconType {
    icon?: React.ReactNode
    color?: string
    className?: string
}


function CustomIcon({icon,color,className}:CustomIconType) {
  return (
    <div style={{background: color}} className={`${className}  flex  justify-center items-center text-white rounded-full`}>
      {icon}  
    </div>
  )
}

export default CustomIcon