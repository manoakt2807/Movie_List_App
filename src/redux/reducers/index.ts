// reducers.ts
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import movieListReducer from './movieListReducer';
// Import your other reducers here

const rootReducer = combineReducers({
    auth: authReducer,
    moviesList: movieListReducer
});

export default rootReducer;
