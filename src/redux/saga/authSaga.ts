import { put, takeLatest, call } from 'redux-saga/effects';
import { loginSuccess, logout } from '../reducers/authReducer';

const login = async (username: string) => {
    localStorage.setItem('user', username)
    return username;
};

function* handleLogin(action: { payload: { username: string } }): Generator<any, void, string> {
    try {
        const { username } = action.payload;
        const result: string = yield call(login, username);
        yield put(loginSuccess(result));
    } catch (error) {
        console.error('Login failed:', error);
        yield put(logout());
    }
}

export function* watchLogin() {
    yield takeLatest('auth/login', handleLogin as any);
}


