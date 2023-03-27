const bgClassnames = {
  progress:
    'w-fit whitespace-nowrap rounded-md bg-yellow-200 dark:bg-yellow-900 px-0.5 px-2.5 text-center  text-xs text-yellow-800 dark:text-yellow-100',
  complete:
    'w-fit whitespace-nowrap rounded-md bg-green-100 dark:bg-green-900 px-0.5 px-2.5 text-center text-xs text-green-800 dark:text-green-300',
  pending:
    'w-fit whitespace-nowrap rounded-md bg-gray-100 dark:bg-gray-600 px-0.5 px-2.5 text-center text-xs text-gray-900 dark:text-gray-300',
}
const iconStyles = {
  primary: 'flex items-center tablet:mr-3',
}

const BadgeStatus = ({
  className,
  icon = null,
  text = '',
  style = 'primary',
  moreStyles,
  onClick = () => {},
  ...otherProps
}) => {
  return (
    <div
      onClick={onClick}
      className={`${bgClassnames[style]} ${moreStyles} `}
      {...otherProps}
    >
      {icon ? <div className={`${iconStyles[style]}`}>{icon}</div> : null}

      {text}
    </div>
  )
}

export default BadgeStatus
