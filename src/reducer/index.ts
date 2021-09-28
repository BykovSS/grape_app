import {actionTypes} from '../constants/actionTypes';
import {ActionType, dataType} from '../types';
import {addLeftRow, addRightRow} from '../utils';

const initialState = {
    data: [] as dataType[],
    isFetching: false,
    zoom: 1,
    isNeedClickRight: false,
    isNeedClickLeft: false,
    error: null as string
};

export const dataReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case actionTypes.FETCH_DATA_REQUEST:
            return Object.assign({}, state, {isFetching: true});
        case actionTypes.FETCH_DATA_SUCCESS:
            return Object.assign({}, state, {isFetching: false, data: action.data});
        case actionTypes.FETCH_DATA_FAILURE:
            return Object.assign({}, state, {isFetching: false, error: action.error});
        case actionTypes.CHANGE_ZOOM:
            return Object.assign({}, state, {zoom: action.zoom});
        case actionTypes.ADD_RIGHT_ROW:
            return Object.assign({}, state, {data: addRightRow(state.data), isNeedClickRight: true});
        case actionTypes.ADD_LEFT_ROW:
            return Object.assign({}, state, {data: addLeftRow(state.data), isNeedClickLeft: true});
        case actionTypes.DISABLE_NEED_CLICKS:
            return Object.assign({}, state, {isNeedClickRight: false, isNeedClickLeft: false});

        default:
            return state;
    }
};