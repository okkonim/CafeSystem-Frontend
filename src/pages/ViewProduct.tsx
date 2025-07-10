import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { requestDeleteProductByID, requestProductByID } from '../api/api'
import BigProduct from '../components/BigProduct'
import { Link } from 'react-router-dom'
import { Product } from '../types'

const ViewProduct = () => {
  const blankData = {
    id: 0,
    name: '',
    description: '',
    price: 0
  }
  const { productID } = useParams()
  const [product, setProduct]: [Product, React.Dispatch<Product>] = useState(blankData)


  const deleteProduct = () => {
    requestDeleteProductByID(Number(productID))
  }

  useEffect(() => {
    const fetchProductData = async () => {
      const productData = (await requestProductByID(Number(productID))).payload.data
      return setProduct(productData)
    }
    fetchProductData()
  }, [])


  return (
    <>
      <Header />
      <div className="container">
        <Link className="view-product__back" to="/products">Вернуться к списку</Link>
        <BigProduct product={product} />
        <Link className='view-product__button' to={`/edit/${product.id}`}>Редактировать</Link>
        <button className='view-product__button' onClick={deleteProduct}>Удалить</button>
      </div>
      <Footer />
    </>
  )
}

export default ViewProduct