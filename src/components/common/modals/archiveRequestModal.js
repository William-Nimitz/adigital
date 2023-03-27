import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { toastType, openToast } from '@components/common'
import { Button, Text } from '@components/common'

const ArchiveRequestModal = (props) => {
  const { setCloseModal } = props
  const setArchiveRequest = () => {
    setCloseModal(null)
    openToast({
      content: 'Request archived!',
      closed: true,
      status: toastType.SUCCESS,
    })
    navigate('/')
  }
  return (
    <div className="archive-request-modal w-full px-8x">
      <div className="archive-request-modal-header mb-12x text-center">
        <Text moreStyles="text-xl4 text-center !block mb-2x">
          Are you sure you want to archive?
        </Text>
        <Text moreStyles="text-xl !block">This action can be undone</Text>
      </div>
      <div className="archive-request-modal-action flex items-center justify-between">
        <Button
          tabIndex="0"
          aria-label="Save Changes Button"
          text="Cancel"
          style="darkBlue"
          onClick={() => setCloseModal(null)}
          moreStyles="mt-4x w-full !max-w-none px-5 py-2.5 !p-2.5 mb-3 tablet:mr-3 tablet:mb-0 tablet:border-none"
        />
        <Button
          tabIndex="0"
          aria-label="Save Changes Button"
          text="Archive"
          style="primary"
          onClick={setArchiveRequest}
          moreStyles="mt-4x w-full !max-w-none px-5 py-2.5 !p-2.5 mb-3 tablet:mr-3 tablet:mb-0 tablet:border-none"
        />
      </div>
    </div>
  )
}

export default ArchiveRequestModal
