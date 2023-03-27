import { useState, useEffect } from 'react'
import { useLocation } from '@reach/router'

// Hook
const usePath = () => {
  const location = useLocation()
  const [path, setPath] = useState('/')
  useEffect(() => {
    if (location) {
      setPath(location?.pathname)
    }
  }, [location])
  return path
}

export default usePath
