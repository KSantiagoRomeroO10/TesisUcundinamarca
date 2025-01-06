import { useEffect } from 'react'

import UseUserStore from "../../Stores/UseUserStore"

const Exit = () => {
  const resetUser = UseUserStore((state) => state.resetUser)

  const handleExit = () => {
    resetUser()
  }

  useEffect(() => {
    handleExit()
  }, [])
  

  return <p>Saliendo...</p>

}

export default Exit