const BigOrder = (props: any) => {
  const { order } = props
  return (
    <>
      <h2 className='order__title'>{order.name} (#{order.id})</h2>
      {order.image && <img className='order__image' src={order.image} alt="Banner" />}
      <p className='order__text'>{order.description}</p>
      <p className='order__text'>{order.price}$</p>
    </>
  )
}

export default BigOrder