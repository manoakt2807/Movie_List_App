import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { setMoveList } from '../reducers/movieListReducer';


const API_ENDPOINT = 'https://api.themoviedb.org/3/movie/popular';
const API_KEY = '68b4fe2a513155a58dd0af4adacb281b';


interface ApiResponse {
    results: [];

}

const fetchPopularMovies = async (currentPage: number): Promise<ApiResponse> => {
    try {
        const response = await axios.get(`${API_ENDPOINT}?api_key=${API_KEY}&page=${currentPage}`);
        return response.data.results;
    } catch (error) {
        throw new Error('Failed to fetch popular movies');
    }
};


function* handleFetchMovies(action: { type: string; payload: { currentPage: number } }): Generator<any, void, string> {
    try {
        yield put(setMoveList([]));
        const { currentPage } = action.payload;
        const response = yield call(fetchPopularMovies, currentPage);
        yield put(setMoveList(response));
    } catch (error) {
        console.log(error)
    }
}

function* searchMovies(action: { type: string; payload: { search: string, movieList: any[] } }): Generator<any, void, string> {
    try {
        const { search, movieList } = action.payload
        const filteredMovies = movieList.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase()));
        yield put(setMoveList(filteredMovies));
    } catch (err) {
        console.log(err)
    }
}

export function* watchFetchMovies() {
    yield takeLatest('FETCH_MOVIES', handleFetchMovies);
}

export function* searchMovie() {
    yield takeLatest('SEARCH_MOVIE', searchMovies)
}
