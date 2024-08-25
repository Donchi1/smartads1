import TronWeb  from 'tronweb';
//import { findFlagUrlByIso2Code } from "country-flags-svg"
import { countries,TCountryCode,getCountryCode, } from 'countries-list'

import { ERC20_ABI, languageList, TRC20_ABI } from "./constants"
import { signOut, User } from 'firebase/auth'
import { addDoc, collection, doc, DocumentData, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db, storage } from '@/db/firebaseConfig'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { TransactionInfoType } from './Types'
import { destroyCookie } from './createCookie'
import Web3 from 'web3';




  export const countryInfo = languageList.sort().map(each => (
    {
    code: each.code,
    languageName: each.name.toUpperCase(),
    extURL: `http://purecatamphetamine.github.io/country-flag-icons/3x2/${getCountryCode(each.country)}.svg`
}))

// console.log(getCountryCode())

export const setToLocalStorage = <Type>(item:Type, key:string) => {
    const data = JSON.stringify(item)
    window.localStorage.setItem(key, data)
}

export const getFromLocalStorage = (key:string) => {
    const data =  window.localStorage != undefined && window.localStorage.getItem(key)
    return JSON.parse(data as string)
}


  //generate ramdom 5digit numbers

export const genarateRandomFiveDigit = () => {
    const code = Math.floor(10000 + Math.random() * 90000).toString();
     return code
  }

  //generate ramdom 7digit numbers
  export const generateRandomSevenDigit = () => {
    const code = Math.floor(1000000 + Math.random() * 9000000);
    return code;
  };


  export const saveToFirestore = async (userData: User, formData?: any, url?: string ) => {

    await setDoc(doc(db, "users", userData.uid), {
      ...formData,
      city: "",
      gender: "",
      status: "blocked",
      accessCode: "",
      accessCodeProve: "",
      isAdmin: false,
      address: "",
      photo: url || "",
      uid: auth.currentUser?.uid || userData.uid,
      date: serverTimestamp(),
      name: "",
      goldenEgg:{
        price: 0,
        show: false,
        //the number to show the booking during the 33 rounds
        showAt: 0
      },
      commercialAds:{
        price: 0,
        show: false,
        //the number to show the booking during the 33 rounds
        showAt: 0
      },
      viplevel: "gold",
      telegramUsername: "",
      totalOrdersToday: 0,
      totalResets: 0,
      assetBalance: 0,
      freezedAmount: 0,
      trialBonus: 300,
      processing: 0,
      commission: 0,
      verified: false,
      verificationCode: "",
      disableWithdrawal: true,
    });

    const amt= {
        reward: 0,
        bonus: 300
    }
    

      await createTransaction(userData, transData(amt.reward,"funded","Registration Reward",0))
      await createTransaction(userData,transData(amt.bonus,"funded", "Trial bonus added", 0))

  
  
  }

  export const transData = (amount:number,type: "funded"|"deducted", title: string,bAmount:number):TransactionInfoType=>({
    title,
    beforeChangeAmount: bAmount,
    amount: amount,
    type:type,
    date: serverTimestamp(),
    status: "success",
  })


  export const createTransaction = async(userData:User,transInfo: TransactionInfoType) => {
    await addDoc(
        collection(
          db,
          `transactions/${userData.uid}/transactionDatas`
        ),
        {
          ...transInfo,
          uid: userData.uid,
        }
      );
  }
  
  export const makePayment = async (currentUser: DocumentData | null | undefined, values: { [key: string]: any }) => {
    const date = new Date().getTime().toString();
    const storageRef = ref(storage, `proves/${auth.currentUser?.uid + date}`);
    
  
      await uploadBytes(storageRef, values.prove as Blob);
      const url = await getDownloadURL(storageRef);
  
      await addDoc(collection(db, `payments/${auth.currentUser?.uid}/paymentDatas`), {
        paymentAmount: values.amount,
        date: serverTimestamp(),
        method: values.method,
        firstname: currentUser?.firstname,
        lastname: currentUser?.lastname,
        uid: auth.currentUser?.uid,
        prove: url,
        email: currentUser?.email,
        idx: Math.random().toString(),
        status: "pending",
        dailyIncrement: 0.5
      })
  
    } 

  export const handleLogOut = async () => {
    await signOut(auth)
    destroyCookie("auth")
  }


    // Helper function to get the index of the current day in a fixed 5-day cycle
export const getTodayIndex = () => {
  const startDate = new Date(2024, 0, 1); // Fixed start date (e.g., the first day of the cycle)
  const today = new Date();
  const daysPassed = Math.floor((today.getDate()  - startDate.getDate() ) / (1000 * 60 * 60 * 24));
  return daysPassed % 5;
};

// Helper function to calculate the number of days between two dates
export const daysBetween = (startDate:Date, endDate: Date) => {
  const timeDiff = endDate.getTime() - startDate.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};


// Reset status if all 5 days are completed
export const resetStatusAfterDays = (status:{completed:boolean, reward: number}[]) => {
  return status.every(day => day.completed) ? 
    [{ completed: false, reward: 10 }, { completed: false, reward: 30 }, { completed: false, reward: 50 }, { completed: false, reward: 100 }, { completed: false, reward: 200 }] 
    : status;
};
    

export const maskPhoneNumber = (number:string, visibleDigits:number) => {
  // Validate phone number length and visible digits
  if (number?.length < visibleDigits) {
    return number;
  }
  // Mask all but the specified number of digits
  const maskedSection = number?.slice(0, -visibleDigits).replace(/\d/g, '*');
  const visibleSection = number?.slice(-visibleDigits);
  return `${maskedSection}${visibleSection}`;
};

export const filteredComments = (comments: Record<string, boolean>) =>
  Object.fromEntries(Object.entries(comments).filter(([, value]) => value));

export const getFirstThreeParagraphs = (text: string) =>
  text.trim().split('\n').filter(Boolean).slice(0, 2).join('\n');

export const checkOrderType = (currentUser: DocumentData | undefined | null) => {
  if(currentUser?.commercialAds.show){
    return "commercial"
  }else if(currentUser?.goldenEgg.show){
    return "goldenEgg"
  }else{
    return "normal"
  }
}

//calculate divident after reservation

export const calCulateDivident = (hotelData: DocumentData | null | undefined) => {
  //if(checkOrderType() === "commercial") return hotelData?.price * 9
  if(hotelData?.type === "goldenEgg") return hotelData?.price * 3
  if(hotelData?.type === "normal") return hotelData?.price 
}






const tronWeb = new TronWeb({

  fullHost: 'https://api.trongrid.io',
  solidityNode: 'https://api.trongrid.io',
  eventServer: 'https://api.trongrid.io',
  headers: {
      "TRON-PRO-API-KEY": process.env.TRON_PRO_API_KEY as string
  },
  privateKey: process.env.TRONWEB_PRIVATE_KEY,

});

export async function getERC20Balance(userAddress: string): Promise<string> {

const tokenAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7"

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL as string));
    
  const contract = new web3.eth.Contract(ERC20_ABI, tokenAddress);


    const balance = await contract.methods.balanceOf(userAddress).call();
    return web3.utils.fromWei(balance as any, 'ether'); // Assuming 18 decimals
}


export async function getTRC20Balance(userAddress: string): Promise<string> {
  
  const tokenAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"
  
  const contract = await tronWeb.contract(TRC20_ABI, userAddress).at(tokenAddress);
  const balance = await contract.balanceOf(userAddress).call();
  return balance.toString()
}
// export async function requestApproval() {
//     if (typeof window.ethereum === 'undefined') {
//         alert('Please install MetaMask!');
//         return;
//     }

//     const web3 = new Web3(window.ethereum);
//     const accounts = await web3.eth.requestAccounts();
//     const userAddress = accounts[0];

//      return userAddress

//     // Example function call to request transaction approval
//     // Replace with actual contract interaction and method
// }