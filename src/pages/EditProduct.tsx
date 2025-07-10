import React, { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { requestEditProduct, requestProductByID } from '../api/api'
import { validateEditProductInput } from '../utils/validator'
import { EditProductData } from '../types'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link, useParams } from 'react-router-dom'

const EditProduct = () => {
  const { productID } = useParams()
  const { authToken } = useSelector((state: any) => state.auth)
  const blankData = { id: Number(productID) || 0, name: '', description: '', image: '', price: 0, status: '' }
  const [formStage, setFormStage]: [number, React.Dispatch<number>] = useState(-1)
  const [validationError, setValidationError]: [string, React.Dispatch<string>] = useState('')
  const [editProductData, setEditProductData]: [EditProductData, React.Dispatch<EditProductData>] = useState(blankData)
  // const [fileName, setFileName]: [string, React.Dispatch<string>] = useState('')
  const { isLoading } = useSelector((state: any) => state.status)

  useEffect(() => {
    const fetchProductData = () => {
      if (!authToken) return;
      if (!productID) return setFormStage(2);
      requestProductByID(Number(productID)).then(res => {
        if (!res.isSuccess) return setFormStage(2);
        const fetchedData = res.payload.data
        if (!fetchedData.name) return setFormStage(2);
        setEditProductData(fetchedData)
        setFormStage(0)
      })
    }
    fetchProductData()
  }, [])

  const handleUserInput: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    setEditProductData({ ...editProductData, [e.target.name]: e.target.value })
  }

  const submitProduct: FormEventHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (!authToken) return;
    setValidationError('')
    const validationResult: string | true = validateEditProductInput(editProductData)
    if (validationResult !== true) return setValidationError(validationResult)
    requestEditProduct({ ...editProductData }).then(res => {
      if (!res.isSuccess) { return setValidationError(res.payload) }
      setFormStage(1)
      setEditProductData(blankData)
      setTimeout(() => { setFormStage(0) }, 3000)
      return
    })
  }
  return (
    <>
      <Header />
      <div className="container">
        <Link className="edit__back" to={`/product/${productID}`}>Вернуться к списку</Link>
        {authToken && formStage == 0 &&
          <form className='edit' onSubmit={submitProduct}>
            <h1>Изменить продукт</h1>
            <div className="edit__header">
              <label className="edit__label edit__label--name">
                <legend>Название</legend>
                <input type="text" name="name" onChange={handleUserInput} value={editProductData.name} required />
              </label>
              <select
                className="products__filter"
                onChange={handleUserInput}
                value={editProductData.status}
              >
                <option value="available">Доступен</option>
                <option value="present">В наличии</option>
                <option value="ending">Кончается</option>
                <option value="none">Недоступен</option>
              </select>
            </div>
            <label className="edit__label">
              <legend>Фото</legend>
              <input type="text" name="image" onChange={handleUserInput} value={editProductData.image} required />
              {/* <p className="edit__filename">{fileName || 'Выберите файл'}</p>
              <input type="file" name="image" onChange={handleFileInput} accept="image/*" required /> */}
            </label>
            <label className="edit__label edit__label--text">
              <legend>Описание</legend>
              <textarea name="description" rows={10} onChange={handleUserInput} value={editProductData.description} />
            </label>
            <label className="edit__label">
              <legend>Цена</legend>
              <input type="number" name="price" onChange={handleUserInput} value={editProductData.price} required />
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

export default EditProduct