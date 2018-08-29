import axios from 'axios'

export const axiosConfig = {
    baseURL: 'https://api-forecast-redis.azurewebsites.net',
    timeout: 5000,
    headers: { Accept: 'application/json' }
}
export const httpClient = axios.create(this.axiosConfig)