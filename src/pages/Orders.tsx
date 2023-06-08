import Header from '../components/Header'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import { requestAllOrders } from '../api/api'
import SmallOrder from '../components/SmallOrder'
import { useSelector } from 'react-redux'
import { Order } from '../types'

const MainPage = () => {
  const blankData: Order[] = [
    // {
    //   id: 0,
    //   contactNumber: '',
    //   createdBy: '',
    //   email: '',
    //   name: '',
    //   paymentMethod: '',
    //   productDetail: '',
    //   total: 0,
    //   uuid: '',
    // }
  ]
  const [orderList, setOrderList] = useState(blankData)
  const { isLoading } = useSelector((state: any) => state.status)
  const { authToken } = useSelector((state: any) => state.auth)

  useEffect(() => {
    const fetchAllOrders = async () => {
      const allOrders = (await requestAllOrders()).payload.data
      setOrderList(allOrders.data)
    }
    fetchAllOrders()
  }, [])

  return (
    <>
      <Header />
      <div className="container orders">
        {authToken && (orderList && (
          <>
            <h1 className="orders__title">Список заказов</h1>
            <div className="orders__items">
              {orderList.length > 0 && orderList.map((el, key) => <SmallOrder order={el} key={key} />)}
            </div>
          </>
        ))
        }
        {authToken && isLoading && <p className='orders__notification'>Загрузка...</p>}
        {authToken && !orderList && <p className='orders__notification'>Заказов нет.</p>}
        {!authToken && <p className='orders__notification'>Войдите в аккаунт.</p>}
      </div >
      <Footer />
    </>
  )
}

export default MainPage