"use server"
import { cookies } from "next/headers";

 
export async function create(name:string, data: string, date?: number) {
  const newDate = date ? date : 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
    cookies().set(name, data, {expires: Date.now() + newDate, secure:process.env.NODE_ENV === "production"})
  }

  
  export async function destroyCookie(data: string) {
    cookies().delete(data)
  }


  export async function getSessionData() {
    const encryptedSessionData = cookies().get('auth')?.value
    return encryptedSessionData ? JSON.parse(encryptedSessionData) : null
  }

  