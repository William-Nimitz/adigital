import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Avatar from '@images/users/avatar.svg'
import { Text, PopUp } from '@components/common'
import Menu from '@images/icons/menu.svg'
import LogOutPopUp from '../logOutPopUp'
import ToggleMode from '../toggleMode'

const HeaderMobile = (props) => {
  const { appName, logo, openMenu } = props
  const [openPopUp, setOpenPopUp] = useState(false)

  return (
    <header className="flex h-16x items-center justify-between bg-primary pl-5x pr-4x">
      <section className="flex items-center justify-between">
        {logo}
        <Text style="header" moreStyles="ml-6x hidden tablet:inline-block">
          {appName}
        </Text>
      </section>
      <section className="flex items-center justify-between">
        <ToggleMode />
        <div
          className="relative ml-3 inline hidden tablet:inline-block"
          onClick={() => setOpenPopUp(true)}
        >
          <Avatar alt="user profile" className="cursor-pointer rounded-full" />
          <PopUp
            child={<LogOutPopUp />}
            style="primary"
            open={openPopUp}
            setOpen={setOpenPopUp}
          />
        </div>
        <Menu
          className="ml-4 block cursor-pointer tablet:hidden"
          onClick={openMenu}
        />
      </section>
    </header>
  )
}

HeaderMobile.propTypes = {}

export default HeaderMobile
