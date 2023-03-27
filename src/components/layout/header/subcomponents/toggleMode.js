import React, { useEffect } from 'react'
import useLocalStorage from '@hooks/useLocalStorage'

import Sun from '@images/icons/sun.svg'
import Moon from '@images/icons/moon.svg'

const ToggleMode = () => {
  const [mode, setMode] = useLocalStorage('mode', 'dark')

  const toggleModeSetting = () => {
    setMode(mode === 'dark' ? 'light' : 'dark')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      toggleModeSetting()
    }
  }

  useEffect(() => {
    if (typeof window !== undefined) {
      const root = window.document.documentElement

      root.classList.remove(mode === 'dark' ? 'light' : 'dark')
      root.classList.add(mode)
    }
  }, [mode])

  return (
    <div
      className="flex w-[50px] cursor-pointer rounded-[100px] border border-gray-500 bg-gray-300 dark:bg-gray-700"
      tabIndex={0}
      onClick={toggleModeSetting}
      onKeyDown={handleKeyDown}
    >
      <div className="flex h-6x w-6x items-center justify-center rounded-full bg-gray-500 text-white-200 dark:bg-transparent dark:text-gray-500">
        <Sun />
      </div>
      <div className="flex h-6x w-6x items-center justify-center rounded-full bg-transparent text-gray-100 dark:bg-gray-900 dark:text-white-200">
        <Moon />
      </div>
    </div>
  )
}

export default ToggleMode
