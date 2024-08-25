import React from 'react'
import Text from './Text';
import Image from 'next/image';
import { WithdrawalMethodType } from '@/utils/Types';

function WithdrawalMethod({values, onClick, setFieldValue, label, imageSrc, type, currentUser}: WithdrawalMethodType) {

  const handleChange = () => {
    let address
      if(currentUser?.wallet?.type){
        if(type === "usdt-trc20") {
          address = currentUser?.wallet.address.trc_20 
        }else if(type === "usdt-erc20"){
          address = currentUser?.wallet.address.erc_20
        }else{
          address = currentUser?.wallet.iban
        } 
    }else{
      address = "none"
    }
    setFieldValue("withdrawalType", type)
    setFieldValue("withdrawalAddress", address || "none")
  }
  return (
    <>
    <label onClick={onClick && onClick} className="flex py-1 px-2 justify-between rounded-xl items-center bg-main-gray">
          <Image className="size-10 object-contain" width={200} height={200} src={imageSrc} alt={label} />
          <Text>{label}</Text>
          <input type="checkbox" className="appearance-none border-2 checked:hidden border-gray-300 block peer rounded-full size-5" 
                 checked={values?.withdrawalType === type} 
                 onChange={() => {
                  handleChange()
                 }} />
          <Image className="size-5 object-contain hidden peer-checked:block" width={200} height={200} src={"/img/checked.png"} alt="checked" />
        </label>
    </>
  )
}

export default WithdrawalMethod