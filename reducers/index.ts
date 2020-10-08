import { combineReducers } from 'redux';
import board from './board';
import auth from './auth';
import notification from './notification';
import search from './search';

type RootType = ReturnType<typeof rootReducer>;

const rootReducer: RootType = combineReducers({
    auth,
    board,
    notification,
    search,
});

export default rootReducer;
