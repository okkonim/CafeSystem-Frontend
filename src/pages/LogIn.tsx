import { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavigateFunction, useNavigate } from 'react-router'
import { type Dispatch } from '@reduxjs/toolkit'

import { requestLogIn } from '../api/api'
import { logIn } from '../store/auth'
import { validateLoginInput } from '../utils/validator'
import { LoginData } from '../types'
import { Link } from 'react-router-dom'

const LogIn = () => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch: Dispatch = useDispatch()
  const [loginData, setLoginData]: [LoginData, React.Dispatch<LoginData>] = useState({ email: 'qwer@gmail.com', password: '12345678' })
  const [validationError, setValidationError]: [string, React.Dispatch<string>] = useState('')
  const { isLoading } = useSelector((state: any) => state.status)

  const handleUserInput: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const submitUserData: FormEventHandler = async (e: FormEvent) => {
    e.preventDefault()
    setValidationError('')
    const validationResult: string | true = validateLoginInput(loginData)
    if (validationResult !== true) return setValidationError(validationResult)
    requestLogIn(loginData).then(res => {
      if (!res.isSuccess) { return setValidationError(res.payload) }
      dispatch(logIn(loginData))
      navigate('/products')
    })
  }

  return (
    <form className="login" onSubmit={submitUserData}>
      <h1 className="login__title">Войти</h1>
      <label className="login__label login__label--name">
        <legend>email</legend>
        <input type="text" name="email" onChange={handleUserInput} value={loginData.email} />
      </label>
      <label className="login__label login__label--password">
        <legend>пароль</legend>
        <input type="password" name="password" onChange={handleUserInput} value={loginData.password} />
      </label>
      {validationError && typeof validationError == 'string' && <p className='login__error'>{validationError}</p>}
      {validationError && typeof validationError == 'object' && <p className='login__error'>Ошибка</p>}
      <button className='login__button'>{isLoading ? 'Loading...' : 'Войти'}</button>
      <Link className='login__link' to='/forgot'>Забыли пароль?</Link>
      <Link className='login__link' to='/register'>Создать аккаунт</Link>
    </form>
  )
}

export default LogIn