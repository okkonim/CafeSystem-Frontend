import React, { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { requestEditOrder, requestOrderByID } from '../api/api'
import { validateEditOrderInput } from '../utils/validator'
import { EditOrderData } from '../types'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link, useParams } from 'react-router-dom'

const EditOrder = () => {
  const { orderID } = useParams()
  const { authToken } = useSelector((state: any) => state.auth)
  const blankData = { id: Number(orderID) || 0, name: '', description: '', image: '', price: 0 }
  const [formStage, setFormStage]: [number, React.Dispatch<number>] = useState(-1)
  const [validationError, setValidationError]: [string, React.Dispatch<string>] = useState('')
  const [editOrderData, setEditOrderData]: [EditOrderData, React.Dispatch<EditOrderData>] = useState(blankData)
  // const [fileName, setFileName]: [string, React.Dispatch<string>] = useState('')
  const { isLoading } = useSelector((state: any) => state.status)

  useEffect(() => {
    const fetchOrderData = () => {
      if (!authToken) return;
      if (!orderID) return setFormStage(2);
      requestOrderByID(Number(orderID)).then(res => {
        if (!res.isSuccess) return setFormStage(2);
        const fetchedData = res.payload.data
        if (!fetchedData.name) return setFormStage(2);
        setEditOrderData(fetchedData)
        setFormStage(0)
      })
    }
    fetchOrderData()
  }, [])

  const handleUserInput: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    setEditOrderData({ ...editOrderData, [e.target.name]: e.target.value })
  }

  const submitOrder: FormEventHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (!authToken) return;
    setValidationError('')
    const validationResult: string | true = validateEditOrderInput(editOrderData)
    if (validationResult !== true) return setValidationError(validationResult)
    requestEditOrder({ ...editOrderData }).then(res => {
      if (!res.isSuccess) { return setValidationError(res.payload) }
      setFormStage(1)
      setEditOrderData(blankData)
      setTimeout(() => { setFormStage(0) }, 3000)
      return
    })
  }
  return (
    <>
      <Header />
      <div className="container">
        <Link className="edit__back" to={`/p/${orderID}`}>Вернуться к списку</Link>
        {authToken && formStage == 0 &&
          <form className='edit' onSubmit={submitOrder}>
            <h1>Изменить продукт</h1>
            <label className="edit__label">
              <legend>Название</legend>
              <input type="text" name="name" onChange={handleUserInput} value={editOrderData.name} required />
            </label>
            <label className="edit__label">
              <legend>Фото</legend>
              <input type="text" name="image" onChange={handleUserInput} value={editOrderData.image} required />
              {/* <p className="edit__filename">{fileName || 'Выберите файл'}</p>
              <input type="file" name="image" onChange={handleFileInput} accept="image/*" required /> */}
            </label>
            <label className="edit__label edit__label--text">
              <legend>Описание</legend>
              <textarea name="description" rows={10} onChange={handleUserInput} value={editOrderData.description} />
            </label>
            <label className="edit__label">
              <legend>Цена</legend>
              <input type="number" name="price" onChange={handleUserInput} value={editOrderData.price} required />
            </label>
            {validationError && <p className='edit__error'>{validationError}</p>}
            <button className='edit__button'>{isLoading ? 'Loading...' : 'Изменить'}</button>
          </form>}
        {authToken && formStage == -1 && <p className='edit__notification'>Загрузка...</p>}
        {authToken && formStage == 1 && <p className='edit__notification'>Продукт изменен!</p>}
        {authToken && formStage == 2 && <p className='edit__forbidden'>Товар не найден.</p>}
        {!authToken && <p className='edit__forbidden'>Войдите в аккаунт.</p>}
      </div>
      <Footer />
    </>
  )
}

export default EditOrder