import axios from 'axios'
import oauth from '../endpoints/oauth'
const reqq = async function (_baseURL = 'https://sandbox.safaricom.co.ke') {
const credentials = await oauth()
const instance = axios.create({
    baseURL: _baseURL || this.baseURL,
    timeout: 5000,
    headers: {
        'Authorization': 'Bearer ' + credentials.data['access_token'],
        'Content-Type': 'application/json'
    }
})
return instance    
}

export default reqq;