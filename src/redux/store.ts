import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './saga';
import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { GetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';


type CustomMiddleware = Middleware<{}, Dispatch<any>> & {
    run: SagaMiddleware<MiddlewareAPI<Dispatch<any>, {}>>['run'];
};

const sagaMiddleware = createSagaMiddleware();

const middleware: CustomMiddleware[] = [
    sagaMiddleware as CustomMiddleware,
];

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware: GetDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

