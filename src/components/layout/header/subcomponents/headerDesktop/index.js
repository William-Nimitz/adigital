import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Avatar from '@images/users/avatar.svg'
import { Text, PopUp } from '@components/common'
import LogOutPopUp from '../logOutPopUp'
import ToggleMode from '../toggleMode'

const HeaderDesktop = (props) => {
  const { appName, logo, user } = props
  const [openPopUp, setOpenPopUp] = useState(false)

  return (
    <header className="flex h-16x items-center justify-between bg-primary pl-5x pr-4x">
      <section className="flex items-center justify-between">
        {logo}
        <Text style="header" moreStyles="ml-6x">
          {appName}
        </Text>
      </section>
      <section className="flex items-center justify-between">
        <ToggleMode />
        <div
          className="relative ml-3x inline"
          onClick={() => setOpenPopUp(true)}
        >
          <Avatar className="cursor-pointer" alt="user profile" />
          <PopUp
            child={<LogOutPopUp />}
            style="primary"
            open={openPopUp}
            setOpen={setOpenPopUp}
          />
        </div>
      </section>
    </header>
  )
}

HeaderDesktop.propTypes = {}

export default HeaderDesktop
