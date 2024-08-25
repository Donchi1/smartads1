
import { DocumentData } from "firebase/firestore"
import {create} from "zustand"


export type UserType = DocumentData | null | undefined


interface AppStateType {
    currentUser: UserType
    loading: boolean

    setCurrentUser: (user:UserType) => void
    setLoading: (loading: boolean) => void
}


export const useAuthStore = create<AppStateType>((set) => ({
    currentUser: null,
    loading: false,

     //state updates
    setCurrentUser: (user) => set((state) => ({
       currentUser: user
    })),
    setLoading: (loading) => set((state) => ({
        loading:loading
     }))
}))