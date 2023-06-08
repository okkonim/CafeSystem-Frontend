import { useEffect } from "react"
import { NavigateFunction, useNavigate } from "react-router"

const Main = () => {
  const navigate: NavigateFunction = useNavigate()

  useEffect(() => {
    navigate('/login')
  }, [])


  return (
    <div>Main</div>
  )
}

export default Main