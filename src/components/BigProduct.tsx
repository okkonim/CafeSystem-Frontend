const BigProduct = (props: any) => {
  const { product } = props
  return (
    <>
      <h2 className='product__title'>{product.name} (#{product.id})</h2>
      {product.image && <img className='product__image' src={product.image} alt="Banner" />}
      <p className='product__text'>{product.description}</p>
      <p className='product__text'>{product.price}$</p>
    </>
  )
}

export default BigProduct