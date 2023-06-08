import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../store/auth'
import { Dispatch } from '@reduxjs/toolkit'
const Footer = () => {
  const dispatch: Dispatch = useDispatch()
  const { authToken } = useSelector((state: any) => state.auth)
  const handleLogOut = () => {
    dispatch(logOut(null))
  }
  return (
    <footer className="footer">
      <Link className={`footer__nav-item ${location.pathname == '/products' ? 'footer__nav-item--active' : ''}`} to="/products">Продукты</Link>
      <Link className={`footer__nav-item ${location.pathname == '/orders' ? 'footer__nav-item--active' : ''}`} to="/orders">Заказы</Link>
      <Link className={`footer__nav-item ${location.pathname == '/profile' ? 'footer__nav-item--active' : ''}`} to="/profile">Профиль</Link>
      <Link className={`footer__nav-item ${location.pathname == '/create' ? 'footer__nav-item--active' : ''}`} to="/create">Создать продукт</Link>
      {authToken ?
        <p className="footer__nav-item" onClick={handleLogOut}>Выход</p>
        :
        <Link className={`footer__nav-item ${location.pathname == '/login' ? 'footer__nav-item--active' : ''}`} to="/login">Вход</Link>}

      <p className='footer__nav-item footer__nav-item--devs '>Разработано: Белякова Анна, Малко Оксана</p>
    </footer>
  )
}

export default Footer