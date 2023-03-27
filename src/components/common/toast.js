import React, { useRef, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Check, X } from 'react-feather'
import Checked from '@images/icons/checked.svg'

import { Text } from '@components/common'

const toastType = {
  SUCCESS: 'success',
  ERROR: 'error',
  DEFAULT: 'default',
}

const toastOptions = {
  position: 'bottom-center',
  duration: 3000,
  autoClose: true,
}

const closeToast = () => {
  toast.dismiss()
}

const CheckedWrapper = () => (
  <div className="inline-flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-green-600 dark:bg-green-850 dark:text-white-200">
    <Checked />
  </div>
)

const Content = (props) => {
  const toastRef = useRef(null)

  const textColors = {
    success: 'text-green-600 dark:text-white-200',
    default: 'text-white-500',
  }
  const { status, symbol, content, closed } = props
  const textCol = textColors[status]
  const closedIconCol = 'text-green-600 dark:text-green-600'

  useEffect(() => {
    const handleCloseOutside = (event) => {
      if (toastRef.current && !toastRef.current.contains(event.target)) {
        toast.dismiss()
      }
    }
    window.addEventListener('mouseup', handleCloseOutside)

    return () => {
      window.removeEventListener('mouseup', handleCloseOutside)
    }
  }, [])

  return (
    <div
      ref={toastRef}
      className={`flex h-[51.2px] items-center justify-between rounded-[6px] border border-green-200 bg-white-200 pl-3x pr-5x dark:border-green-800 dark:bg-green-500 ${'w-full'}`}
    >
      <div>
        <CheckedWrapper />
        <Text style="primary" moreStyles={`${textCol} ml-2.5`}>
          {content}
        </Text>
      </div>
      {closed ? (
        <X
          size={24}
          className={`${closedIconCol} cursor-pointer`}
          onClick={closeToast}
        />
      ) : null}
    </div>
  )
}

const openToast = (props) => {
  const _toastOptions = {
    ...toastOptions,
    position: props?.position || toastOptions.position,
    duration: props?.duration || toastOptions.position,
  }
  toast.custom(<Content {...props} />, _toastOptions)
}

export { toastType, openToast, Content }
