import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { requestLogOut } from '../api/api'
const Header = () => {
  const { authToken } = useSelector((state: any) => state.auth)
  const location = useLocation()

  const handleLogOut = () => {
    requestLogOut()
  }

  return (
    <header className="header">
      <Link className={`header__nav-item ${location.pathname == '/products' ? 'header__nav-item--active' : ''}`} to="/products">Продукты</Link>
      <Link className={`header__nav-item ${location.pathname == '/orders' ? 'header__nav-item--active' : ''}`} to="/orders">Заказы</Link>
      <Link className={`header__nav-item ${location.pathname == '/profile' ? 'header__nav-item--active' : ''}`} to="/profile">Профиль</Link>
      <Link className={`header__nav-item ${location.pathname == '/create' ? 'header__nav-item--active' : ''}`} to="/create">Создать продукт</Link>
      {authToken ?
        <p className="header__nav-item" onClick={handleLogOut}>Выход</p>
        :
        <Link className={`header__nav-item ${location.pathname == '/login' ? 'header__nav-item--active' : ''}`} to="/login">Вход</Link>}
    </header>
  )
}

export default Header