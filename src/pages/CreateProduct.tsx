import React, { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, useState } from 'react';
import { useSelector } from 'react-redux'

import { requestCreateProduct } from '../api/api'
import { validateCreateProductInput } from '../utils/validator'
import { CreateProductData } from '../types'
import Header from '../components/Header'
import Footer from '../components/Footer'

const CreateProduct = () => {
  const { authToken } = useSelector((state: any) => state.auth)
  const blankData = { name: '', description: '', image: '', price: 0, status: '' }
  const [formStage, setFormStage]: [number, React.Dispatch<number>] = useState(0)
  const [validationError, setValidationError]: [string, React.Dispatch<string>] = useState('')
  const [createProductData, setCreateProductData]: [CreateProductData, React.Dispatch<CreateProductData>] = useState(blankData)
  // const [fileName, setFileName]: [string, React.Dispatch<string>] = useState('')
  const { isLoading } = useSelector((state: any) => state.status)

  const handleUserInput: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    setCreateProductData({ ...createProductData, [e.target.name]: e.target.value })
  }

  const submitProduct: FormEventHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (!authToken) return;
    setValidationError('')
    const validationResult: string | true = validateCreateProductInput(createProductData)
    if (validationResult !== true) return setValidationError(validationResult)
    requestCreateProduct(createProductData).then(res => {
      if (!res.isSuccess) { return setValidationError(res.payload) }
      setFormStage(1)
      setCreateProductData(blankData)
      setTimeout(() => { setFormStage(0) }, 3000)
      return
    })
  }
  return (
    <>
      <Header />
      <div className="container">
        {authToken && formStage == 0 &&
          <form className='create' onSubmit={submitProduct}>
            <h1>Создать продукт</h1>
            <div className="create__header">
              <label className="create__label create__label--name">
                <legend>Название</legend>
                <input type="text" name="name" onChange={handleUserInput} required />
              </label>
              <select
                className="products__filter"
                onChange={handleUserInput}
                value={createProductData.status}
              >
                <option value="available">Доступен</option>
                <option value="present">В наличии</option>
                <option value="ending">Кончается</option>
                <option value="none">Недоступен</option>
              </select>
            </div>
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

export default CreateProduct