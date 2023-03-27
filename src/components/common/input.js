import React from 'react'
import { Text } from '@components/common'
import LockClosed from '@images/icons/lockClosed.svg'

const wrapperStyle = {
  primary:
    'flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg border-gray-400 p-2x',
}

const labelStyle = {
  primary:
    'font-inter mb-2 block text-smm normal-case not-italic text-gray-700 dark:text-white-200',
}

const inputStyles = {
  primary:
    'font-inter not-italic text-gray-500 dark:text-gray-400 text-sm bg-gray-100 dark:bg-gray-700 px-1x border-0 focus:border-0 disabled:!bg-gray-500 disabled:!text-white-200 disabled:placeholder:text-white-200',
  header: 'font-inter not-italic text-white-200 text-sm',
}

const iconStyles = {
  primary: 'flex items-center bg-transparent dark:bg-transparent mr-3x',
}

const rightIconStyles = {
  primary: 'ml-3 mr-3 inline cursor-pointer',
}

const Input = (props) => {
  const {
    icon = null,
    required,
    style,
    moreStyles = '',
    moreStylesWrapper = '',
    placeholder = '',
    onChange,
    label,
    moreLabelStyles,
    disabled,
    value,
    disabledText,
    rightIcon = null,
    rightAction,
    messageText,
    messageTextStyles,
  } = props

  return (
    <div className="input-div">
      {label && (
        <label className={`${labelStyle[style]} ${moreLabelStyles}`}>
          {label} {required ? <Text style="red">*</Text> : ''}
        </label>
      )}
      <div
        className={`${disabled && '!bg-gray-500 !text-white-200'} ${
          wrapperStyle[style]
        } ${moreStylesWrapper}`}
      >
        {icon ? <div className={`${iconStyles[style]}`}>{icon}</div> : null}

        <input
          type="text"
          className={`${inputStyles[style]} ${moreStyles}`}
          placeholder={placeholder || ''}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value) || null}
          value={value}
        />
        {rightIcon ? (
          <div className={`${rightIconStyles[style]}`} onClick={rightAction}>
            {rightIcon}
          </div>
        ) : null}
        {disabled && <LockClosed className="mr-3" />}
      </div>
      {disabledText && (
        <span className="mb-4 !mt-1 block font-inter text-smm not-italic text-gray-400">
          {disabledText}
        </span>
      )}
      {messageText && (
        <span className={`${messageTextStyles}`}>{messageText}</span>
      )}
    </div>
  )
}

export default Input
