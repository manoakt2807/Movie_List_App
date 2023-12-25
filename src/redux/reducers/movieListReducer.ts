import { createSlice } from '@reduxjs/toolkit';

interface MoviesList {
    data: any[];
}

const initialState: MoviesList = {
    data: [],
};



const movieListSlice = createSlice({
    name: 'moviesList',
    initialState,
    reducers: {
        setMoveList: (state, action) => {
            state.data = action.payload
        }
    },
});

export const { setMoveList } = movieListSlice.actions;
export const getMoviesList = (state: { moviesList: MoviesList }) => state.moviesList.data
export default movieListSlice.reducer;
