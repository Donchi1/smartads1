


import {create} from "zustand"

type AccessCodeInfo= {
    open:boolean
    isSubmitting: boolean
}
interface AppStateType {
    switchOnDark: boolean
    openSidebar: boolean
    accessCodeInfo:AccessCodeInfo
    modal:boolean
    investAmount: string,

    setswitchOnDark: () => void
    setOpenSidebar: () => void
    handleAccessCode:(info:AccessCodeInfo) => void
    handleModal:(value : boolean) => void
    setInvestAmount:(amount: string) => void
}


const md = typeof window !== 'undefined' && window.matchMedia("(max-width: 768px)" ) as any


export const useAppStore = create<AppStateType>((set) => ({
    switchOnDark: false,
    openSidebar: false,
    accessCodeInfo:{
        open: false,
        isSubmitting: false
        },
        modal: false,
        investAmount: "",

     //state updates
    setswitchOnDark: () => set((state) => ({
       switchOnDark: !state.switchOnDark
    })),
    setOpenSidebar: () => set((state) => ({   
       openSidebar: !state.openSidebar
    })),
    handleAccessCode: (info) => set((state) => ({
        accessCodeInfo: info
    })),
    handleModal: (value) => set((state) => ({
        modal: value
    })),
    setInvestAmount: (amount) => set((state) => ({
        investAmount: amount
    }))

}))