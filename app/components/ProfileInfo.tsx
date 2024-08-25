import React from 'react';
import Text from './Text';
import { FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';
import Input from './Input';
import { ProfileInfoType } from '@/utils/Types';
import { db, storage } from '@/db/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';

const ProfileInfo: React.FC<ProfileInfoType> = ({ user, setOpenInput, setFieldValue }) => {
  const handleInputChange = (type: string, inputName: string) => {
    setOpenInput((prev) => ({ ...prev, type, inputName }));
  };

  const handleFileChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    
      //Create a reference for the image 
      const storageRef = ref(storage, `users/${user?.uid}`);
     try {
      await uploadBytes(storageRef, file as Blob);
      const url = await getDownloadURL(storageRef);
      await updateDoc(doc(db, "users", user?.uid), {
        photo: url
      })
      setFieldValue("photo", url);

     } catch (error) {
       console.log(error)
     }

  };

  const profileItems = [
    { label: "Photo", value: user?.photo || "/img/account-user.png", type: "file", action: handleFileChange },
    { label: "Email Address", value: user?.email, type: "email", inputName: "email" },
    { label: "Phone Number", value: user?.phoneNumber, type: "others", inputName: "phoneNumber" },
    { label: "Name", value: user?.name, type: "others", inputName: "name" },
    { label: "Username", value: user?.username, type: "others", inputName: "username" },
    { label: "Country", value: user?.country, type: "others", inputName: "country" },
    { label: "State", value: user?.state, type: "others", inputName: "state" }
  ];

  return (
    <div className='mt-4 divide-y-[1px] *:py-4'>
      {profileItems.map((item, index) => (
        <div
          key={index}
          className={`flex justify-between cursor-pointer items-center ${index === profileItems.length - 1 ? '!border-b' : ''}`}
          onClick={() => item.inputName && handleInputChange(item.type, item.inputName)}
        >
          <Text className='!text-[17px]'>{item.label}</Text>
          <div className='flex items-center gap-2 '>
            {item.type === "file" ? (
              <label>
                <Image className='size-[3.5rem] rounded-full' width={200} height={200} src={item.value as string} alt="User" />
                <Input className='hidden' type='file' onChange={item.action} />
              </label>
            ) : (
              <>{item.value} <FaChevronRight size={12} /></>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileInfo;