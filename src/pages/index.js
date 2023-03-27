import React, { useState } from 'react'
import useMediaQuery from '@hooks/useMediaQuery'

import Layout from '@components/layout'
import { ReqeustActions, RequestsTable } from '@containers/home'

import { SEO, Modal, toastType, openToast } from '@components/common'

import RequestModal from '@components/common/modals/requestModal'
import requests from '@constants/requests.json' // stubbed data

const IndexPage = (props) => {
  const pageName = 'home'
  const pageTitle = 'Xbox Social Intake Form'
  const sm = useMediaQuery(`(min-width: 640px)`)

  const [openModal, setOpenModal] = useState(null)
  const [search, setSearch] = useState('')
  const [extraData, setExtraDate] = useState([])

  const openCreateNewRequest = (val) => {
    setOpenModal(val)
  }

  const getModalTitle = () => {
    if (openModal === 'createNewRequest') {
      return 'Create New Request'
    }
    return ''
  }

  const handleExtraData = (val) => {
    // openToast({
    //   content: 'New request submitted!',
    //   closed: true,
    //   status: toastType.SUCCESS,
    // })
    setExtraDate([...extraData, val])
  }

  return (
    <Layout handler={openCreateNewRequest}>
      <SEO title={pageTitle} />
      <ReqeustActions
        handler={openCreateNewRequest}
        setSearch={setSearch}
        search={search}
        sm={sm}
      />
      <RequestsTable
        sm={sm}
        search={search}
        requests={requests}
        extraData={extraData}
      />
      {openModal ? (
        <Modal
          title={getModalTitle()}
          closeHandler={setOpenModal}
          opend={openModal}
          content={
            <RequestModal
              subject={openModal}
              setCloseModal={setOpenModal}
              handleData={handleExtraData}
            />
          }
        />
      ) : null}
    </Layout>
  )
}

export default IndexPage
