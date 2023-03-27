import React, { useEffect } from 'react'

const PopUp = ({
  moreStyles = '',
  style = 'primary',
  open,
  setOpen,
  child = '',
}) => {
  const Styles = {
    primary: 'fixed top-16x right-0 user-pop-up',
  }

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setOpen(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [open])

  return (
    <div
      className={`${Styles[style]} ${moreStyles} ${open ? 'inline' : 'hidden'}`}
    >
      {child}
    </div>
  )
}

export default PopUp
