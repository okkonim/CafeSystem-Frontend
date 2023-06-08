import { Link } from 'react-router-dom'

const SmallOrder = (props: any) => {
  const { order } = props
  return (
    <>
      <Link className={`small-order ${order.status == 'Available' ? 'small-order--available' : order.status == 'Ending' ? 'small-order--ending' : order.status == 'None' ? 'small-order--none' : ''}`} to={`/order/${order.id}`}>
        <p className="small-order__id">#{order.id}</p>
        <h2 className='small-order__title'>{order.name}</h2>
        <p className='small-order__text'>{order.description}</p>
        <p className='small-order__text'>{order.price}$</p>
      </Link>
    </>
  )
}

export default SmallOrder