import React from 'react'
import { BiCalendarExclamation } from "react-icons/bi";

const EmptyBox = () => {
  return (
    <div className='h-[330px] w-full flex flex-col items-center justify-center gap-3 text-center text-muted-foreground'>
      <span className="flex justify-center">
      <BiCalendarExclamation className="w-20 h-20 " />
      </span>
      <span>Date is not selected</span>
    </div>
  )
}

export default EmptyBox