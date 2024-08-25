import { ChildrenType } from '@/utils/Types'
import React from 'react'

function H2({children,className}:ChildrenType) {
  return (
    <h2 className={`${className} text-xl font-bold `}>{children}</h2>
  )
}

export default H2