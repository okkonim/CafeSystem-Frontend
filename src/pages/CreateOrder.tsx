import { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, useState } from 'react'
import { useSelector } from 'react-redux'

import { requestCreateOrder } from '../api/api'
import { validateCreateOrderInput } from '../utils/validator'
import { CreateOrderData } from '../types'
import Header from '../components/Header'
import Footer from '../components/Footer'

const CreateOrder = () => {
  const { authToken } = useSelector((state: any) => state.auth)
  const blankData = { name: '', description: '', image: '', price: 0 }
  const [formStage, setFormStage]: [number, React.Dispatch<number>] = useState(0)
  const [validationError, setValidationError]: [string, React.Dispatch<string>] = useState('')
  const [createOrderData, setCreateOrderData]: [CreateOrderData, React.Dispatch<CreateOrderData>] = useState(blankData)
  // const [fileName, setFileName]: [string, React.Dispatch<string>] = useState('')
  const { isLoading } = useSelector((state: any) => state.status)

  const handleUserInput: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    setCreateOrderData({ ...createOrderData, [e.target.name]: e.target.value })
  }

  const submitOrder: FormEventHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (!authToken) return;
    setValidationError('')
    const validationResult: string | true = validateCreateOrderInput(createOrderData)
    if (validationResult !== true) return setValidationError(validationResult)
    requestCreateOrder(createOrderData).then(res => {
      if (!res.isSuccess) { return setValidationError(res.payload) }
      setFormStage(1)
      setCreateOrderData(blankData)
      setTimeout(() => { setFormStage(0) }, 3000)
      return console.log('Order created')
    })
  }
  return (
    <>
      <Header />
      <div className="container">
        {authToken && formStage == 0 &&
          <form className='create' onSubmit={submitOrder}>
            <h1>Создать продукт</h1>
            <label className="create__label">
              <legend>Название</legend>
              <input type="text" name="name" onChange={handleUserInput} required />
            </label>
            <label className="create__label">
              <legend>Фото</legend>
              <input type="text" name="image" onChange={handleUserInput} required />
              {/* <p className="create__filename">{fileName || 'Выберите файл'}</p>
              <input type="file" name="image" onChange={handleFileInput} accept="image/*" required /> */}
            </label>
            <label className="create__label create__label--text">
              <legend>Описание</legend>
              <textarea name="description" rows={10} onChange={handleUserInput} />
            </label>
            <label className="create__label">
              <legend>Цена</legend>
              <input type="number" name="price" onChange={handleUserInput} required />
            </label>
            {validationError && <p className='create__error'>{validationError}</p>}
            <button className='create__button'>{isLoading ? 'Loading...' : 'Создать'}</button>
          </form>}
        {authToken && formStage == 1 && <p className='create__notification'>Продукт создан!</p>}
        {!authToken && <p className='create__forbidden'>Войдите в аккаунт.</p>}
      </div>
      <Footer />
    </>
  )
}

export default CreateOrder