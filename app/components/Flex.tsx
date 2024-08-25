import React from 'react'

interface FlexInterface {
    children: React.ReactNode
    className?: string
}

function Flex({children, className}:FlexInterface ) {
  return (
    <div className={`${className} flex items-center lg:flex-row flex-col gap-4 *:flex-1`}>{children}</div>
  )
}

export default Flex