import { all, call, put } from 'redux-saga/effects';

import { getLogged } from '../reducers/auth';
import axios from 'axios';
import root from 'window-or-global';

export default function* authSaga() {
    yield all([getLogged$()]);
}

const AuthCheckAPI = () => {
    return axios.get('/api/user/auth/check');
};

function* getLogged$() {
    try {
        const logged = yield call(AuthCheckAPI);
        yield put(getLogged(logged.data.is_user));
        root?.sessionStorage?.setItem('logged', logged.data.is_user);
    } catch (err) {
        console.log(err);
        yield put(getLogged(null));
        root?.sessionStorage?.removeItem('logged');
    }
}
