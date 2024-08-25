import { PhoneType } from '@/utils/Types'
import { countryLists } from '@/utils/constants'
import React from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

function PhoneNumberInput({onChange, value,id}:PhoneType) {

    
  
  return (

    <PhoneInput
    
      country={'fr'}
      placeholder='Enter phone Number'
      enableSearch
      containerClass='w-full'
      countryCodeEditable={false}
      inputProps={{
        id: id
      }}
      buttonClass='!rounded-full [&_div]:!bg-transparent !ml-1 !border-gray-700 hover:!bg-transparent focus:!bg-transparent !border-0 !bg-transparent'
      inputClass={`!text-black !pl-10 !pr-4 !py-[1.50rem] !outline-none !bg-main-gray/50  !border-none !rounded-full !w-full`}
      onlyCountries={countryLists.map(each => each.toLowerCase())}
      preferredCountries={countryLists}
      value={value}
      onChange={(phone) => onChange(phone)}
    />
  )
}

export default PhoneNumberInput