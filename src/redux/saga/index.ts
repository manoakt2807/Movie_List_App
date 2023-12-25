// sagas.ts
import { all } from 'redux-saga/effects';
import { watchLogin } from './authSaga';
import { watchFetchMovies, searchMovie } from './movieListSaga';

export default function* rootSaga() {
    yield all([
        watchLogin(),
        watchFetchMovies(),
        searchMovie()
    ]);
}
