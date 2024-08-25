"use client"
import React from 'react'
import { SnackbarProvider } from "notistack";
import { useGetCurrentUser } from './hooks/GetCurrentUser';
import useLangLoader from './hooks/useLangLoader';

function MySnackProvider({children}:{children: React.ReactNode}) {
  useGetCurrentUser()
  useLangLoader()
  return (
    <SnackbarProvider 
        autoHideDuration={2000}
        maxSnack={1}>
        {children}
    </SnackbarProvider>
  )
}

export default MySnackProvider