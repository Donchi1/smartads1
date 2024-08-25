import React from 'react'


interface CardInterface {
   className?: string
   children: React.ReactNode
}

function Card({children, className}:CardInterface ) {

  return (
    <div className={`${className} rounded-lg  w-auto px-2 py-6 lg:py-6 bg-[rgb(232,232,232)]`}>
     {children}
    </div>
  )
}

export default Card