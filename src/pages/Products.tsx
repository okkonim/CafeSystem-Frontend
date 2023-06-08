import Header from "../components/Header";
import Footer from "../components/Footer";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { requestAllProducts } from "../api/api";
import SmallProduct from "../components/SmallProduct";
import { useSelector } from "react-redux";
import { Product } from "../types";

const Products = () => {
  const blankData: Product[] = [
    {
      id: 0,
      name: "",
      description: "",
      price: 0,
    },
  ];
  const [productList, setProductList]: [Product[], React.Dispatch<Product[]>] =
    useState(blankData);
  const [filter, setFilter] = useState("all");
  const { authToken } = useSelector((state: any) => state.auth);
  const { isLoading } = useSelector((state: any) => state.status);

  const handleChangeEvent: ChangeEventHandler = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    setFilter(e.target.value);
  };

  const filterProducts = (product: Product): boolean => {
    switch (filter) {
      case "all":
        return true;
      case "available":
        return product.status == "available";
      case "ending":
        return product.status == "ending";
      case "none":
        return product.status == "none";
      default:
        return true;
    }
  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      const allProducts = (await requestAllProducts()).payload.data;
      setProductList(allProducts);
    };
    fetchAllProducts();
  }, []);

  return (
    <>
      <Header />
      <div className="container products">
        {authToken && (productList && (
          <>
            <h1 className="products__title">Список блюд</h1>
            <select
              className="products__filter"
              onChange={handleChangeEvent}
              value={filter}
            >
              <option value="all">Все</option>
              <option value="available">Доступные</option>
              <option value="ending">Заканчивающиеся</option>
              <option value="none">Недоступные</option>
            </select>
            <div className="products__items">
              {productList.length > 0 && productList.filter(filterProducts).map((el, key) => <SmallProduct product={el} key={key} />)}
            </div>
          </>
        ))
        }
        {authToken && isLoading && <p className='products__notification'>Загрузка...</p>}
        {authToken && !productList && <p className='products__notification'>Блюд нет.</p>}
        {!authToken && <p className='products__notification'>Войдите в аккаунт.</p>}
      </div >
      <Footer />
    </>
  );
};

export default Products;
