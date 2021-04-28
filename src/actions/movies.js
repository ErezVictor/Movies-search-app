import {searchMovies as searchMoviesReq} from '../requests/movies';

export const searchMovie = (title, pageNum, year) => {
    return new Promise(async (resolve, reject) => {
        const results = await searchMoviesReq(title, pageNum, year);
        if (results.data != undefined && results.data.Search != undefined && results.data.Search.length > 0) {
            resolve(results.data.Search);
        } else {
            resolve([]);
        }
    });
}