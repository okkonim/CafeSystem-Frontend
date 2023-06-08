import { LoginData, ForgotData, RegisterData, CreateProductData, ProfileData } from "../types"

export const validateLoginInput = (user: LoginData): string | true => {
  if (!user) return 'Нет данных'
  if (!user.email) return 'Введите email'
  if (user.email.length > 50) return 'Слишком длинный email'
  if (!user.password) return 'Введите пароль'
  if (user.password.length > 50) return 'Слишком длинный пароль'
  return true
}

export const validateForgotInput = (user: ForgotData): string | true => {
  if (!user.email) return 'Введите email'
  if (user.email.length > 50) return 'Слишком длинный email'
  return true
}

export const validateRegisterInput = (user: RegisterData): string | true => {
  if (!user) return 'Нет данных'
  if (!user.name) return 'Введите никнейм'
  if (user.name.length > 50) return 'Слишком длинный никнейм'
  if (!user.contactNumber) return 'Введите телефон'
  // if (user.contactNumber.length != 11) return 'Некорректный номер'
  if (!user.contactNumber.match(/^\d+$/)) return 'Номер должен состоять только из чисел'
  if (user.password.length > 50) return 'Слишком длинный пароль'
  return true
}

export const validateProfileInput = (data: ProfileData): string | true => {
  if (!data.oldPassword) return 'Введите старый пароль'
  if (data.password && !data.password2) return 'Подтвердите пароль'
  if (!data.password && data.password2) return 'Введите пароль в первое поле'
  if (data.password !== data.password2) return 'Пароли не совпадают'
  if (data.password.length > 50) return 'Слишком длинный пароль'
  return true
}


export const validateCreateProductInput = (product: CreateProductData): string | true => {
  if (!product.name) return 'Введите название'
  if (product.name.length > 50) return 'Название слишком длинное'
  if (!product.image) return 'Добавьте картинку'
  if (product.image.length > 200) return 'Ссылка слишком длинная'
  if (!product.description) return 'Введите описание'
  if (!product.price) return 'Введите цену'
  // if (!product.price.match(/^\d+$/)) return 'Цена должна быть числом'
  return true
}

export const validateEditProductInput = (product: EditProductData): string | true => {
  if (!product.name) return 'Введите название'
  if (product.name.length > 50) return 'Название слишком длинное'
  if (!product.image) return 'Добавьте картинку'
  if (product.image.length > 200) return 'Ссылка слишком длинная'
  if (!product.description) return 'Введите описание'
  if (!product.price) return 'Введите цену'
  // if (!product.price.match(/^\d+$/)) return 'Цена должна быть числом'
  return true
}

