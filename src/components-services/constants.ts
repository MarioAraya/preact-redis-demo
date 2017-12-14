import axios from 'axios'

export const axiosConfig = {
    baseURL: 'http://localhost:41072',
    timeout: 5000,
    headers: { Accept: 'application/json' }
}
export const httpClient = axios.create(this.axiosConfig)