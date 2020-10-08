//액션 타입글
const BOARD_LIST_REQUEST = 'board/BOARD_LIST_REQUEST' as const;
const LIKE_BOARD_LIST_REQUEST = 'board/LIKE_BOARD_LIST_REQUEST' as const;
const POST_BOARD_LIST_REQUEST = 'board/POST_BOARD_LIST_REQUEST' as const;
const REPLY_BOARD_LIST_REQUEST = 'board/REPLY_BOARD_LIST_REQUEST' as const;

//게시판
const BOARD_LIKE_REQUEST = 'board/BOARD_LIKE_REQUEST' as const;
const BOARD_LIKE_SUCCESS = 'board/BOARD_LIKE_SUCCESS' as const;
const BOARD_LIKE_FAILURE = 'board/BOARD_LIKE_FAILURE' as const;

const BOARD_SAVE_REQUEST = 'board/BOARD_SAVE_REQUEST' as const;
const BOARD_SAVE_SUCCESS = 'board/BOARD_SAVE_SUCCESS' as const;
const BOARD_SAVE_FAILURE = 'board/BOARD_SAVE_FAILURE' as const;

const BOARD_EDIT_REQUEST = 'board/BOARD_EDIT_REQUEST' as const;
const BOARD_EDIT_SUCCESS = 'board/BOARD_EDIT_SUCCESS' as const;
const BOARD_EDIT_FAILURE = 'board/BOARD_EDIT_FAILURE' as const;

const BOARD_DELETE_REQUEST = 'board/BOARD_DELETE_REQUEST' as const;
const BOARD_DELETE_SUCCESS = 'board/BOARD_DELETE_SUCCESS' as const;
const BOARD_DELETE_FAILURE = 'board/BOARD_DELETE_FAILURE' as const;

//댓
const REPLY_LIKE_REQUEST = 'board/REPLY_LIKE_REQUEST' as const;
const REPLY_LIKE_FAILURE = 'board/REPLY_LIKE_FAILURE' as const;
const REPLY_LIKE_SUCCESS = 'board/REPLY_LIKE_SUCCESS' as const;

const REPLY_SAVE_REQUEST = 'board/REPLY_SAVE_REQUEST' as const;
const REPLY_SAVE_FAILURE = 'board/REPLY_SAVE_FAILURE' as const;
const REPLY_SAVE_SUCCESS = 'board/REPLY_SAVE_SUCCESS' as const;

const REPLY_DELETE_REQUEST = 'board/REPLY_DELETE_REQUEST' as const;
const REPLY_DELETE_FAILURE = 'board/REPLY_DELETE_FAILURE' as const;
const REPLY_DELETE_SUCCESS = 'board/REPLY_DELETE_SUCCESS' as const;

//액션 생성 함수
export const boardListRequest = (boardList: any, boardPage: number) => ({
    type: BOARD_LIST_REQUEST,
    payload: {
        boardList: boardList,
        boardPage: boardPage,
    },
});

export const likeBoardListRequest = (likeBoardList: any, likeBoardPage: number) => ({
    type: LIKE_BOARD_LIST_REQUEST,
    payload: {
        likeBoardList: likeBoardList,
        likeBoardPage: likeBoardPage,
    },
});
export const postBoardListRequest = (postBoardList: any, postBoardPage: number) => ({
    type: POST_BOARD_LIST_REQUEST,
    payload: {
        postBoardList: postBoardList,
        postBoardPage: postBoardPage,
    },
});
export const replyBoardListRequest = (replyBoardList: any, replyBoardPage: number) => ({
    type: REPLY_BOARD_LIST_REQUEST,
    payload: {
        replyBoardList: replyBoardList,
        replyBoardPage: replyBoardPage,
    },
});

export const boardLikeRequest = () => ({
    type: BOARD_LIKE_REQUEST,
});
export const boardLikeSuccess = () => ({
    type: BOARD_LIKE_SUCCESS,
});
export const boardLikeFailure = () => ({
    type: BOARD_LIKE_FAILURE,
});

export const boardSaveRequest = () => ({
    type: BOARD_SAVE_REQUEST,
});
export const boardSaveSuccess = () => ({
    type: BOARD_SAVE_SUCCESS,
});
export const boardSaveFailure = () => ({
    type: BOARD_SAVE_FAILURE,
});

export const boardEditRequest = () => ({
    type: BOARD_EDIT_REQUEST,
});
export const boardEditSuccess = () => ({
    type: BOARD_EDIT_SUCCESS,
});
export const boardEditFailure = () => ({
    type: BOARD_EDIT_FAILURE,
});

export const boardDeleteRequest = () => ({
    type: BOARD_DELETE_REQUEST,
});
export const boardDeleteSuccess = () => ({
    type: BOARD_DELETE_SUCCESS,
});
export const boardDeleteFailure = () => ({
    type: BOARD_DELETE_FAILURE,
});

export const replyLikeRequest = () => ({
    type: REPLY_LIKE_REQUEST,
});
export const replyLikeFailure = () => ({
    type: REPLY_LIKE_FAILURE,
});
export const replyLikeSuccess = () => ({
    type: REPLY_LIKE_SUCCESS,
});
export const replySaveRequest = () => ({
    type: REPLY_SAVE_REQUEST,
});
export const replySaveFailure = () => ({
    type: REPLY_SAVE_FAILURE,
});
export const replySaveSuccess = () => ({
    type: REPLY_SAVE_SUCCESS,
});
export const replyDeleteRequest = () => ({
    type: REPLY_DELETE_REQUEST,
});
export const replyDeleteFailure = () => ({
    type: REPLY_DELETE_FAILURE,
});
export const replyDeleteSuccess = () => ({
    type: REPLY_DELETE_SUCCESS,
});

interface stateType {
    loading: {
        like: boolean;
        save: boolean;
        edit: boolean;
        delete: boolean;
    };
    boardPage: number;
    boardList: any;
    likeBoardPage: number;
    likeBoardList: any;
    postBoardPage: number;
    postBoardList: any;
    replyBoardPage: number;
    replyBoardList: any;
    board: any;
    reply: any;
    likeId: number;
}

const initialState: stateType = {
    loading: {
        like: false,
        save: false,
        edit: false,
        delete: false,
    },
    boardPage: 1,
    boardList: [],
    likeBoardPage: 1,
    likeBoardList: [],
    postBoardPage: 1,
    postBoardList: [],
    replyBoardPage: 1,
    replyBoardList: [],
    board: [],
    reply: [],
    likeId: 0,
};

const handleBoard = (state: stateType = initialState, action: any) => {
    switch (action.type) {
        case BOARD_LIST_REQUEST:
            return {
                ...state,
                boardPage: action.payload.boardPage,
                boardList: action.payload.boardList,
            };
        case LIKE_BOARD_LIST_REQUEST:
            return {
                ...state,
                likeBoardPage: action.payload.likeBoardPage,
                likeBoardList: action.payload.likeBoardList,
            };
        case POST_BOARD_LIST_REQUEST:
            return {
                ...state,
                postBoardPage: action.payload.postBoardPage,
                postBoardList: action.payload.postBoardList,
            };
        case REPLY_BOARD_LIST_REQUEST:
            return {
                ...state,
                replyBoardPage: action.payload.replyBoardPage,
                replyBoardList: action.payload.replyBoardList,
            };
        case BOARD_LIKE_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    like: true,
                },
            };

        case BOARD_LIKE_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    like: false,
                },
            };

        case BOARD_LIKE_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    like: false,
                },
            };

        case BOARD_SAVE_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    save: true,
                },
            };

        case BOARD_SAVE_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    save: false,
                },
            };

        case BOARD_SAVE_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    save: false,
                },
            };

        case BOARD_EDIT_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    edit: true,
                },
            };

        case BOARD_EDIT_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    edit: false,
                },
            };

        case BOARD_EDIT_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    edit: false,
                },
            };

        case BOARD_DELETE_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    delete: true,
                },
            };

        case BOARD_DELETE_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    delete: false,
                },
            };

        case BOARD_DELETE_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    delete: false,
                },
            };

        case REPLY_LIKE_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    delete: true,
                },
            };

        case REPLY_LIKE_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    delete: false,
                },
            };

        case REPLY_LIKE_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    delete: false,
                },
            };
        case REPLY_SAVE_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    delete: true,
                },
            };

        case REPLY_SAVE_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    delete: false,
                },
            };

        case REPLY_SAVE_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    delete: false,
                },
            };
        case REPLY_DELETE_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    delete: true,
                },
            };

        case REPLY_DELETE_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    delete: false,
                },
            };

        case REPLY_DELETE_FAILURE:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    delete: false,
                },
            };
        default:
            return state;
    }
};

export default handleBoard;
