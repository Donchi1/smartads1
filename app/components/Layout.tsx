import { LayoutType } from '@/utils/Types'
import React from 'react'

function Layout({children,className, innerClassName}: LayoutType) {
  return (
    <div  className={`${className} max-w-full lg:max-w-lg mx-auto min-h-scree flex justify-center items-center pt-[4.6rem] bg-white`}>
    <div className={`${innerClassName} min-h-screen w-[96%] mx-auto`} >
        {children}
        </div>
    </div>

  )
}

export default Layout