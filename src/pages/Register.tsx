import { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavigateFunction, useNavigate } from 'react-router'
import { type Dispatch } from '@reduxjs/toolkit'

import { requestRegister } from '../api/api'
import { logIn } from '../store/auth'
import { validateRegisterInput } from '../utils/validator'
import { RegisterData } from '../types'
import { Link } from 'react-router-dom'

const Register = () => {
  const dispatch: Dispatch = useDispatch()
  const navigate: NavigateFunction = useNavigate()
  const [formStage, setFormStage]: [number, React.Dispatch<number>] = useState(0)
  const [validationError, setValidationError]: [string, React.Dispatch<string>] = useState('')
  const [registerData, setRegisterData]: [RegisterData, React.Dispatch<RegisterData>] = useState({ name: '', password: '', email: '', contactNumber: '' })
  const { isLoading } = useSelector((state: any) => state.status)

  const handleUserInput: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    setRegisterData({ ...registerData, [e.target.name]: e.target.value })
  }

  const submitUserData: FormEventHandler = (e: FormEvent): void => {
    e.preventDefault()
    setValidationError('')
    const validationResult: string | true = validateRegisterInput(registerData)
    if (validationResult !== true) return setValidationError(validationResult)
    requestRegister(registerData).then(res => {
      if (!res.isSuccess) { return setValidationError(res.payload) }
      dispatch(logIn(registerData))
      // navigate('/chat')
      setFormStage(1)
      setTimeout(() => { navigate('/login') }, 3000)
    })
  }

  return (
    <div className="register">
      <h1 className="register__title">Зарегистрироваться</h1>
      {formStage === 0 &&
        <form onSubmit={submitUserData}>
          <label className="register__label register__label--name">
            <legend>никнейм</legend>
            <input type="text" name="name" onChange={handleUserInput} required />
          </label>
          <label className="register__label register__label--email">
            <legend>email</legend>
            <input type="email" name="email" onChange={handleUserInput} required />
          </label>
          <label className="register__label register__label--lastName">
            <legend>телефон</legend>
            <input type="tel" name="contactNumber" maxLength={11} onChange={handleUserInput} required />
          </label>
          <label className="register__label register__label--password">
            <legend>пароль</legend>
            <input type="password" name="password" onChange={handleUserInput} required />
          </label>
          {validationError && <p className='register__error'>{validationError}</p>}
          <button className='register__button'>{isLoading ? 'Loading...' : 'Зарегистрироваться'}</button>
          <Link className='register__link' to='/login'>Войти</Link>
        </form>}

      {formStage === 1 &&
        <div>
          <p className="register__message">
            Аккаунт создан!
          </p>
        </div>
      }
    </div>
  )
}

export default Register