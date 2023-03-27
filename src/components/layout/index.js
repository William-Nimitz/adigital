import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { UserProvider } from '@provider/userProvider'
import Header from './header'
import SideBar from './sidebar'

const Layout = ({ children, handler }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const openCreateNewRequest = () => {
    handler('createNewRequest')
  }

  return (
    <UserProvider>
      <Header openMenu={() => setIsOpenMenu(!isOpenMenu)} />
      <SideBar
        open={isOpenMenu}
        setOpen={setIsOpenMenu}
        openCreateNewRequest={openCreateNewRequest}
      />
      <section className="h-full-b sm:ml-[250px]">
        {children}
        <Toaster />
      </section>
    </UserProvider>
  )
}

export default Layout
