"use client"
import React from 'react'
import { LeftHeaderType, NavHeaderType } from '@/utils/Types'
import { usePathname, useRouter } from 'next/navigation'
import { BsChevronLeft } from 'react-icons/bs'
import Text from './Text'
import { useGetCurrentUser } from './hooks/GetCurrentUser'
import H2 from './H2'
import Loading from './Loading'



const HeaderDefaultTitle = () => {
  const pathname = usePathname()
  return (
    <p>{pathname}</p>
  )
} 


function NavHeader({
  className, 
  headerLeft,
  outerClassName,
  headerTitle = {
    title: HeaderDefaultTitle as any,
    className: "",
    showTitle: true
  },
  showHeader = true }: NavHeaderType) {

     const [, loading] =useGetCurrentUser()

  if(loading) return <Loading />

  return (
    <>
     
    <div className={`${outerClassName} max-w-full flex justify-center items-center lg:max-w-lg mx-auto sticky top-0 min-h-[8vh] z-20  bg-white `}>

    <div className={`${className} ${!showHeader && "hidden"} w-[96%] mx-auto`}>
      <div className='flex items-center justify-between'>
        <LeftHeader {...headerLeft} className='flex-1' />
        <div className='flex-[2] text-center '>
          <H2 className={`${headerTitle.className} ${!headerTitle?.showTitle && "hidden"} text-[17px] font-bold capitalize !text-black/70`}>
            {headerTitle?.title}
          </H2>
        </div>
        <div className='flex-1'>&emsp;</div>
        {/* <headerRight/> */}
      </div>
    </div>
    </div>
    </>
  )
}

const LeftHeader = ({
  className,
  headerIcon = {
    render: null,
    showIcon: true,
    className: {
      textClass: '',
      buttonClass: ''
    }
  },
  headerLeftTitle = {
    title: "back",
    showTitle: false
  },
  showHeaderLeft = true
}: LeftHeaderType) => {
  const router = useRouter()
  return (
    <div className={`${className} ${!showHeaderLeft && "hidden"} space-x-2 flex items-center `}>
      <button className={`${headerIcon?.className?.buttonClass} ${!headerIcon?.showIcon && "hidden"}`} onClick={headerIcon?.onClick ? headerIcon?.onClick : router.back as any}>
        <span className={`${headerIcon?.className?.textClass} text-gray-700`}>
          {headerIcon?.render ? headerIcon.render : <BsChevronLeft size={20} />}
        </span>
      </button>
      <div onClick={headerLeftTitle?.onClick && headerLeftTitle.onClick}>
        <Text className={`${!headerLeftTitle?.showTitle && "!hidden"} !text-black/70 capitalize !font-bold`}>
          {headerLeftTitle?.title}
        </Text>
      </div>
    </div>
  )
}

// const RightHeader = ({ className, headerIcon, headerLeftTitle, showHeaderLeft }: LeftHeaderType) => {
//   const router = useRouter()
//   return (
//     <div className={`${className} ${!showHeaderLeft && "hidden"} space-x-2 flex items-center `}>
//       <button className={`${headerIcon?.className?.buttonClass} ${!headerIcon?.showIcon && "hidden"}`} onClick={headerIcon?.onClick ? headerIcon?.onClick : router.back as any}>
//         <span className={`${headerIcon?.className?.textClass} text-gray-700`}>
//           {headerIcon?.render ? headerIcon.render : <BsChevronLeft size={20} />}
//         </span>
//       </button>
//       <Text className={`${!headerLeftTitle?.showTitle && "!hidden"} !text-black/70 capitalize !font-bold`}>
//         {headerLeftTitle?.title}
//       </Text>
//     </div>
//   )
// }



export default NavHeader

