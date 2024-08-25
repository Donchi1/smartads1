
import { UserType } from "@/app/store/authStore"
import { DocumentData, FieldValue, Timestamp } from "firebase/firestore"
import { FormikErrors } from "formik"
import React, { MouseEventHandler } from "react"

export type ChildrenType = {
     children: React.ReactNode
     className?: string
}

type HeadeSideTypes = {
     showHeaderLeft?: boolean
     className?: string
     headerIcon?: {
          render?: React.ReactElement | React.ReactNode
          showIcon?: boolean
          className?: {
               textClass?: string
               buttonClass?: string
          }
          onClick?: () => void
     }
}
type HeaderSideTitle = {
     title?: string | React.ReactElement
     onClick?: MouseEventHandler<HTMLElement>
     showTitle?: boolean
     className?: string
}

export type LeftHeaderType = HeadeSideTypes & {
     headerLeftTitle?: HeaderSideTitle
}

export type RightHeaderType = HeadeSideTypes & {
     headerRightTitle?: HeaderSideTitle
}

export type NavHeaderType = {
     headerTitle?: {
          title?: string | React.ReactElement
          className?: string
          showTitle?: boolean
     }
     headerLeft: LeftHeaderType
     headerRight?: RightHeaderType
     className?: string
     showHeader?: boolean
     outerClassName?: string

}

export type LayoutType = ChildrenType & {
     className?: string
     innerClassName?: string
}

export type PhoneType = {
     error: any
     onChange: (value: string) => void
     value: string
     id?: string
}
export type ProfileInfoType = {
     user:DocumentData
      setOpenInput:React.Dispatch<React.SetStateAction<{
          type: string;
          inputName: string;
      }>>
      setFieldValue: any
}

//transaction information type

export type TransactionInfoType = {
     title: string,
     amount: number,
     type: "deducted" | "funded",
     date: FieldValue,
     beforeChangeAmount: number,
     status: "success" | "pending" | "failed",

}

export type WithdrawalMethodType = {
     values:{[key:string]:any}
     setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<FormikErrors<{
     withdrawalAmount: string;
     withdrawalAddress: string;
     withdrawalType: string;
 }>> | Promise<void>
 label: string 
 imageSrc: string
 type: string
 currentUser?: UserType
 onClick?: React.MouseEventHandler<HTMLElement>
}