import root from 'window-or-global';
const SEARCH_BOARD_LIST_REQUEST = 'search/SEARCH_BOARD_LIST_REQUEST' as const;
const SEARCH_KEYWORD = 'search/SEARCH_KEYWORD' as const;

export const searchBoardListRequest = (list: any, page: number) => ({
    type: SEARCH_BOARD_LIST_REQUEST,
    payload: {
        list: list,
        page: page,
    },
});

export const searchKeyword = (keyword: string) => ({
    type: SEARCH_KEYWORD,
    payload: {
        keyword: keyword,
    },
});

interface stateType {
    boardList: any;
    boardPage: number;
    keyword: string;
}

const initialState: stateType = {
    boardPage: 1,
    boardList: [],
    keyword: root?.location?.search.includes('=')
        ? decodeURI(root?.location?.search.split('=')[1])
        : '',
};

type searchType = ReturnType<typeof SEARCH_BOARD_LIST_REQUEST>;

const handleSearch = (state: stateType = initialState, action: searchType) => {
    switch (action.type) {
        case SEARCH_BOARD_LIST_REQUEST:
            return {
                ...state,
                boardList: action.payload.list,
                boardPage: action.payload.page,
            };
        case SEARCH_KEYWORD:
            return {
                ...state,
                keyword: action.payload.keyword,
            };
        default:
            return state;
    }
};

export default handleSearch;
