import root from 'window-or-global';
const AUTH_LOGIN_REQUEST = 'auth/LOGIN_REQUEST' as const;
const AUTH_LOGIN_FAILURE = 'auth/LOGIN_FAILURE' as const;
const AUTH_LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS' as const;

const AUTH_LOGOUT_REQUEST = 'auth/LOGOUT_REQUEST' as const;
const AUTH_LOGOUT_FAILURE = 'auth/LOGOUT_FAILURE' as const;
const AUTH_LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS' as const;

export const GET_LOGGED = 'auth/GET_LOGGED' as const;

export const authLoginRequest = () => ({
    type: AUTH_LOGIN_REQUEST,
});
export const authLoginFailure = () => ({
    type: AUTH_LOGIN_FAILURE,
});
export const authLoginSuccess = () => ({
    type: AUTH_LOGIN_SUCCESS,
});

export const authLogoutRequest = () => ({
    type: AUTH_LOGOUT_REQUEST,
});
export const authLogoutFailure = () => ({
    type: AUTH_LOGOUT_FAILURE,
});
export const authLogoutSuccess = () => ({
    type: AUTH_LOGOUT_SUCCESS,
});

export const getLogged = (logged: boolean | null) => ({
    type: GET_LOGGED,
    payload: {
        logged: logged,
    },
});

interface stateType {
    loading: {
        login: boolean;
        logout: boolean;
    };
    logged: boolean | null;
}

const initialState: stateType = {
    loading: {
        login: false,
        logout: false,
    },
    logged: Boolean(root.sessionStorage?.getItem('logged')),
};

const handleAuth = (state: stateType = initialState, action: any) => {
    switch (action.type) {
        case AUTH_LOGIN_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    login: true,
                },
            };
        case AUTH_LOGIN_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    login: false,
                },
            };
        case AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    login: false,
                },
                logged: true,
            };
        case AUTH_LOGOUT_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    logout: true,
                },
            };
        case AUTH_LOGOUT_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    logout: false,
                },
            };
        case AUTH_LOGOUT_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    logout: false,
                },
                logged: null,
            };
        case GET_LOGGED:
            return {
                ...state,
                logged: action.payload.logged,
            };
        default:
            return state;
    }
};

export default handleAuth;
