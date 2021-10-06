import {actionTypes} from '../constants/actionTypes';
import {ActionType, dataType, GuideType} from '../types';
import {addLeftRow, addRightRow, getNumCol, getNumRow, parseDataFromFetch} from '../utils';

const initialState = {
    data: [] as dataType[],
    numCol: 0,
    numRow: 0,
    windowSizes: {
        windowWidth: 0,
        windowHeight: 0,
    },
    currentPosition: {
        currentAbscissa: 0,
        currentOrdinate: 0
    },
    isFetching: false,
    isSaving: false,
    mouseInMap: false,
    zoom: 1,
    isNeedClickRight: false,
    isNeedClickLeft: false,
    selectedCells: [] as string[],
    fetchError: null as string,
    saveError: null as string,
    guide: [] as GuideType[]
};

export const dataReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case actionTypes.FETCH_DATA_REQUEST:
            return Object.assign({}, state, {isFetching: true});
        case actionTypes.FETCH_DATA_SUCCESS: {
            const {fetchedData} = action;
            const {data, guide} = fetchedData || {};
            const parsedData = parseDataFromFetch(data);

            return Object.assign({}, state, {
                isFetching: false,
                data: parsedData,
                numCol: getNumCol(parsedData),
                numRow: getNumRow(parsedData),
                guide
            });
        }
        case actionTypes.FETCH_DATA_FAILURE:
            return Object.assign({}, state, {isFetching: false, fetchError: action.fetchError});
        case actionTypes.SAVE_DATA_REQUEST:
            return Object.assign({}, state, {isSaving: true});
        case actionTypes.SAVE_DATA_SUCCESS:
            return Object.assign({}, state, {isSaving: false});
        case actionTypes.SAVE_DATA_FAILURE:
            return Object.assign({}, state, {isSaving: false, saveError: action.saveError});
        case actionTypes.CLEAN_ERRORS:
            return Object.assign({}, state, {fetchError: null, saveError: null});
        case actionTypes.CHANGE_WINDOW_SIZES:
            return Object.assign({}, state, {windowSizes: action.windowSizes});
        case actionTypes.CHANGE_CURRENT_POSITION:
            return Object.assign({}, state, {currentPosition: action.currentPosition});
        case actionTypes.CHANGE_MOUSE_POSITION:
            return Object.assign({}, state, {mouseInMap: action.mouseInMap});
        case actionTypes.CHANGE_ZOOM:
            return Object.assign({}, state, {zoom: action.zoom});
        case actionTypes.ADD_RIGHT_ROW:
            return Object.assign({}, state, {data: addRightRow(state.data), isNeedClickRight: true, numCol: state.numCol + 1});
        case actionTypes.ADD_LEFT_ROW:
            return Object.assign({}, state, {data: addLeftRow(state.data), isNeedClickLeft: true, numCol: state.numCol + 1});
        case actionTypes.DISABLE_NEED_CLICKS:
            return Object.assign({}, state, {isNeedClickRight: false, isNeedClickLeft: false});
        case actionTypes.CHANGE_SELECTED_CELLS:
            return Object.assign({}, state, {selectedCells: action.selectedCells});
        default:
            return state;
    }
};