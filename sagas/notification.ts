import { all, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { readNotificationCount } from '../reducers/notification';

export default function* notificationSaga() {
    yield all([getNotificationCount$()]);
}

const NotificationCountAPI = () => {
    return axios.get('/api/notice/badge');
};

function* getNotificationCount$() {
    try {
        const count = yield call(NotificationCountAPI);
        // console.log(count);
        yield put(readNotificationCount(count.data.badge));
    } catch (err) {
        console.log(err);
        yield put(readNotificationCount(null));
    }
}
