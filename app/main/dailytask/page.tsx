"use client"
import React from 'react';
import NavHeader from "@/app/components/NavHeader"
import Layout from '@/app/components/Layout';
import Image from 'next/image';
import Card from '@/app/components/Card';
import Text from '@/app/components/Text';
import Button from '@/app/components/Buttons';
import { useDailyTask } from '@/app/components/hooks/useDailyTask';
import NoticeModal from '@/app/components/NoticeModal';



const DailyCheckInTask: React.FC = () => {

 const {canCheckIn,handleCompleteTask,noticeModal,setNoticeModal, checkInStatus, isCompleted} = useDailyTask()



  return (
    <>
      <NavHeader headerTitle={{ title: "Daily Tasks", showTitle: true }} headerLeft={{ showHeaderLeft: true }} />
      <main>
        <Layout className='!pt-0'>
          <section>
            <div className='-mb-4'>
              <Image className='max-w-full w-full' width={500} height={600} src="/img/task.png" alt="taskcalender" />
            </div>
            <div className='rounded-xl shadow-[-1px_1px_5px_1px_rgba(0,0,0,0.20)] space-y-4 pb-4 px-2 lg:px-4'>
              <div className='grid grid-cols-5 grid-rows-subgrid lg:gap-4 gap-2'>
                {checkInStatus.map((status, index) => (
                  <div key={index} className='space-y-3 mb-2'>
                    <Card className={`${status.completed && "!bg-blue-200"}`}>
                      <div className={`gap-y-2 justify-center items-center flex-col flex `}>
                        <Image
                          className='w-10'
                          width={100}
                          height={100}
                          src={status.completed ? "/img/task-complete.png" : "/img/no-task.png"}
                          alt={status.completed ? 'Task Complete' : 'No Task'}
                        />
                        <Text className='!text-[0.8rem]'>€{status.reward}</Text>
                      </div>
                    </Card>
                    <Text className='!text-center'>Day {index + 1}</Text>
                  </div>
                ))}
              </div>
              <div>
                <Button
                  onClick={handleCompleteTask}
                  disabled={!canCheckIn}
                  className={`${isCompleted ? 'cursor-not-allowed' : 'cursor-pointer'} !w-full !bg-red-500 !py-3 !capitalize`}
                  title={isCompleted ? 'All Days Completed' : !canCheckIn ? 'Already Checked In Today' : 'Complete Today\'s Task'}
                />
              </div>
              <Text className='text-center !text-black !text-[1rem]'>More rewards for consecutive check-ins</Text>
            </div>
            <div className='space-y-4 my-4 px-2 lg:px-4'>
              <Text className='!text-black !text-[1.2rem]'>Task Rules</Text>
              <div className='space-y-4 *:!text-[1rem]'>
                <Text>1. After completing 2 rounds of tasks every day, you can log in and receive the rewards corresponding to the sign-in day.</Text>
                <Text>2. If you do not complete two rounds of tasks in a day, you will not be able to log in and your check-in information will not be reset. If you complete two rounds of tasks the next day, you can still get the sign-in reward.</Text>
                <Text>3. If the registration date reaches 5 days, you will get the first day sign-in reward again. If you sign in for 5 days in a row, you will receive an additional sign-in bonus of 250 euros.</Text>
              </div>
            </div>
          </section>
          <NoticeModal message='You have not reached the daily task requirements. Please contact customer service.' setNoticeModal={setNoticeModal} noticeModal={noticeModal} />
        </Layout>
      </main>
    </>
  );
};

export default DailyCheckInTask;