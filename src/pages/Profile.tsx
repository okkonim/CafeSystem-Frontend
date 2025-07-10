import React, { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, useState } from 'react';
import { useSelector } from 'react-redux'

import { requestEditProfileInfo } from '../api/api'
import { validateProfileInput } from '../utils/validator'
import { ProfileData } from '../types'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { NavigateFunction, useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate: NavigateFunction = useNavigate()
  const blankData: ProfileData = { oldPassword: '', password: '', password2: '' }
  const [formStage, setFormStage]: [number, React.Dispatch<number>] = useState(0)
  const [profileData, setProfileData]: [ProfileData, React.Dispatch<React.SetStateAction<ProfileData>>] = useState(blankData)
  const [validationError, setValidationError]: [string, React.Dispatch<string>] = useState('')
  const { authToken } = useSelector((state: any) => state.auth)
  const { isLoading } = useSelector((state: any) => state.status)

  const handleUserInput: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    setProfileData({ ...profileData, [e.target.name]: e.target.value })
  }

  const submitUserData: FormEventHandler = async (e: FormEvent) => {
    e.preventDefault()
    if (!authToken) return;
    setValidationError('')
    const validationResult: string | true = validateProfileInput(profileData)
    if (validationResult !== true) return setValidationError(validationResult)
    requestEditProfileInfo(profileData).then(res => {
      if (!res.isSuccess) { return setValidationError(res.payload) }
      setFormStage(1)
      setTimeout(() => { setFormStage(0); navigate('/login') }, 3000)
      return
    })
  }

  return (
    <>
      <Header />
      <div className='container profile'>
        {authToken && formStage == 0 &&
          <>
            <div className='profile__form'>
              <h1 className="profile__title">Изменить данные профиля</h1>
              <form className='create' onSubmit={submitUserData}>
                <label className="create__label">
                  <legend>Старый пароль</legend>
                  <input type="password" name="oldPassword" onChange={handleUserInput} />
                </label>
                <label className="create__label">
                  <legend>Новый пароль</legend>
                  <input type="password" name="password" onChange={handleUserInput} />
                </label>
                <label className="create__label">
                  <legend>Подтвердите пароль</legend>
                  <input type="password" name="password2" onChange={handleUserInput} />
                </label>
                {validationError && <p className='create__error'>{validationError}</p>}
                <button className='create__button'>{isLoading ? 'Loading...' : 'Подтвердить'}</button>
              </form>
            </div>
          </>
        }
        {authToken && formStage == 1 && <p className='profile__notification'>Данные обновлены!</p>}
        {!authToken && <p className='profile__forbidden'>Войдите в аккаунт.</p>}

      </div>
      <Footer />
    </>
  )
}

export default Profile