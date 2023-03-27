import React, { useState, createContext } from 'react'
import users from '@constants/users.json'

export const UserContext = createContext()

/**
 * Custom provider to mange shared info
 * @param {props} props
 */
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(users[1] || {})

  const login = (val) => {
    setUser(val)
  }

  const functions = {
    login,
  }

  return (
    <UserContext.Provider value={[user, functions]}>
      {children}
    </UserContext.Provider>
  )
}

// hook context

export function useGetAuth() {
  const userManager = React.useContext(UserContext)
  return userManager || [{}, () => {}]
}
