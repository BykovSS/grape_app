import {actionTypes} from '../constants/actionTypes';
import {ActionType, dataType, GuideType, ErrorWindowDataType} from '../types';
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
    currentCell: null as dataType,
    fetchError: null as string,
    saveError: null as string,
    errorWindowData: null as ErrorWindowDataType,
    guide: [] as GuideType[],
    isAuthorized: null as boolean,
    login: '',
    password: ''
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
        case actionTypes.SHOW_ERROR_WINDOW:
            return Object.assign({}, state, {errorWindowData: action.errorWindowData});
        case actionTypes.CHANGE_DATA:
            return Object.assign({}, state, {data: action.data, selectedCells: [], currentCell: null});
        case actionTypes.CLOSE_ERROR_WINDOW:
            return Object.assign({}, state, {errorWindowData: null});
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
            return Object.assign({}, state, {
                selectedCells: action.selectedCells,
                currentCell: action.selectedCells.length > 0 ? state.data.find(elem => elem.id === action.selectedCells[action.selectedCells.length - 1]) : null});
        case actionTypes.CHANGE_GUIDE_LABEL:
            return Object.assign({}, state, {guide: state.guide.map(elem => elem.id === action.id ? {...elem, label: action.label} : elem)});
        case actionTypes.ADD_NEW_GUIDE: {
            const newGuide = state.guide;
            let count = 0;
            newGuide.forEach((elem, i) => {if (elem.id.indexOf('star_') !== -1) count = i;});
            newGuide.splice(count+1, 0, action.guide);

            return Object.assign({}, state, {guide: newGuide});
        }
        case actionTypes.CHANGE_CURRENT_YEAR:
            return Object.assign({}, state, {currentCell: state.currentCell ? {...state.currentCell, year: action.year} : {year: action.year}});
        case actionTypes.CHANGE_CURRENT_SORT:
            return Object.assign({}, state, {currentCell: state.currentCell ? {...state.currentCell, sort: action.sort} : {sort: action.sort}});
        case actionTypes.REMOVE_GUIDE :
            return Object.assign({}, state, {guide: state.guide.filter(elem => elem.id !== action.id)});
        case actionTypes.CHANGE_AUTH_STATUS:
            return Object.assign({}, state, {isAuthorized: action.status});
        case actionTypes.CHANGE_LOGIN:
            return Object.assign({}, state, {login: action.login});
        case actionTypes.CHANGE_PASSWORD:
            return Object.assign({}, state, {password: action.password});
        default:
            return state;
    }
};