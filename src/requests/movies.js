import axios from 'axios';

const API_KEY = '157f34ed'; //Needs to be kept on server
const API_URL = 'http://www.omdbapi.com/'

export const searchMovies = (title, pageNum, year) => {
    return axios.get(`${API_URL}?apikey=${API_KEY}&type=movie&page=${pageNum}&y=${year}&s=${title.replace(year, '').trim()}`)
}