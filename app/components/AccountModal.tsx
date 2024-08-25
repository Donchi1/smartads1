"use client"
import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';
import formatCurrency from '@/utils/converter';
import Modal from './Modal';
import { auth } from '@/db/firebaseConfig';
import useGetDocument from './hooks/UseDocument';
import H2 from './H2';
import Text from './Text';


interface CardProps {
  imgSrc: string;
  imgAlt: string;
  bgColor: string;
  title: string;
  amount: number;
}

interface LinkButtonProps {
  href: string;
  imgSrc: string;
  imgAlt: string;
  bgColor?: string;
  title: string;
}


const Card: FC<CardProps> = ({ imgSrc, imgAlt, bgColor, title, amount }) => (
  <div className={`flex justify-between items-center p-4 ${bgColor}`}>
    <Image className='w-10' width={100} height={100} src={imgSrc} alt={imgAlt} />
    <div>
      <p className='!text-white text-[16px]'>{title}</p>
      <H2>{formatCurrency(amount)}</H2>
    </div>
  </div>
);

const LinkButton: FC<LinkButtonProps> = ({ href, imgSrc, imgAlt, bgColor = '', title }) => (
  <Link href={href} className={`flex justify-between items-center border p-2 border-main-gray rounded-xl ${bgColor}`}>
    <div className='flex gap-8 items-center'>
      <Image className='w-10' src={imgSrc} alt={imgAlt} width={100} height={100} />
      <p className={`!text-[17px] ${bgColor ? '!text-white' : '!text-black/70'}`}>{title}</p>
    </div>
    <FaChevronRight className={bgColor ? 'text-white' : 'text-black/70'} />
  </Link>
);



const AccountModal: FC<{ openAccountModal: boolean; setOpenAccountModal: (value: boolean) => void }> = ({ openAccountModal, setOpenAccountModal }) => {
   
    const [currentUser] = useGetDocument("users", auth.currentUser?.uid || "uhuih")


    return(
  <Modal
    title={
      <>
        <Text className='!text-black/70 !font-bold !text-[17px]'>TOTAL ASSETS</Text>
        <Text className='!text-black/70 !font-bold !text-[17px]'>{formatCurrency(currentUser?.assetBalance + currentUser?.freezedAmount + currentUser?.commission)}</Text>
      </>
    }
    classes={{
      modalContentClassName: 'bg-white min-h-28 !p-0 !pb-3',
      headerClassName: {
        containerClassName: 'px-2 py-2 !items-center bg-main-gray',
        titleClassName: 'uppercase w-full',
      },
    }}
    placement="center"
    open={openAccountModal}
    onClose={() => setOpenAccountModal(false)}
  >
    <div className="relative px-2">
      <div className='mb-4 grid grid-cols-2 grid-rows-subgrid'>
        <Card imgSrc="/img/acc-commission.png" imgAlt="commission" bgColor="bg-[#ca6e00]" title="Commission Today" amount={currentUser?.commission} />
        <Card imgSrc="/img/acc-freeze-amt.png" imgAlt="freeze" bgColor="bg-[#3c3c3c]" title="Freeze Amount" amount={currentUser?.freezedAmount} />
        <Card imgSrc="/img/acc-balance.png" imgAlt="balance" bgColor="bg-[#007f94]" title="Account Balance" amount={currentUser?.assetBalance} />
        <Card imgSrc="/img/acc-trial.png" imgAlt="trial" bgColor="bg-[#703999]" title="Trial Money" amount={currentUser?.trialBonus} />
      </div>
      <div className='space-y-2'>
        <LinkButton href="account/withdrawal" imgSrc="/img/with.png" imgAlt="withdrawal" title="Withdrawal" />
        <LinkButton href="help/r&r" imgSrc="/img/rule.png" imgAlt="rule" title="Rules" />
        <LinkButton href="https://wa.me/cyn56780" imgSrc="/img/whatsapp-customer.png" imgAlt="whatsapp" bgColor="bg-[#00ad43]" title="Whatsapp" />
        <LinkButton href="https://t.me/cyn56780" imgSrc="/img/telegram-customer.png" imgAlt="telegram" bgColor="bg-[#00ade1]" title="Telegram" />
      </div>
    </div>
  </Modal>
)}

export default AccountModal;