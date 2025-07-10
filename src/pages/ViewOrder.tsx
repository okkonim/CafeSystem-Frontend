import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { requestDeleteOrderByID, requestOrderByID } from '../api/api';
import BigOrder from '../components/BigOrder';
import { Link } from 'react-router-dom';
import { Order } from '../types';

const ViewOrder = () => {
  const blankData = {
    id: 0,
    name: '',
    description: '',
    price: 0
  }
  const { orderID } = useParams()
  const [order, setOrder]: [Order, React.Dispatch<Order>] = useState(blankData)


  const deleteOrder = () => {
    requestDeleteOrderByID(Number(orderID))
  }

  useEffect(() => {
    const fetchOrderData = async () => {
      const orderData = (await requestOrderByID(Number(orderID))).payload.data
      return setOrder(orderData)
    }
    fetchOrderData()
  }, [])


  return (
    <>
      <Header />
      <div className="container">
        <Link className="view-order__back" to="/orders">Вернуться к списку</Link>
        <BigOrder order={order} />
        <Link className='view-order__button' to={`/edit/${order.id}`}>Редактировать</Link>
        <button className='view-order__button' onClick={deleteOrder}>Удалить</button>
      </div>
      <Footer />
    </>
  )
}

export default ViewOrder