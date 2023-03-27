import React, { useState } from 'react'
import Input from './input'

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export const Text = ({
  style = 'primary',
  moreStyles = '',
  children = '',
  required,
}) => {
  const textStyles = {
    primary:
      'font-inter not-italic inline text-gray-800 dark:text-white-200 text-sm',
    helpIcon:
      'font-inter not-italic inline text-gray-600 dark:text-gray-600 text-smsb',
    primaryGray:
      'font-inter not-italic inline text-gray-400 dark:text-gray-400 text-sm',
    thStyle:
      'font-inter not-italic inline text-gray-800 dark:text-gray-400 text-xssb',
    navlink: 'font-inter not-italic inline text-base',
    header: 'font-inter not-italic text-white-200 text-lg',
    red: 'font-inter not-italic inline text-red-800 text-smm',
  }

  return (
    <>
      <div className={`${textStyles[style]} ${moreStyles}`}>{children}</div>
      {required ? <div className={`${textStyles['red']} ml-1x`}>*</div> : ''}
    </>
  )
}

export const MultiLineInput = ({
  style = 'primary',
  label,
  moreStyles = '',
  textAreaMoreStyles = '',
  content = '',
  placeholder = '',
  required,
  onChange,
}) => {
  const inputStyles = {
    primary:
      'font-inter not-italic text-gray-500 dark:text-gray-400 text-sm bg-gray-100 dark:bg-gray-700 px-1x border-0 focus:border-0 disabled:!bg-gray-500 disabled:!text-white-200 disabled:placeholder:text-white-200',
    header: 'font-inter not-italic text-white-200 text-sm',
  }

  return (
    <div className={`${moreStyles}`}>
      {label ? (
        <div className="mb-[12px] !block">
          <Text>{label}</Text>
          {required ? (
            <Text style="red" moreStyles="ml-1x">
              *
            </Text>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
      <textarea
        className={`${inputStyles[style]} ${textAreaMoreStyles}`}
        placeholder={placeholder}
        value={content}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export const Question = (props) => {
  const {
    style = 'primary',
    moreStyles = '',
    questionText,
    required,
    help,
    checked,
    additional,
  } = props

  const [status, setStatus] = useState(checked)

  const onChange = (val) => {
    setStatus(val)
  }
  const questionStyles = {
    primary: 'p-2.5x',
    primaryGray:
      'font-inter not-italic inline text-gray-400 dark:text-gray-400 text-sm',
    thStyle:
      'font-inter not-italic inline text-gray-800 dark:text-gray-400 text-xssb',
    navlink: 'font-inter not-italic inline text-base',
    header: 'font-inter not-italic text-white-200 text-lg',
    red: 'font-inter not-italic inline text-red-800 text-smm',
  }

  const optionStyle = 'w-4x h-4x border rounded-full border-[3.5px]'
  return (
    <div className={`${questionStyles[style]} ${moreStyles}`}>
      <div className="mb-[25px] flex items-center justify-start">
        <Text>{questionText}</Text>
        {required ? (
          <Text style="red" moreStyles="ml-1x">
            *
          </Text>
        ) : (
          ''
        )}
        {help ? (
          <Text
            style="helpIcon"
            moreStyles="w-4x h-4x ml-2.5x bg-gray-400 rounded-full flex justify-center items-center"
          >
            ?
          </Text>
        ) : (
          ''
        )}
      </div>
      <div className="flex flex-col justify-center">
        <div
          className="custom-checkbox mb-6x flex cursor-pointer items-center justify-start"
          onClick={() => onChange(false)}
        >
          <div
            className={`${optionStyle} ${
              status === true
                ? 'border-gray-700 bg-gray-700'
                : 'border-green-200 bg-white-200'
            }`}
          >
            &nbsp;
          </div>
          <Text moreStyles="ml-2x">No</Text>
        </div>
        <div
          className="custom-checkbox flex cursor-pointer items-center justify-start"
          onClick={() => onChange(true)}
        >
          <div
            className={`${optionStyle} ${
              status === false
                ? 'border-gray-700 bg-gray-700'
                : 'border-green-200 bg-white-200'
            }`}
          >
            &nbsp;
          </div>
          <Text moreStyles="ml-2x">Yes</Text>
        </div>
      </div>
      {additional ? additional : ''}
    </div>
  )
}

export const TimeDisplayer = (props) => {
  const { moreStyles = '' } = props
  const { first, last } = props
  const [firstTime, setFirstTime] = useState(first || '00')
  const [lastTime, setLastTime] = useState(last || '00')

  const onFirstChange = (val) => {
    setFirstTime(val)
  }

  const onLastChange = (val) => {
    setLastTime(val)
  }

  return (
    <div className={`flex items-center justify-start ${moreStyles}`}>
      <input
        type="text"
        className={`h-[42px] w-[50px] rounded-[8px] border-none bg-gray-100 px-3x py-4x text-center text-smm text-gray-400 dark:bg-gray-700`}
        placeholder={'00'}
        onChange={(e) => onFirstChange(e.target.value)}
        value={firstTime}
      />
      <Text moreStyles="text-center text-lg w-[19px]"> : </Text>
      <input
        type="text"
        className={`h-[42px] w-[50px] rounded-[8px] border-none bg-gray-100 px-3x py-4x text-center text-smm text-gray-400 dark:bg-gray-700`}
        placeholder={'00'}
        onChange={(e) => onLastChange(e.target.value)}
        value={lastTime}
      />
    </div>
  )
}

export const CheckboxWithChild = (props) => {
  const { checked, label, childs, moreStyles = '', child } = props

  const [status, setStatus] = useState(checked)
  const [inputValue, setInputValue] = useState()

  const _setStatus = (val) => {
    setStatus(val)
  }

  const ChildCheckbox = (props) => {
    const { content } = props
    const [status, setStatus] = useState(content?.checked)

    const _setStatus = (val) => {
      setStatus(val)
    }

    return (
      <div className={`mb-6x block`} onClick={() => _setStatus(!status)}>
        <input
          type="checkbox"
          className={`rounded-[4px] border-none ${
            status ? '!bg-green-200' : '!bg-gray-800'
          }`}
          onChange={() => {}}
          checked={status}
        />
        <label
          className={`text-inter ml-2x text-smm text-gray-900 dark:text-white-200`}
        >
          {content?.key}
        </label>
      </div>
    )
  }

  return (
    <div className={`${moreStyles}`}>
      <div className={`inline`} onClick={() => _setStatus(!status)}>
        <input
          type="checkbox"
          className={`rounded-[4px] border-none ${
            status ? '!bg-green-200' : '!bg-gray-800'
          }`}
          onChange={() => {}}
          checked={status}
        />
        <label
          className={`text-inter ml-2x text-smm text-gray-900 dark:text-white-200`}
        >
          {label}
        </label>
      </div>
      {childs?.length > 0 && status && (
        <div className="child-checkboxes mt-2x flex flex-col justify-start bg-gray-100 p-4x pl-[18px] dark:bg-gray-700">
          {childs.map((child) => (
            <ChildCheckbox
              key={`child-check-box-${child.key}`}
              content={child}
            />
          ))}
        </div>
      )}

      {child && status && (
        <div className="child-checkboxes mt-2x flex flex-col justify-start bg-gray-100 p-4x pl-[18px] dark:bg-gray-700">
          <Input
            style="primary"
            placeholder={child}
            value={inputValue}
            onChange={(val) => setInputValue(val)}
            moreLabelStyles="!mt-3"
            moreStyles="w-full"
            moreStylesWrapper="w-full !mt-1 mb-8x h-[42px] placeholder:text-gray-400 border border-1 border-gray-300 dark:border-gray-600"
          />
        </div>
      )}
    </div>
  )
}
export const handleDate = (dd) => {
  const dat = new Date(dd)

  const year = dd.getFullYear()
  const month = dd.getMonth()
  const date = ('0' + dd.getDate()).slice(-2)

  const _dd = `${months[month]} ${date} ,${year}`
  return _dd
}
