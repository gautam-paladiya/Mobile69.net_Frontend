import Axios from 'axios'

export const AxiosInstance = Axios.create({
  baseURL: `${process.env.PUBLIC_URL}`
})
