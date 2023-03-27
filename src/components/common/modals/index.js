import React, { useRef, useEffect } from 'react'
import Close from '@images/icons/close.svg'

const Modal = ({
  title = '',
  content = null,
  opened = null,
  moreStylesWrapper,
  moreStylesWrapperBox,
  moreStylesBox,
  closeHandler,
  modalH = '',
}) => {
  const modalRef = useRef(null)
  useEffect(() => {
    const handleCloseOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeHandler(null)
      }
    }
    window.addEventListener('mouseup', handleCloseOutside)

    return () => {
      window.removeEventListener('mouseup', handleCloseOutside)
    }
  }, [])

  return (
    <div
      id="defaultModal"
      tabIndex="-1"
      aria-hidden="true"
      className={`fixed top-0 left-0 right-0 z-50 grid w-full place-items-center overflow-y-auto overflow-x-hidden bg-[#0007] md:inset-0  md:p-4 ${moreStylesWrapper}`}
    >
      <div
        ref={modalRef}
        className={`fixed bottom-0 grid w-full md:relative md:block md:h-auto  md:max-w-[915px] ${moreStylesWrapperBox}`}
      >
        {/* <!-- Modal content --> */}

        <div className="relative -mb-[0.15rem] flex cursor-pointer items-center justify-end rounded-t-lg bg-white-200 p-4x shadow dark:bg-gray-600">
          <Close
            className="h-6x w-6x text-white-200"
            onClick={() => closeHandler(null)}
          />
        </div>
        <div
          className={`relative flex flex-col justify-between rounded-b-lg bg-white-200 pr-4x shadow dark:bg-gray-600 md:block ${moreStylesBox}`}
        >
          <div className={`${modalH ? modalH : 'h-[82.5vh]'} overflow-y-auto`}>
            {/* <!-- Modal header --> */}

            {title && (
              <div className="relative ml-5 mb-5x flex items-center justify-center rounded-t dark:border-gray-600">
                <h3 className="w-full text-center text-xl font-semibold normal-case not-italic text-gray-900 dark:text-white-200">
                  {title}
                </h3>
              </div>
            )}
            {/* <!-- Modal body --> */}
            {content}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
