import { Link } from 'react-router-dom'

const SmallProduct = (props: any) => {
  const { product } = props
  return (
    <>
      <Link className={`small-product ${product.status == 'Available' ? 'small-product--available' : product.status == 'Ending' ? 'small-product--ending' : product.status == 'None' ? 'small-product--none' : ''}`} to={`/product/${product.id}`}>
        <p className="small-product__id">#{product.id}</p>
        <h2 className='small-product__title'>{product.name}</h2>
        <p className='small-product__text'>{product.description}</p>
        <p className='small-product__text'>{product.price}$</p>
      </Link>
    </>
  )
}

export default SmallProduct