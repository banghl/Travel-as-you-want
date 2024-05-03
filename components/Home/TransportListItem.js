import React from 'react';
import Image from 'next/image';
import { HiUser } from "react-icons/hi2";

function TransportListItem({ transport, distance, estimatedTime }) {
  const calculatedAmount = distance ? (transport.amount * distance).toFixed(2) : 'N/A';

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-5'>
          <Image src={transport.image} width={130} height={150} />
          <div>
            <h2 className='font-semibold text-[18px] flex gap-3'>{transport.name}</h2>
            <span className='flex gap-2 font-normal text-[14px] items-center'>
               <HiUser/>{transport.seat}
            </span>
            <p>{transport.desc}</p>
            <p>Estimated Time: {estimatedTime}</p>
          </div>
          <h2 className='font-semibold text-[18px]'>
            ${calculatedAmount}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default TransportListItem;
