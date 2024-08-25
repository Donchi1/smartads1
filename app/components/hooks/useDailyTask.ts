
import { useEffect, useState } from 'react'
import { db } from '@/db/firebaseConfig';
import {  DocumentData, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { useAuthStore } from '@/app/store/authStore';
import useCollection from './UseCollection';



interface CheckInStatus {
  completed: boolean;
  reward: number;
}


  
export const useDailyTask = () => {
  const { currentUser } = useAuthStore()
  const [reservations] = useCollection(`reservations/${currentUser?.uid}/reservationDatas`)
  const [checkInStatus, setCheckInStatus] = useState<CheckInStatus[]>([
    { completed: false, reward: 10 },
    { completed: false, reward: 30 },
    { completed: false, reward: 50 },
    { completed: false, reward: 100 },
    { completed: false, reward: 200 }
  ]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [canCheckIn, setCanCheckIn] = useState<boolean>(true);
  const [userDoc, setUserDoc] = useState<DocumentData>([]);
  const [noticeModal, setNoticeModal] = useState(false)



  const userId = currentUser?.uid; // Replace with the actual user ID or fetch dynamically


  const docRef = doc(db, `users/${userId}`)

  useEffect(() => {
    const unsubscribe = onSnapshot(docRef, async (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setUserDoc(data)
        if (data?.checkInStatus.length > 0) {
          const updatedCheckInStatus = [...checkInStatus];
          data.checkInStatus.forEach((status: CheckInStatus, index: number) => {
            if (index < updatedCheckInStatus.length) {
              updatedCheckInStatus[index] = status;
            }
          });
          setCheckInStatus(updatedCheckInStatus);

          const today = new Date().toDateString();
          const lastCheckIn = data.lastCheckInDate?.toDate().toDateString();
          setCanCheckIn(today !== lastCheckIn);
          setIsCompleted(data.checkInStatus?.every((status: CheckInStatus) => status.completed));
          //reseter
          if(today !== lastCheckIn && data.checkInStatus?.every((status: CheckInStatus) => status.completed)){
            setIsCompleted(false);
            setCanCheckIn(true)
            await updateDoc(docRef, {
              checkInStatus: [{completed: false, reward: 10 },
                { completed: false, reward: 30 },
                { completed: false, reward: 50 },
                { completed: false, reward: 100 },
                { completed: false, reward: 200 }], // Reset after 5 days
            })
          }
        }
      }
    });

    return () => unsubscribe();
  }, [userId]);


 
  const handleCompleteTask = async () => {
    if (!canCheckIn || isCompleted) return;

    if(currentUser?.totalResets < 2){
       return setNoticeModal(true)
      }
      if (!reservations.every(each => each.status === "success")) {    
        return setNoticeModal(true)
      }

    const newCheckInStatus = [...checkInStatus];
    const index = newCheckInStatus.findIndex(status => !status.completed)
    newCheckInStatus.map((status, idx) => {
      if(index === idx){
        status.completed = true
      }
      return {...status}
    })
 
    try {
      await updateDoc(docRef, {
        checkInStatus: newCheckInStatus,
        lastCheckInDate: new Date(),
        commission: newCheckInStatus[index].reward + userDoc?.commission
      });

      setCheckInStatus(newCheckInStatus);
      setCanCheckIn(false);

      if (newCheckInStatus.every(status => status.completed)) {
        setIsCompleted(true);
      }
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };



    return {handleCompleteTask, isCompleted,noticeModal,setNoticeModal, checkInStatus, canCheckIn}
}
