import { all, fork } from 'redux-saga/effects';
import authSaga from './auth';
import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';
import notificationSaga from './notification';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Cache-Control'] = 'no-cache';
// let url = 'https://api.villain.school';
//
// if (process.env.BUILD_ENV == 'production') {
//     url = 'https://api.villain.school';
// }
//
// if (process.env.BUILD_ENV == 'development') {
//     url = 'https://dev.villain.school';
// }
// axios.defaults.baseURL = url;
axios.defaults.adapter = cacheAdapterEnhancer(axios.defaults.adapter, {
    enabledByDefault: false,
    cacheFlag: 'useCache',
});

export default function* rootSaga() {
    yield all([
        console.log('%c🌈스쿨빌런', 'background-color:#9067ff; color:white; font-size:50px;'),
        console.log(
            '%c잠깐만!\n' +
                '사이트 해킹 및 공격을 할 경우 사기 행위로 간주하오니, 이에 대해서는 법적 책임을 묻게될 수 있으니 조심하시길 바랍니다.',
            'text-shadow:0 0 1px black; color:#ff0000; font-size:13px;'
        ),
        console.log('%c다 함께 깨끗한 인터넷 문화를 만들어요.', 'color:#9067ff; font-size:15px;'),
        fork(authSaga),
        fork(notificationSaga),
    ]);
}
