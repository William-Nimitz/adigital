import React, { useState } from 'react'
import Calendar from 'react-calendar'
import {
  Dropdown,
  Input,
  Button,
  Text,
  MultiLineInput,
  Question,
  TimeDisplayer,
  handleDate,
  CheckboxWithChild,
  openToast,
  toastType,
} from '@components/common'

import { status } from '@constants/config'

import UserIcon from '@images/icons/user.svg'
import EmailIcon from '@images/icons/email.svg'
import LeftArrow from '@images/icons/left-arrow.svg'
import RightArrow from '@images/icons/right-arrow.svg'
import PencilAlt from '@images/icons/pencilAlt.svg'

const RequestModal = (props) => {
  const { defaultValues, subject, setCloseModal, handleData } = props

  const nativeCheckboxes = [
    { key: 'YouTube', checked: false },
    { key: 'Twitter', checked: false },
    { key: 'Facebook', checked: false },
    { key: 'Facebook stories', checked: false },
    { key: 'Snapchat Stories', checked: false },
    { key: 'YouTube Stories', checked: false },
  ]

  const amplificationCheckboxes = [
    { key: 'Twitter Retweet', checked: false },
    { key: 'YouTube Stories', checked: false },
    { key: 'YouTube Playlist', checked: false },
  ]

  const [formValues, setFormValues] = useState({
    id: defaultValues?.id || '',
    userName: defaultValues?.userName || '',
    userEmail: defaultValues?.userEmail || '',
    additionalStakeholder: defaultValues?.additional_stakeholder_emails || '',
    title: defaultValues?.title || '',
    startDate: defaultValues?.startDate || '',
    endDate: defaultValues ? defaultValues?.endDate : '',
    embargo: defaultValues?.embargo || '',
    embargo_time: defaultValues?.embargo_time || '',
    xgp: defaultValues?.xgp || '',
    xgp_how: defaultValues?.xgp_how || '',
    goal: defaultValues?.goal || '',
    description: defaultValues?.description || '',
    additional_requests: defaultValues?.additional_requests || '',
    priority_between_beats: defaultValues?.priority_between_beats || '',
    native: defaultValues?.native || '',
    amplification: defaultValues?.amplification || '',
    reactive: defaultValues?.reactive || '',
  })

  const [startDateRange, setStartDateRange] = useState(new Date())
  const [endDateRange, setEndDateRange] = useState(new Date())

  const checkLastDayOfMonth = (val) => {
    const start = val
    const choosedMonth = val.getMonth()
    start.setDate(start.getDate() + 1)
    return start.getMonth() !== choosedMonth
  }

  const calcStateDateRange = (val, key) => {
    if (val.lengh === 1) {
      setFormValues({
        ...formValues,
        startDate: val,
      })
      return
    }
    const _start = val[0]
    const _end = val[1]
    setStartDateRange([_start, _end])
    setFormValues({
      ...formValues,
      startDate: _start,
    })
  }

  const calcEndDateRange = () => {}

  const onChangeDate = (val, se) => {
    const dd = handleDate(val)

    if (se === 'start') {
      setFormValues({
        ...formValues,
        support_range_start: dd,
      })
    }

    if (se === 'end') {
      setFormValues({
        ...formValues,
        support_range_end: dd,
      })
    }
  }

  const handleFormValues = (val, key) => {
    setFormValues({
      ...formValues,
      [key]: val,
    })
  }

  const randomStr = () => {
    const rand = 100000 + Math.floor(1000000 * Math.random())
    return rand
  }

  const handleCreateRequest = () => {
    const id = randomStr()
    const values = {
      ...formValues,
      id: id,
      // date_created: handleDate(new Date()),
      // last_updated: handleDate(new Date()),
      // support_range:
      //   formValues?.support_range_start + ' - ' + formValues?.support_range_end,
      // status: formValues.status.key,
      // status_text: formValues.status.value,
    }

    // setFormValues(values)
    handleData(values)
    setCloseModal(null)
    openToast({
      content: 'Request archived!',
      closed: true,
      status: toastType.SUCCESS,
    })
  }

  return (
    <div className="w-full px-8x  tablet:w-[664px]">
      <Input
        required
        style="primary"
        label="Your Name"
        placeholder="Input text"
        value={formValues?.userName}
        onChange={(val) => handleFormValues(val, 'userName')}
        icon={<UserIcon />}
        moreLabelStyles="!mt-3"
        moreStyles="w-full"
        moreStylesWrapper="w-full !mt-1  mb-8x h-[42px] placeholder:text-gray-400 border border-1 border-gray-300 dark:border-gray-600"
      />
      <Input
        required
        style="primary"
        label="Email"
        placeholder="Input text"
        value={formValues?.userEmail}
        icon={<EmailIcon />}
        onChange={(val) => handleFormValues(val, 'userEmail')}
        moreLabelStyles="!mt-3"
        moreStyles="w-full"
        moreStylesWrapper="w-full !mt-1 mb-8x h-[42px] placeholder:text-gray-400 border border-1 border-gray-300 dark:border-gray-600"
      />
      <Input
        style="primary"
        label="Additional Stakeholder Emails"
        placeholder="Input text"
        value={formValues?.additionalStakeholder}
        icon={<EmailIcon />}
        onChange={(val) => handleFormValues(val, 'additionalStakeholder')}
        moreLabelStyles="!mt-3"
        moreStyles="w-full"
        moreStylesWrapper="w-full !mt-1 mb-8x h-[42px] placeholder:text-gray-400 border border-1 border-gray-300 dark:border-gray-600"
      />
      <Input
        required
        style="primary"
        label="Request Title"
        placeholder="Input text"
        value={formValues?.title}
        onChange={(val) => handleFormValues(val, 'title')}
        moreLabelStyles="!mt-3"
        moreStyles="w-full"
        moreStylesWrapper="w-full !mt-1 mb-8x h-[42px] placeholder:text-gray-400 border border-1 border-gray-300 dark:border-gray-600"
      />
      <div className="mt-[0px]">
        <Text style="primary" moreStyles="text-base">
          Desired Support Range
        </Text>
        <div className="mt-3x mb-8x flex flex-col items-center justify-between rounded-[8px] bg-gray-100 p-4x dark:bg-gray-700 tablet:flex-row">
          <div className="flex flex-col items-center">
            <Calendar
              defaultView="month"
              returnValue="range"
              selectRange={true}
              allowPartialRange={true}
              goToRangeStartOnSelect={false}
              nextLabel={<RightArrow />}
              prevLabel={<LeftArrow />}
              onChange={(val) => calcStateDateRange(val, 'start')}
              value={startDateRange}
              className="first-choose-calandar h-[232px] w-[268px] border-none bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white-200"
            />
            <Button
              tabIndex="0"
              aria-label="Save Changes Button"
              text="Today"
              style="primary"
              moreStyles="mt-4x w-full px-5 py-2.5 !p-2.5 mb-3 tablet:mr-3 tablet:mb-0 tablet:border-none"
            />
          </div>
          <div className="flex flex-col items-center">
            <Calendar
              defaultView="month"
              returnValue="range"
              selectRange={true}
              allowPartialRange={true}
              goToRangeStartOnSelect={false}
              nextLabel={<RightArrow />}
              prevLabel={<LeftArrow />}
              onChange={(val) => calcEndDateRange(val, 'end')}
              value={endDateRange}
              className="last-choose-calandar h-[232px] w-[268px] border-none bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white-200"
            />
            <Button
              tabIndex="0"
              aria-label="Save Changes Button"
              text="Clear"
              style="gray"
              moreStyles="mt-4x w-full px-5 py-2.5 !p-2.5 mb-3 tablet:mr-3 tablet:mb-0 tablet:border-none"
            />
          </div>
        </div>
      </div>
      <Question
        required
        checked={false}
        help={'test test'}
        questionText="Is this post tied to an embargo time?"
      />
      <TimeDisplayer first={'00'} last={'12'} moreStyles="mt-6x" />
      <Question
        required
        checked={false}
        help={'test test'}
        questionText="Is this post tied to an embargo time?"
        moreStyles="mt-8x"
      />
      <MultiLineInput
        required
        label="How?"
        placeholder="Write text here ..."
        moreStyles="mt-6x"
        content={formValues?.xgp_how}
        onChange={(val) => handleFormValues(val, 'xgp_how')}
        textAreaMoreStyles="w-full h-[185px]"
      />
      <MultiLineInput
        required
        label={`What is the goal for Xbox's supporting of this content?`}
        placeholder="Write text here ..."
        moreStyles="mt-6x"
        content={formValues?.goal}
        onChange={(val) => handleFormValues(val, 'goal')}
        textAreaMoreStyles="w-full h-[185px]"
      />
      <MultiLineInput
        required
        label="Can you please give an clear and informative description of the content:"
        placeholder="Write text here ..."
        value=""
        moreStyles="mt-6x mb-6x"
        content={formValues?.description}
        onChange={(val) => handleFormValues(val, 'description')}
        textAreaMoreStyles="w-full h-[185px]"
      />
      <Text required>
        Is this a request for native, amplification, or reactive? Select all
        that apply.
      </Text>
      <CheckboxWithChild
        checked={true}
        label={'Native Support'}
        childs={nativeCheckboxes}
        moreStyles="mt-[25px]"
      />

      <CheckboxWithChild
        checked={false}
        label={'Amplification via'}
        childs={amplificationCheckboxes}
        moreStyles="mt-[25px]"
      />

      <CheckboxWithChild
        checked={false}
        label={'Reactive'}
        child={'File or Link to asset'}
        moreStyles="mt-[25px]"
      />

      <div className="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
        {subject === 'updateRequest' && (
          <div className="flex w-full flex-col justify-between md:flex-row">
            <Button
              text="Save Changes"
              style="primary"
              tabIndex="0"
              aria-label="Submit Request Button"
              moreStyles="w-full !max-w-none px-5 py-2.5 !p-2.5 mb-3 tablet:mr-3 tablet:mb-0 tablet:border-none"
              onClick={handleCreateRequest}
            />
            <Button
              text="Cancel"
              style="gray"
              tabIndex="0"
              aria-label="Submit Request Button"
              moreStyles="w-full !max-w-none px-5 py-2.5 !p-2.5 mb-3 tablet:mr-3 tablet:mb-0 tablet:border-none bg-gray-700"
              onClick={() => setCloseModal(null)}
            />
          </div>
        )}
        {subject === 'createNewRequest' && (
          <div className="flex w-full flex-col justify-between md:flex-row">
            <Button
              text="Submit Request"
              style="primary"
              tabIndex="0"
              aria-label="Submit Request Button"
              moreStyles="w-full !max-w-none px-5 py-2.5 !p-2.5 mb-3 tablet:mr-3 tablet:mb-0 tablet:border-none"
              onClick={handleCreateRequest}
            />
            <Button
              text="Cancel"
              style="gray"
              tabIndex="0"
              aria-label="Submit Request Button"
              moreStyles="w-full !max-w-none px-5 py-2.5 !p-2.5 mb-3 tablet:mr-3 tablet:mb-0 tablet:border-none bg-gray-700"
              onClick={() => setCloseModal(null)}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default RequestModal
