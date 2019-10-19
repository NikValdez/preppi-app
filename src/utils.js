import { AsyncStorage } from 'react-native'

let token

export const login = newToken => {
  return AsyncStorage.setItem('token', newToken)
}
export const getToken = async () => {
  token = await AsyncStorage.getItem('token')
  // console.log(token)
  return token
}
export const signout = () => {
  token = undefined
  return AsyncStorage.removeItem('token')
}

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('token')
    return true
  } catch (exception) {
    return false
  }
}
