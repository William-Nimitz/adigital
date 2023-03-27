import React from 'react'
import { Text, BadgeStatus } from '@components/common'
import { requestStatus } from '@constants/config'
const mobileColumn = ({ item, handleClick }) => {
  return (
    <div
      className="w-full cursor-pointer border-b-2 border-gray-300 bg-white-200 dark:border-gray-500 dark:bg-gray-800"
      onClick={handleClick}
    >
      <div className="flex p-[15px]">
        <div className="border-light-gray mr-3 border-r-2 pr-3 text-gray-700 dark:text-white-100">
          <span className="text-[14px] text-gray-400">ID: </span>
          <Text>{item.id}</Text>
        </div>

        <Text>{item.userName}</Text>
      </div>

      <div className="flex items-center justify-between bg-gray-100 p-[15px] dark:bg-gray-700">
        <div className="text-[14px] dark:text-gray-300">
          {`${item.startDate} - ${item.endDate}`}
        </div>

        <BadgeStatus
          text={requestStatus[item.status]?.value}
          style={item.status}
        />
      </div>
    </div>
  )
}

export default mobileColumn
