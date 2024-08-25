"use client"
import React from 'react'
import { Sheet } from 'react-modal-sheet'

function BottomSheetModal({open, children,wrapperClassName,onClose}:{
    children:React.ReactNode, 
    open: boolean
    wrapperClassName: string
    onClose: () => void
}) {

  return (
    <Sheet  className={`${wrapperClassName} !mx-auto !max-w-lg`} isOpen={open}  onClose={onClose} detent='content-height'>
      <Sheet.Container className='px-4' >
          <Sheet.Header />
          <Sheet.Content >
          <Sheet.Scroller >
            {children}
            </Sheet.Scroller>
            </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
    </Sheet>
  )
}

export default BottomSheetModal