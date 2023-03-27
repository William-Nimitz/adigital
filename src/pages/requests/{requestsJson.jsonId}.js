import React, { useState } from 'react'
import Calendar from 'react-calendar'
import PropTypes from 'prop-types'
import Layout from '@components/layout'
import { Modal, Input, SEO, Dropdown, Text, Button } from '@components/common'
import RequestModal from '@components/common/modals/requestModal'
import EditRequestModal from '@components/common/modals/editRequestModal'
import ArchiveRequestModal from '@components/common/modals/archiveRequestModal'

import { navigate, graphql } from 'gatsby'
import Logo from '@images/xbox_logo.svg'

import LeftArrow from '@images/icons/leftarrow.svg'
import Roading from '@images/icons/roading.svg'
import Archive from '@images/icons/archive.svg'

import { status, StatusEum } from '@constants/config'
import useMediaQuery from '@hooks/useMediaQuery'

const requestsDashboard = ({ data }) => {
  const defaultValues = data?.requestsJson
  const isTableChanged = useMediaQuery(`(min-width: 640px)`)
  const handleFormValues = () => {}
  const [openModal, setOpenModal] = useState(null)

  const getModalTitle = () => {
    if (openModal === 'createNewRequest') {
      return 'Create New Request'
    }
    if (openModal === 'updateRequest') {
      return 'Edit Request'
    }
    if (openModal === 'archive') {
      return ''
    }
    return ''
  }

  return (
    <Layout>
      <section className="relative flex h-full flex-col overflow-x-auto bg-white-200 dark:bg-gray-600">
        <div className="flex flex-row items-center justify-between p-4 py-5 dark:bg-gray-800">
          <Button
            tabIndex="0"
            aria-label="Back Button"
            icon={<LeftArrow />}
            text={'Back'}
            style="primary"
            onClick={() => navigate('/')}
            moreStyles="tablet:w-fit sm:px-5 sm:py-2.5 !p-2.5 tablet:!px-5 ml-3 tablet:mr-3 tablet:ml-0 border border-1 border-[#4DAE4F] tablet:border-none"
          />
          <div className="flex w-[400px] items-center justify-between">
            <Button
              icon={<Roading />}
              text={isTableChanged ? 'Edit Request' : 'Edit'}
              style="primary"
              tabIndex="0"
              aria-label="Edit Request Button Button"
              onClick={() => setOpenModal('updateRequest')}
              moreStyles="w-full sm:px-5 sm:py-2.5 !p-2.5 ml-3 tablet:mr-3 tablet:ml-0 border border-1 border-[#4DAE4F] tablet:border-none"
            />
            <Button
              icon={<Archive />}
              text={isTableChanged ? 'Archive Request' : 'Archive'}
              style="primary"
              tabIndex="0"
              aria-label="Archive Request Button"
              onClick={() => setOpenModal('archive')}
              moreStyles="w-full sm:px-5 sm:py-2.5 !p-2.5 ml-3 tablet:mr-3 tablet:ml-0 border border-1 border-[#4DAE4F] tablet:border-none"
            />
          </div>
        </div>
        <div className="h-full-n-scroll overflow-y-auto bg-white-100 py-[25px] px-[50px] dark:bg-gray-700">
          <div className="mb-9 flex flex-col  items-center text-center">
            <div>
              <Logo className="mt-7 w-[64px] cursor-pointer" />
            </div>
            <Text moreStyles="text-3xl mt-4">Social Intake Form</Text>
            <Text moreStyles="text-4xl tablet:text-5xl uppercase font-bold mt-10 mb-3 ">
              Project Title Name
            </Text>
            <Text moreStyles="uppercase text-xl font-light">
              Project Code: {defaultValues?.jsonId}
            </Text>
            {/* <Text>{requestContent?.request_name}</Text>
            <Text>{requestContent?.request_name}</Text> */}
          </div>
          {/* <div>
            <Input
              style="primary"
              label="Name"
              placeholder="Enter Your Name"
              value={requestContent?.user_name}
              disabled
              onChange={(val) => {}}
              moreLabelStyles="!mt-3 bg-gray-100 dark:bg-gray-700 p-1 pl-4 !mb-0"
              moreStyles="w-full  !bg-transparent text-2xl placeholder:text-gray-400 text-white-200 dark:text-white-200"
              moreStylesWrapper="w-full !mt-0  !bg-transparent !p-0 mb-10"
            />
            <Input
              style="primary"
              label="Email"
              placeholder="Enter Email"
              disabled
              value={requestContent?.user_email}
              onChange={(val) => handleFormValues(val, 'user_email')}
              moreLabelStyles="!mt-3 bg-gray-100 dark:bg-gray-700 p-1 pl-4 !mb-0"
              moreStyles="w-full  !bg-transparent placeholder:text-gray-400 text-2xl text-white-200 dark:text-white-200"
              moreStylesWrapper="w-full !mt-0  !bg-transparent !p-0 mb-10"
            />

            <Input
              required
              style="primary"
              label="Additional Stakeholder Emails"
              disabled
              placeholder="Enter Additional Stakeholder Emails"
              value={requestContent?.request_name}
              onChange={(val) => handleFormValues(val, 'request_name')}
              moreLabelStyles="!mt-3 bg-gray-100 dark:bg-gray-700 p-1 pl-4 !mb-0"
              moreStyles="w-full  !bg-transparent placeholder:text-gray-400 text-2xl text-white-200 dark:text-white-200"
              moreStylesWrapper="w-full !mt-0 !bg-white-200 dark:!bg-gray-500 !p-0 mb-5 rounded-none"
              messageText="Last edited 02/02/2023 at 12:30"
              messageTextStyles="text-yellow-50 text-smm !-mt-6 block p-4 pt-0 !bg-white-200 dark:!bg-gray-500 mb-10"
            />
          </div> */}
          <EditRequestModal
            defaultValues={defaultValues}
            subject="CreateNewRequest"
            setCloseModal={() => {}}
            handleDate={() => {}}
          />
        </div>
      </section>
      {openModal ? (
        <Modal
          title={getModalTitle()}
          closeHandler={setOpenModal}
          opend={openModal}
          wrapperMoreStyles=""
          modalH={openModal === 'updateRequest' ? 'h-[82.5vh]' : 'h-[25vh]'}
          content={
            openModal === 'updateRequest' ? (
              <RequestModal
                subject={openModal}
                setCloseModal={setOpenModal}
                handleData={() => {}}
              />
            ) : (
              <ArchiveRequestModal
                subject={openModal}
                setCloseModal={setOpenModal}
                handleData={() => {}}
              />
            )
          }
        />
      ) : null}
    </Layout>
  )
}

requestsDashboard.propTypes = {}

export default requestsDashboard

export const query = graphql`
  query ($jsonId: String) {
    requestsJson(jsonId: { eq: $jsonId }) {
      jsonId
      createdAt
      updatedAt
      userId
      userName
      userEmail
      status
      startDate
      endDate
      title
      embargo
      embargo_time
      additional_stakeholder_emails
      xgp
      xgp_how
      goal
      description
      additional_requests
      priority_between_beats
      request_strategy
      native
      amplification
      reactive
    }
  }
`
