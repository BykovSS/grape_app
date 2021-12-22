import {actionTypes} from '../constants/actionTypes';
import {ActionType, dataType, EntityType, ErrorWindowDataType, LogType} from '../types';
import {
    addLeftRow,
    addRightRow,
    getMostRight,
    getMostTop,
    getNumCol,
    getNumRow,
    parseDataFromFetch
} from '../utils';
import {FIELD_LIST_LENGTH, LOGS_LENGTH} from '../constants';

const initialState = {
    isMobil: false,
    shiftKey: false,
    dataInfo: [] as EntityType[],
    currentFieldLabel: null as string,
    currentFieldValue: null as string,
    data: {} as {[key:string]: dataType[]},
    numCol: 0,
    numRow: 0,
    mostRight: 0,
    mostTop: 0,
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
    isSilent: false,
    isAdding: false,
    isRemoving: false,
    mouseInMap: false,
    zoom: 1,
    isNeedClickRight: false,
    isNeedClickLeft: false,
    selectedCells: [] as string[],
    currentCell: null as dataType,
    errorWindowData: null as ErrorWindowDataType,
    guide: [] as EntityType[],
    isAuthorized: null as boolean,
    login: '',
    password: '',
    logOrder: 0,
    logs: [] as LogType[],
    logFieldList: [] as string[]
};

export const dataReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case actionTypes.CHANGE_MOBIL:
            return {...state, isMobil: true};
        case actionTypes.CHANGE_SHIFT_KEY:
            return {...state, shiftKey: action.isShiftKey};
        case actionTypes.FETCH_DATA_REQUEST:
            return {...state, isFetching: true};
        case actionTypes.FETCH_DATA_SUCCESS: {
            const {fetchedData, fieldValue, isGeneral} = action;
            const parsedData = parseDataFromFetch(JSON.parse(fetchedData));

            return {...state,
                isFetching: false,
                data: isGeneral || state.dataInfo && state.dataInfo.length <= FIELD_LIST_LENGTH
                    ? {...state.data, [fieldValue]: parsedData}
                    : {[fieldValue]: parsedData},
                numCol: getNumCol(parsedData),
                numRow: getNumRow(parsedData),
                mostRight: getMostRight(parsedData),
                mostTop: getMostTop(parsedData)
            };
        }
        case actionTypes.FETCH_DATA_INFO_SUCCESS: {
            const {fetchedDataInfo} = action;
            const firstField = fetchedDataInfo && fetchedDataInfo.length > 0 ? fetchedDataInfo[0] : {} as EntityType;
            const {label=null, value=null} = firstField;

            return {...state,
                isFetching: false,
                dataInfo: fetchedDataInfo ? fetchedDataInfo.filter(e => e) : [],
                currentFieldLabel: label,
                currentFieldValue: value
            };
        }
        case actionTypes.FETCH_GUIDE_SUCCESS:
            return {...state, isFetching: false, guide: action.guide};
        case actionTypes.FETCH_DATA_FAILURE:
            return {...state, isFetching: false, errorWindowData: action.errorWindowData};
        case actionTypes.SAVE_DATA_REQUEST:
            return {...state, isSaving: true, isSilent: Boolean(action.isSilent)};
        case actionTypes.SAVE_DATA_COMPLETE:
            return {...state, isSaving: false, isSilent: false, errorWindowData: action.errorWindowData};
        case actionTypes.ADD_DATA_REQUEST:
            return {...state, isAdding: true};
        case actionTypes.ADD_DATA_COMPLETE:
            return {...state, isAdding: false, errorWindowData: action.errorWindowData};
        case actionTypes.SHOW_ERROR_WINDOW:
            return {...state, errorWindowData: action.errorWindowData};
        case actionTypes.CHANGE_DATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    [state.currentFieldValue]: action.data
                },
                selectedCells: [],
                currentCell: null,
                mostRight: getMostRight(action.data),
                mostTop: getMostTop(action.data)
            };
        case actionTypes.CLOSE_ERROR_WINDOW:
            return {...state, errorWindowData: null};
        case actionTypes.SHOW_CONFIRM_WINDOW:
            return {...state, errorWindowData: action.confirmWindowData};
        case actionTypes.CHANGE_WINDOW_SIZES:
            return {...state, windowSizes: action.windowSizes};
        case actionTypes.CHANGE_CURRENT_POSITION:
            return {...state, currentPosition: action.currentPosition};
        case actionTypes.CHANGE_MOUSE_POSITION:
            return {...state, mouseInMap: action.mouseInMap};
        case actionTypes.CHANGE_ZOOM:
            return {...state, zoom: action.zoom};
        case actionTypes.ADD_RIGHT_ROW:
            return {...state, data: {...state.data, [state.currentFieldValue]: addRightRow(state.data[state.currentFieldValue])}, isNeedClickRight: true, numCol: state.numCol + 1};
        case actionTypes.ADD_LEFT_ROW:
            return {...state, data: {...state.data, [state.currentFieldValue]: addLeftRow(state.data[state.currentFieldValue])}, isNeedClickLeft: true, numCol: state.numCol + 1, mostRight: state.mostRight + 1};
        case actionTypes.DISABLE_NEED_CLICKS:
            return {...state, isNeedClickRight: false, isNeedClickLeft: false};
        case actionTypes.CHANGE_SELECTED_CELLS:
            return {...state, selectedCells: action.selectedCells, currentCell: action.selectedCells.length > 0 ? state.data[state.currentFieldValue].find(elem => elem.id === action.selectedCells[action.selectedCells.length - 1]) : null};
        case actionTypes.CHANGE_GUIDE_LABEL:
            return {...state, guide: state.guide.map(elem => elem.id === action.id ? {...elem, label: action.label} : elem)};
        case actionTypes.ADD_NEW_GUIDE: {
            const newGuide = state.guide;
            let count = 0;
            newGuide.forEach((elem, i) => {if (elem.id.indexOf('star_') !== -1) count = i;});
            newGuide.splice(count+1, 0, action.guide);

            return {...state, guide: newGuide};
        }
        case actionTypes.CHANGE_CURRENT_YEAR:
            return {...state, currentCell: state.currentCell ? {...state.currentCell, year: action.year} : {year: action.year}};
        case actionTypes.CHANGE_CURRENT_SORT:
            return {...state, currentCell: state.currentCell ? {...state.currentCell, sort: action.sort} : {sort: action.sort}};
        case actionTypes.REMOVE_GUIDE :
            return {...state, guide: state.guide.filter(elem => elem.id !== action.id)};
        case actionTypes.CHANGE_AUTH_STATUS:
            return {...state, isAuthorized: action.status};
        case actionTypes.CHANGE_LOGIN:
            return {...state, login: action.login};
        case actionTypes.CHANGE_PASSWORD:
            return {...state, password: action.password};
        case actionTypes.CHANGE_FIELD_LABEL:
            return {...state, currentFieldLabel: action.label, dataInfo: state.dataInfo ? state.dataInfo.map(e => e.value === action.value ? {...e, label: action.label} : e) : []};
        case actionTypes.ADD_NEW_FIELD: {
            const {info = {}} = action;
            const {dataInfo} = state;

            return {
                ...state,
                dataInfo: dataInfo ? [...dataInfo, {...info}] : [],
                currentFieldLabel: (info as EntityType).label,
                currentFieldValue: (info as EntityType).value
            };
        }
        case actionTypes.REMOVE_FIELD: {
            const {index, value} = action;
            const {dataInfo, data} = state;
            const cloneData = Object.assign({}, {...data});
            delete cloneData[value];
            let currentIndex = index === 0 ? 1 : index - 1;
            while (!dataInfo[currentIndex]) {
                currentIndex = index === 0 ? currentIndex + 1 : currentIndex === 0 || currentIndex > index ? index + 1 : currentIndex - 1;
            }

            return {
                ...state,
                dataInfo: dataInfo ? dataInfo.filter(e => e.value !== value) : [],
                currentFieldLabel: dataInfo[currentIndex].label,
                currentFieldValue: dataInfo[currentIndex].value,
                data: cloneData
            };
        }
        case actionTypes.TO_FIELD: {
            const {newCurrentIndex} = action;
            const {dataInfo} = state;

            return {
                ...state,
                currentFieldLabel: dataInfo[newCurrentIndex].label,
                currentFieldValue: dataInfo[newCurrentIndex].value,
                currentPosition: {currentAbscissa: 0, currentOrdinate: 0},
                selectedCells: [],
                currentCell: null
            };
        }
        case actionTypes.ADD_LOG_EVENT: {
            const {logEvent, fieldValue} = action || {};
            const {logOrder, logs, logFieldList, data} = state || {};
            let newLogOrder = logOrder < LOGS_LENGTH ? logOrder + 1 : logOrder;
            const isLastOrder = Boolean(logs) && logs.length === LOGS_LENGTH && logOrder === LOGS_LENGTH;
            let newLogs: LogType[] = logs;
            const firstFieldId = logs && logs.length > 0 ? logs[0].fieldId : '';
            let newLogFieldList: string[] = logFieldList;
            const newData = Object.assign({}, {...data});

            if (isLastOrder) {
                newLogs = newLogs.splice(1, logOrder - 1);
                newLogFieldList = [...newLogs, logEvent].reduce((r, e) => r || e.fieldId === firstFieldId, false)
                    ? newLogFieldList.includes(fieldValue) ? newLogFieldList : [...newLogFieldList, fieldValue]
                    : newLogFieldList.filter((e: string) => e !== firstFieldId).includes(fieldValue)
                        ? newLogFieldList.filter((e: string) => e !== firstFieldId)
                        : [...newLogFieldList.filter((e: string) => e !== firstFieldId), fieldValue];
            } else {
                newLogs = newLogs.splice(0, logOrder);
                newLogFieldList = newLogFieldList.includes(fieldValue) ? newLogFieldList : [...newLogFieldList, fieldValue];
            }
            newLogs = [...newLogs, logEvent];

            if (newLogFieldList && newLogFieldList.length > 3) {
                let oldestLogsField = '';
                let isFind = false;
                newLogs.forEach((e, i) => {
                    if (!isFind) {
                        const {fieldId} = e;
                        isFind = !newLogs.map((item, j) => j > i ? item.fieldId : null).includes(fieldId);
                        oldestLogsField = isFind ? fieldId : oldestLogsField;
                    }
                });

                newLogFieldList = newLogFieldList.filter(e => e !== oldestLogsField);
                newLogs = newLogs.filter(e => e.fieldId !== oldestLogsField);
                newLogOrder = newLogs.length;
                delete newData[oldestLogsField];
            }

            return {
                ...state,
                logOrder: newLogOrder,
                logs: newLogs,
                logFieldList: newLogFieldList,
                data: newData
            };
        }
        default:
            return state;
    }
};