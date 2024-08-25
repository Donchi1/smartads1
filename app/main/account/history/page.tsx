"use client"
import HistoryData from '@/app/components/HistoryData'
import useCollection from '@/app/components/hooks/UseCollection'
import Layout from '@/app/components/Layout'
import Loading from '@/app/components/Loading'
import NavHeader from '@/app/components/NavHeader'
import { auth } from '@/db/firebaseConfig'
import React from 'react'

function Page() {

  const [transactions,isLoading] = useCollection(`transactions/${auth.currentUser?.uid}/transactionDatas`)
 
  //check if the transaction is loading
  if(isLoading) return <Loading />

  return (
    <>
    <NavHeader headerLeft={{ showHeaderLeft: true }} headerTitle={{ title: "History", showTitle: true }} />
    <main className="w-full h-screen">
      <Layout className="!pt-8 lg:!pt-4">
       <div className='space-y-2'>
        {transactions.length > 0 && transactions.map(each => (
         <HistoryData key={each.id} history={each} />
        ))}
       </div>
      </Layout>
      </main>
      </>
  )
}

export default Page