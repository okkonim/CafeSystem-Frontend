import { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavigateFunction, useNavigate } from 'react-router'
import { type Dispatch } from '@reduxjs/toolkit'

import { requestForgot } from '../api/api'
import { logIn } from '../store/auth'
import { validateForgotInput } from '../utils/validator'
import { ForgotData } from '../types'
import { Link } from 'react-router-dom'

const Forgot = () => {
  const dispatch: Dispatch = useDispatch()
  const navigate: NavigateFunction = useNavigate()
  const [formStage, setFormStage]: [number, React.Dispatch<number>] = useState(0)
  const [validationError, setValidationError]: [string, React.Dispatch<string>] = useState('')
  const [forgotData, setForgotData]: [ForgotData, React.Dispatch<ForgotData>] = useState({ email: '' })
  const { isLoading } = useSelector((state: any) => state.status)

  const handleUserInput: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    setForgotData({ ...forgotData, [e.target.name]: e.target.value })
  }

  const submitUserData: FormEventHandler = (e: FormEvent): void => {
    e.preventDefault()
    setValidationError('')
    const validationResult: string | true = validateForgotInput(forgotData)
    if (validationResult !== true) return setValidationError(validationResult)
    requestForgot(forgotData).then(res => {
      if (!res.isSuccess) { return setValidationError(res.payload) }
      dispatch(logIn(forgotData))
      // navigate('/chat')
      setFormStage(1)
      setTimeout(() => { navigate('/login') }, 3000)
    })
  }

  return (
    <div className="forgot">
      <h1 className="forgot__title">Забыли пароль?</h1>
      {formStage === 0 &&
        <form onSubmit={submitUserData}>
          <label className="forgot__label forgot__label--email">
            <legend>email</legend>
            <input type="email" name="email" onChange={handleUserInput} required />
          </label>
          {validationError && <p className='forgot__error'>{validationError}</p>}
          <button className='forgot__button'>{isLoading ? 'Loading...' : 'Восстановить'}</button>
          <Link className='forgot__link' to='/login'>Войти</Link>
        </form>}

      {formStage === 1 &&
        <div>
          <p className="forgot__message">
            Аккаунт создан!
          </p>
        </div>
      }
    </div>
  )
}

export default Forgot