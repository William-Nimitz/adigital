const bgClassnames = {
  orange:
    'flex items-center bg-gradient-orange border border-[#F4B285] border-2 hover:bg-gradient-orangeDark hover:border-[#F7C6A5] hover:shadow-[0_0_16px_rgba(251,86,0,0.6)] text-smm font-inter not-italic',
  primary:
    'flex items-center justify-center bg-primary hover:bg-hover-primary focus:shadow-primary px-5 py-2.5 rounded-lg tablet:w-full tablet:max-w-[226px] text-white-200 text-smm font-inter not-italic',
  darkBlue:
    'flex items-center justify-center bg-gray-700 hover:bg-hover-primary focus:shadow-primary px-5 py-2.5 rounded-lg tablet:w-full tablet:max-w-[226px] text-white-200 text-smm font-inter not-italic',
  gray: 'flex items-center justify-center bg-gray-600 hover:bg-hover-primary focus:shadow-primary px-5 py-2.5 rounded-lg tablet:w-full tablet:max-w-[226px] text-white-200 text-smm font-inter not-italic',
  red: 'flex items-center justify-center bg-red-800 hover:bg-hover-red focus:shadow-red px-5x py-2.5 rounded-lg tablet:w-full tablet:max-w-[226px] text-white-200 text-smm font-inter not-italic',
  disabled:
    'flex items-center justify-center bg-gray-700 hover:bg-hover-disabled focus:shadow-disabled px-5 py-2.5 rounded-lg text-gray-500 text-smm font-inter not-italic',
}

const iconStyles = {
  primary: 'flex items-center tablet:mr-3',
}

const Button = ({
  style = 'primary',
  moreStyles,
  icon = null,
  iconMoreStyles,
  text = '',
  ariaLabel = '',
  onClick = () => {},
  ...otherProps
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${bgClassnames[style]} ${moreStyles}`}
      aria-label={ariaLabel || text}
      {...otherProps}
    >
      {icon ? (
        <div
          className={`${iconStyles[style]} ${
            iconMoreStyles ? iconMoreStyles : ''
          }`}
        >
          {icon}
        </div>
      ) : null}
      {text}
    </button>
  )
}

export default Button
