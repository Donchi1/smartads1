import Image from 'next/image'
import React from 'react'

function Loading() {
    return (
        <div className='max-w-full lg:max-w-lg mx-auto h-screen fixed right-0 left-0 top-0 bottom-0 bg-gray-100 z-[10000]'>
            <div className='h-screen flex justify-center items-center'>
                <Image className='w-44' width={100} height={100} src={"/img/loadersplash.gif"} alt='loader' />
            </div>
        </div>
    )
}

export default Loading