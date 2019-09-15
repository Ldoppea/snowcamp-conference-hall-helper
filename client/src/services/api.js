import axios from 'axios'

export default () => {
  const baseURL = process.env.VUE_APP_ROOT_API
  console.log('base url is', baseURL)
  return axios.create({
    baseURL
  })
}
