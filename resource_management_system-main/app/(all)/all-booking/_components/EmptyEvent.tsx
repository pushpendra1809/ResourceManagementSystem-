import React from 'react'
import { FaCalendarTimes } from "react-icons/fa";
import { FaRegCalendarXmark } from 'react-icons/fa6';

const EmptyEvent = () => {
  return (
    <div className='h-[300px] w-full flex flex-col items-center justify-center gap-3 text-center text-muted-foreground'>
      <span className="flex justify-center">
        <FaRegCalendarXmark className="w-16 h-16 " />
      </span>
      <span>No Resource Booked</span>
    </div>
  )
}

export default EmptyEvent