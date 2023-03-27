import React from 'react'
import { navigate, graphql, useStaticQuery } from 'gatsby'
import usePath from '@hooks/usePath'
import { useGetAuth } from '@provider/userProvider'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import Home from '@images/icons/home.svg'
import Calendar from '@images/icons/calendar.svg'
import Users from '@images/icons/users.svg'
import PlusIcon from '@images/icons/plus.svg'

import { Text, Button } from '@components/common'

const SideBar = ({ open, openCreateNewRequest }) => {
  const path = usePath()
  const [user] = useGetAuth()

  const { userLogo } = useStaticQuery(
    graphql`
      query {
        userLogo: file(relativePath: { eq: "users/avatar1.png" }) {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    `
  )
  const image = getImage(userLogo)
  const navigations = {
    request: {
      name: 'My Requests',
      adminName: 'Requests',
      paths: [
        {
          path: '/',
          label: 'List',
          adminLabel: 'All Requests',
          role: 'admin',
          icon: <Home />,
        },
        {
          path: '/calendar',
          label: 'Calendar',
          adminLabel: 'Calendar',
          role: 'admin',
          icon: <Calendar />,
        },
      ],
    },
    user: {
      name: '',
      adminName: 'Users',
      role: 'admin',
      paths: [
        {
          path: '/users',
          label: '',
          adminLabel: 'Users',
          role: 'admin',
          icon: <Users />,
        },
      ],
    },
  }
  const bgStyleActived = 'bg-primary text-white-200'
  const bgStyle =
    'hover:bg-primary hover:bg-primary hover:text-white-200 text-gray-900 dark:text-white-200'

  return (
    <>
      <aside
        id="default-sidebar"
        className={`h-full-b fixed top-16x left-0 z-40 w-[250px] -translate-x-full transition-transform tablet:left-0 ${
          open ? 'right-0 translate-x-0' : 'sm:translate-x-0'
        }`}
      >
        <div className="h-full overflow-y-auto bg-gray-100 px-3x py-4x dark:bg-gray-900">
          <div className="my-6x flex items-center justify-center tablet:hidden">
            <GatsbyImage
              className="h-12x w-12x cursor-pointer"
              image={image}
              alt="user profile"
            />
          </div>
          {Object.keys(navigations)
            .filter(
              (fNav, fIdx) =>
                user?.role === 'admin' ||
                (user?.role === 'client' && navigations[fNav].role !== 'admin')
            )
            .map((key, kIdx) => (
              <div
                className="border-b-1 mb-6x border-b border-gray-500 dark:border-gray-700"
                key={`navigation-category-${key}`}
              >
                <Text style="primary" moreStyles="text-smsb ml-2x">
                  {user?.role === 'admin'
                    ? navigations[key].adminName
                    : navigations[key].name}
                </Text>
                <ul className="mt-6x mb-[22px] list-none">
                  {navigations[key].paths.map((nav, idx) => (
                    <li
                      className={`m-0 mt-2.5x flex h-[38px] cursor-pointer items-center rounded-lg px-5x py-2x ${
                        path === nav.path ? bgStyleActived : bgStyle
                      }`}
                      onClick={() => navigate(nav.path)}
                      key={`navigation-path-${kIdx}-${idx}`}
                    >
                      {nav.icon}
                      <Text style="navlink" moreStyles="ml-3">
                        {user?.role === 'admin' ? nav.adminLabel : nav.label}
                      </Text>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          <div className="mt-6x flex items-center justify-center tablet:hidden">
            <Button
              tabIndex="1"
              ariaLabel="New User Button"
              icon={<PlusIcon />}
              iconMoreStyles="mr-3"
              text={'Invite New User'}
              style="primary"
              onClick={() => {}}
              moreStyles="w-full border border-1 border-green-50 tablet:border-none"
            />
          </div>
          <div className="mt-6x flex items-center justify-center tablet:hidden">
            <Button
              tabIndex="1"
              ariaLabel="New Requests Button"
              icon={<PlusIcon />}
              iconMoreStyles="mr-3"
              text={'New Requests'}
              style={user?.role === 'admin' ? 'darkBlue' : 'primary'}
              onClick={() => {
                openCreateNewRequest('createNewRequest')
              }}
              moreStyles="w-full border border-1 border-green-50 tablet:border-none"
            />
          </div>
          <div className="fixed bottom-4x flex w-[226px] items-center justify-center tablet:hidden">
            <Button
              tabIndex="1"
              ariaLabel="Log Out Button"
              text={'Log Out'}
              style="darkBlue"
              onClick={() => {}}
              moreStyles="w-full"
            />
          </div>
        </div>
      </aside>
    </>
  )
}

export default SideBar
