import React from 'react'
import { FaSpinner } from 'react-icons/fa'

function Spinner({className}:{className?: string}) {
  return (
       <FaSpinner size={20} className={`${className} animate-spin text-white`} /> 
  )
}

export default Spinner