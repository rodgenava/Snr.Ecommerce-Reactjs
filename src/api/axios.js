import axios from 'axios';
import ApiConstants from './constants';

export default axios.create({
    baseURL: ApiConstants.baseUrl
});