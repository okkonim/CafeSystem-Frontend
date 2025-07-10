import axios, { AxiosResponse } from 'axios'
import { LoginData, ForgotData, RegisterData, CreateProductData, EditProductData, ProfileData, CreateOrderData, EditOrderData } from '../types'
// store imports
import store from '../store/store'
import { logIn, logOut, setAuthToken } from '../store/auth'
import { setIsLoading } from '../store/status'

// api endpoints DEV
export const APIURL = 'http://localhost:8081'

// auth token interceptor
let authToken = localStorage.getItem('authToken') || ''
store.dispatch(setAuthToken(authToken))
axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`

// Глобальный перехватчик ошибок для axios
axios.interceptors.response.use(
  (res: AxiosResponse) => res,
  (err: any) => {
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      // Автоматический выход пользователя при невалидном токене
      store.dispatch(logOut())
      store.dispatch(setAuthToken(null))
      localStorage.removeItem('authToken')
      // Можно добавить редирект на страницу логина, если есть доступ к history
    }
    return Promise.reject(err)
  }
)

const getErrorMessage = (err: any) => {
  return (err.response?.data?.message || err.response?.data?.error || err.message || 'Ошибка')
}

// requests

// auth
export const requestLogIn = (userData: LoginData) => {
  store.dispatch(setIsLoading(true))
  return axios.post(`${APIURL}/user/login`, userData).then((res: AxiosResponse) => {
    store.dispatch(setIsLoading(false))
    authToken = res.data.token
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
    store.dispatch(setAuthToken(authToken))
    localStorage.setItem('authToken', authToken)
    // Удалён вывод токена в консоль
    return { isSuccess: true, payload: res }
  }).catch((err: any) => {
    // Удалён вывод ошибки в консоль
    store.dispatch(setIsLoading(false))
    return { isSuccess: false, payload: getErrorMessage(err) }
  })
}

export const requestForgot = (userData: ForgotData) => {
  store.dispatch(setIsLoading(true))
  return axios.post(`${APIURL}/user/forgot-password`, userData).then((res: AxiosResponse) => {
    store.dispatch(setIsLoading(false))
    console.log(`Forgot Password`)
    return { isSuccess: true, payload: res }
  }).catch((err: any) => {
    console.log(`Error: "${getErrorMessage(err)}"`)
    store.dispatch(setIsLoading(false))
    return { isSuccess: false, payload: getErrorMessage(err) }
  })
}

export const requestRegister = (userData: RegisterData) => {
  store.dispatch(setIsLoading(true))
  return axios.post(`${APIURL}/user/signup`, { ...userData, password: Number(userData.password) }).then((res: AxiosResponse) => {
    // return axios.post(`${APIURL}/user/register`, userData).then((res: AxiosResponse) => {
    store.dispatch(setIsLoading(false))
    // Удалён вывод в консоль
    return { isSuccess: true, payload: res }
  }).catch((err: any) => {
    // Удалён вывод ошибки в консоль
    store.dispatch(setIsLoading(false))
    return { isSuccess: false, payload: getErrorMessage(err) }
  })
}

export const requestLogOut = () => {
  axios.post(`${APIURL}/logout`)
  axios.defaults.headers.common['Authorization'] = ``
  store.dispatch(logOut())
  store.dispatch(setAuthToken(null))
  localStorage.removeItem('authToken')
  // Удалён вывод в консоль
}


// product
export const requestEditProduct = (productData: EditProductData) => {
  store.dispatch(setIsLoading(true))
  return axios.post(`${APIURL}/product/update`, {
    ...productData,
    status: "Available",
    categoryId: 1,
    categoryName: "default",
    price: Number(productData.price)
  }).then((res: AxiosResponse) => {
    store.dispatch(setIsLoading(false))
    return { isSuccess: true, payload: res }
  }).catch((err: any) => {
    console.log(`Error: "${getErrorMessage(err)}"`)
    store.dispatch(setIsLoading(false))
    return { isSuccess: false, payload: getErrorMessage(err) }
  })
}

export const requestCreateProduct = (productData: CreateProductData) => {
  store.dispatch(setIsLoading(true))
  return axios.post(`${APIURL}/product/add`, {
    ...productData,
    categoryId: 1,
    categoryName: "default",
    price: Number(productData.price)
  }).then((res: AxiosResponse) => {
    store.dispatch(setIsLoading(false))
    return { isSuccess: true, payload: res }
  }).catch((err: any) => {
    console.log(`Error: "${getErrorMessage(err)}"`)
    store.dispatch(setIsLoading(false))
    return { isSuccess: false, payload: getErrorMessage(err) }
  })
}

export const requestAllProducts = () => {
  store.dispatch(setIsLoading(true))
  return axios.get(`${APIURL}/product/get`).then((res: AxiosResponse) => {
    store.dispatch(setIsLoading(false))
    console.log('Product list')
    return { isSuccess: true, payload: res }
  }).catch((err: any) => {
    console.log(`Error: "${getErrorMessage(err)}"`)
    store.dispatch(setIsLoading(false))
    return { isSuccess: false, payload: getErrorMessage(err) }
  })
}

export const requestProductByID = (productID: number) => {
  store.dispatch(setIsLoading(true))
  return axios.get(`${APIURL}/product/get/${productID}`).then((res: AxiosResponse) => {
    store.dispatch(setIsLoading(false))
    return { isSuccess: true, payload: res }
  }).catch((err: any) => {
    console.log(`Error: "${getErrorMessage(err)}"`)
    store.dispatch(setIsLoading(false))
    return { isSuccess: false, payload: getErrorMessage(err) }
  })
}

export const requestDeleteProductByID = (productID: number) => {
  store.dispatch(setIsLoading(true))
  return axios.delete(`${APIURL}/product/delete/${productID}`).then((res: AxiosResponse) => {
    store.dispatch(setIsLoading(false))
    return { isSuccess: true, payload: res }
  }).catch((err: any) => {
    console.log(`Error: "${getErrorMessage(err)}"`)
    store.dispatch(setIsLoading(false))
    return { isSuccess: false, payload: getErrorMessage(err) }
  })
}

// profile
export const requestProfileInfo = () => {
  store.dispatch(setIsLoading(true))
  return axios.get(`${APIURL}/user/get`).then((res: AxiosResponse) => {
    store.dispatch(setIsLoading(false))
    return { isSuccess: true, payload: res.data?.payload }
  }).catch((err: any) => {
    console.log(`Error: "${getErrorMessage(err)}"`)
    store.dispatch(setIsLoading(false))
    return { isSuccess: false, payload: getErrorMessage(err) }
  })
}

export const requestEditProfileInfo = (profileData: ProfileData) => {
  store.dispatch(setIsLoading(true))
  return axios.put(`${APIURL}/user/change-password`, profileData).then((res: AxiosResponse) => {
    store.dispatch(setIsLoading(false))
    store.dispatch(logIn(res.data))
    return { isSuccess: true, payload: res }
  }).catch((err: any) => {
    console.log(`Error: "${getErrorMessage(err)}"`)
    store.dispatch(setIsLoading(false))
    return { isSuccess: false, payload: getErrorMessage(err) }
  })
}

// order
export const requestEditOrder = (orderData: EditOrderData) => {
  store.dispatch(setIsLoading(true))
  return axios.post(`${APIURL}/bill/update`, {
    ...orderData,
    status: "Available",
    categoryId: 1,
    categoryName: "default",
    price: Number(orderData.price)
  }).then((res: AxiosResponse) => {
    store.dispatch(setIsLoading(false))
    return { isSuccess: true, payload: res }
  }).catch((err: any) => {
    console.log(`Error: "${getErrorMessage(err)}"`)
    store.dispatch(setIsLoading(false))
    return { isSuccess: false, payload: getErrorMessage(err) }
  })
}

export const requestCreateOrder = (orderData: CreateOrderData) => {
  store.dispatch(setIsLoading(true))
  return axios.post(`${APIURL}/bill/add`, {
    ...orderData,
    status: "Available",
    categoryId: 1,
    categoryName: "default",
    price: Number(orderData.price)
  }).then((res: AxiosResponse) => {
    store.dispatch(setIsLoading(false))
    return { isSuccess: true, payload: res }
  }).catch((err: any) => {
    console.log(`Error: "${getErrorMessage(err)}"`)
    store.dispatch(setIsLoading(false))
    return { isSuccess: false, payload: getErrorMessage(err) }
  })
}

export const requestAllOrders = () => {
  store.dispatch(setIsLoading(true))
  return axios.get(`${APIURL}/bill`).then((res: AxiosResponse) => {
    store.dispatch(setIsLoading(false))
    console.log('Order list')
    return { isSuccess: true, payload: res }
    // }).catch(err => {
    //   console.log(`Error: "${getErrorMessage(err)}"`)
    //   store.dispatch(setIsLoading(false))
    //   return { isSuccess: false, payload: getErrorMessage(err) }
  })
}

export const requestOrderByID = (orderID: number) => {
  store.dispatch(setIsLoading(true))
  return axios.get(`${APIURL}/bill/get/${orderID}`).then((res: AxiosResponse) => {
    store.dispatch(setIsLoading(false))
    return { isSuccess: true, payload: res }
  }).catch((err: any) => {
    console.log(`Error: "${getErrorMessage(err)}"`)
    store.dispatch(setIsLoading(false))
    return { isSuccess: false, payload: getErrorMessage(err) }
  })
}

export const requestDeleteOrderByID = (orderID: number) => {
  store.dispatch(setIsLoading(true))
  return axios.delete(`${APIURL}/bill/delete/${orderID}`).then((res: AxiosResponse) => {
    store.dispatch(setIsLoading(false))
    return { isSuccess: true, payload: res }
  }).catch((err: any) => {
    console.log(`Error: "${getErrorMessage(err)}"`)
    store.dispatch(setIsLoading(false))
    return { isSuccess: false, payload: getErrorMessage(err) }
  })
}

