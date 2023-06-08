import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore"

export interface LoginData {
  email: string,
  password: string
}

export interface ForgotData {
  email: string
}
export interface RegisterData {
  name: string,
  email: string,
  contactNumber: string,
  password: string,
}

export type Product = {
  id: number,
  description: string,
  name: string,
  price: number,
  status?: string,
  // categoryId: number,
  // categoryName: string
}

export type Order = {
  id: number,
  contactNumber: string,
  createdBy: string,
  email: string,
  name: string,
  paymentMethod: string,
  productDetail: string,
  total: number,
  uuid: string,
}

export type User = null | {
  id: number,
  name: string,
  password?: string,
  email?: string,
}

export type ProfileData = {
  oldPassword: string,
  password: string,
  password2: string,
}

export interface StatusStore {
  isLoading: boolean,
}

export interface AuthStore {
  user: User,
  authToken: string | null
}

export type Store = ToolkitStore<{ status: StatusStore, auth: AuthStore }>

export interface CreateProductData {
  name: string,
  image: string,
  description: string,
  price: number,
  status: string
}

export interface EditProductData {
  id: number,
  name: string,
  image: string,
  description: string,
  price: number,
  status: string
}

export interface CreateOrderData {
  name: string,
  image: string,
  description: string,
  price: number
}

export interface EditOrderData {
  id: number,
  name: string,
  image: string,
  description: string,
  price: number
}