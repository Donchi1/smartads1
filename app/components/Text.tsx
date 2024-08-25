import { ChildrenType } from '@/utils/Types'
import React from 'react'

function Text({children, className}:ChildrenType & {className?: string}) {
  return (
    <p className={`${className} text-gray-400 text-[14px]`}>{children}</p>
  )
}

export default Text