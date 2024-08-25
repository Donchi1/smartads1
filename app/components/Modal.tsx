"use client"
import React, { ReactNode, useState, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom';
import { FaX } from 'react-icons/fa6';
import H2 from './H2';


type PlacementType = "center" | "top" | "bottom" | undefined

type modalTypes = {
  children: ReactNode,
  open: boolean,
  onClose?: any
  className?: string
  title?: React.ReactNode
  placement?: PlacementType
  closeOnDialogClick?: boolean
  classes?: {
    modalWrapperClassName?: string
    modalContentClassName?: string
    containerColorClass?: string
    headerClassName?: {
      buttonClassName?: string
      titleClassName?: string
      containerClassName?: string
    }
    footerClassName?: {
      buttonClassName?: string
      titleClassName?: string
      containerClassName?: string
    }
  }
  showFooter?: boolean

}

const setPlacement = (placement: PlacementType) => placement === "top" ? "justify-start" : placement === "bottom" ? "justify-end" : "justify-center"



function Modal({ children, open, onClose, title, placement, classes, closeOnDialogClick,showFooter }: modalTypes) {



  const [doc, setDoc] = useState<HTMLElement | null>(null)


  useLayoutEffect(() => {
    const modalRoot = document.getElementById('modal-root') || null;
    setDoc(modalRoot)
  }, [])



  if (!doc) return <div></div>

  return ReactDOM.createPortal(

    <dialog onClick={() => closeOnDialogClick && onClose()} open={open} className={`${classes?.containerColorClass}  z-[100] fixed top-0 bottom-0 right-0 left-0 w-full h-screen bg-black/50`}>

      <div className={`${setPlacement(placement)} ${classes?.modalWrapperClassName} flex flex-col  max-w-full lg:max-w-lg mx-auto  h-screen min-h-max `}>
        <div className={`${classes?.modalContentClassName} !bg-white p-4 overflow-y-auto rounded-lg`}>
          <div className={`${classes?.headerClassName?.containerClassName} flex justify-between items-center`}>
            <H2 className={`${classes?.headerClassName?.titleClassName} text-black`}>{title}</H2>
            <button className={`${classes?.headerClassName?.buttonClassName} p-1 text-red-500 border rounded-md outline-none hover:opacity-80 border-red-400 self-end`} onClick={onClose} >
              <FaX size={20} />
            </button>
          </div>
          <div>
            {children}
          </div>
        </div>
        {showFooter && 
          <div className={`${classes?.footerClassName?.containerClassName} mt-2 flex justify-center items-center w-full bg-transparent`}>
            <button className={`${classes?.footerClassName?.buttonClassName} p-1 size-14 bg-transparent text-center text-white border rounded-full flex justify-center items-center outline-none hover:opacity-80 border-white `} onClick={onClose} >
              <FaX size={20} />
            </button>
          </div>}
      </div>
    </dialog>,
    doc as Element
  )
}

export default Modal