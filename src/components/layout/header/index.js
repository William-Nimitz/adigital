import React from 'react'
import { useMedia } from 'react-use'
import { useGetAuth } from '@provider/userProvider'

import HeaderMobile from './subcomponents/headerMobile'
import HeaderDesktop from './subcomponents/headerDesktop'
import Logo from '@images/xbox_logo.svg'

const Header = ({ openMenu }) => {
  const isDesktop = useMedia('(min-width: 1280px)')
  const [user] = useGetAuth()

  const props = {
    appName: 'Xbox Social Intake Form',
    logo: <Logo className="h-8x w-8x cursor-pointer" />,
    openMenu: openMenu,
    user: user,
  }

  return isDesktop ? <HeaderDesktop {...props} /> : <HeaderMobile {...props} />
}

export default Header
