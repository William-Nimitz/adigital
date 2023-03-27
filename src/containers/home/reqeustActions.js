import React from 'react'

import PlusIcon from '@images/icons/plus.svg'
import SearchIcon from '@images/icons/search.svg'
import CloseIcon from '@images/icons/close.svg'

import { Input, Button } from '@components/common'

const ReqeustActions = ({ handler, search, setSearch, sm }) => {
  return (
    <div className="flex h-18x flex-row-reverse items-center justify-between p-4 py-5 dark:bg-gray-800 tablet:flex-row">
      <Button
        tabIndex="1"
        ariaLabel="New Requests Button"
        icon={<PlusIcon />}
        text={sm ? 'New Requests' : ''}
        style="primary"
        onClick={() => {
          handler('createNewRequest')
        }}
        moreStyles="ml-3 tablet:mr-3 tablet:ml-0 border border-1 border-green-50 tablet:border-none"
      />
      <Input
        icon={<SearchIcon />}
        rightIcon={
          search !== '' ? <CloseIcon className="text-gray-400" /> : null
        }
        rightAction={() => setSearch('')}
        style="primary"
        value={search}
        placeholder="Filter by ID or Requests"
        onChange={setSearch}
        moreStyles="w-full py-0"
        moreStylesWrapper="w-full tablet:max-w-[325px] border border-1 border-gray-300 dark:border-gray-600"
      />
    </div>
  )
}

export default ReqeustActions
