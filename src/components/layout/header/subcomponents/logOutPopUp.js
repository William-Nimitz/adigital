import React, { useState } from 'react'
import Avatar from '@images/users/avatar.svg'
import { Text } from '@components/common'

const LogOutPopUp = () => {
  const userName = 'Jeremy'
  return (
    <>
      <div className="cursor-pointer bg-gray-500 px-5x py-2.5x dark:bg-gray-600">
        <Text style="primary" moreStyles="text-base text-white-200">
          Log Out
        </Text>
      </div>
    </>
  )
}

export default LogOutPopUp
