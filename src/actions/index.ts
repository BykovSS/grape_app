import {actionTypes} from '../constants/actionTypes';
import {dataType, ErrorWindowDataType, EntityType} from '../types';

export const changeMobil = () => ({
    type: actionTypes.CHANGE_MOBIL
});

export const changeShiftKey = (isShiftKey: boolean) => ({
    type: actionTypes.CHANGE_SHIFT_KEY,
    isShiftKey
});

export const onRequestFetchData = () => ({
    type: actionTypes.FETCH_DATA_REQUEST
});

export const loadDataSuccess = (fetchedData: string, fieldValue: string, isGeneral?: boolean) => ({
    type: actionTypes.FETCH_DATA_SUCCESS,
    fetchedData, fieldValue, isGeneral
});

export const loadDataInfoSuccess = (fetchedDataInfo: EntityType[]) => ({
    type: actionTypes.FETCH_DATA_INFO_SUCCESS,
    fetchedDataInfo
});

export const loadGuideSuccess = (guide: EntityType[]) => ({
    type: actionTypes.FETCH_GUIDE_SUCCESS,
    guide
});

export const loadDataError = (errorWindowData: ErrorWindowDataType) => ({
    type: actionTypes.FETCH_DATA_FAILURE,
    errorWindowData
});

export const onRequestSaveData = () => ({
    type: actionTypes.SAVE_DATA_REQUEST
});

export const saveDataComplete = (errorWindowData?: ErrorWindowDataType) => ({
    type: actionTypes.SAVE_DATA_COMPLETE,
    errorWindowData
});

export const showErrorWindow = (errorWindowData: ErrorWindowDataType) => ({
    type: actionTypes.SHOW_ERROR_WINDOW,
    errorWindowData
});

export const onRequestAddData = () => ({
    type: actionTypes.ADD_DATA_REQUEST
});

export const addDataComplete = (errorWindowData?: ErrorWindowDataType) => ({
    type: actionTypes.ADD_DATA_COMPLETE,
    errorWindowData
});

export const onRequestRemoveData = () => ({
    type: actionTypes.REMOVE_DATA_REQUEST
});

export const removeDataComplete = (errorWindowData?: ErrorWindowDataType) => ({
    type: actionTypes.REMOVE_DATA_COMPLETE,
    errorWindowData
});

export const changeData = (data: dataType[]) => ({
    type: actionTypes.CHANGE_DATA,
    data
});

export const closeErrorWindow = () => ({
    type: actionTypes.CLOSE_ERROR_WINDOW
});

export const changeWindowSizes = (windowSizes: {windowWidth: number, windowHeight: number}) => ({
    type: actionTypes.CHANGE_WINDOW_SIZES,
    windowSizes
});

export const changeCurrentPosition = (currentPosition: {currentAbscissa: number, currentOrdinate: number}) => ({
    type: actionTypes.CHANGE_CURRENT_POSITION,
    currentPosition
});

export const changeMousePosition = (mouseInMap: boolean) => ({
    type: actionTypes.CHANGE_MOUSE_POSITION,
    mouseInMap
});

export const changeZoom = (zoom: number) => ({
    type: actionTypes.CHANGE_ZOOM,
    zoom
});

export const addRightRow = () => ({
    type: actionTypes.ADD_RIGHT_ROW
});

export const addLeftRow = () => ({
    type: actionTypes.ADD_LEFT_ROW
});

export const disableNeedClicks = () => ({
    type: actionTypes.DISABLE_NEED_CLICKS,
});

export const changeSelectedCells = (selectedCells: string[]) => ({
    type: actionTypes.CHANGE_SELECTED_CELLS,
    selectedCells
});

export const changeGuideLabel = (id: string, label: string) => ({
    type: actionTypes.CHANGE_GUIDE_LABEL,
    id, label
});

export const addNewGuide = (guide: EntityType) => ({
    type: actionTypes.ADD_NEW_GUIDE,
    guide
});

export const removeGuide = (id: string) => ({
    type: actionTypes.REMOVE_GUIDE,
    id
});

export const onChangeCurrentYear = (year: number) => ({
    type: actionTypes.CHANGE_CURRENT_YEAR,
    year
});

export const onChangeCurrentSort = (sort: string) => ({
    type: actionTypes.CHANGE_CURRENT_SORT,
    sort
});

export const onChangeAuthStatus = (status: boolean) => ({
    type: actionTypes.CHANGE_AUTH_STATUS,
    status
});

export const onChangeLogin = (login: string) => ({
    type: actionTypes.CHANGE_LOGIN,
    login
});

export const onChangePassword = (password: string) => ({
    type: actionTypes.CHANGE_PASSWORD,
    password
});

export const changeFieldLabel = (value: string, label: string) => ({
    type: actionTypes.CHANGE_FIELD_LABEL,
    value, label
});

export const addNewField = (info: {id: string, label: string, value: string}) => ({
    type: actionTypes.ADD_NEW_FIELD,
    info
});

export const removeField = (index: number, value: string) => ({
    type: actionTypes.REMOVE_FIELD,
    index, value
});

export const showCorfirmWindow = (confirmWindowData?: ErrorWindowDataType) => ({
    type: actionTypes.SHOW_CONFIRM_WINDOW,
    confirmWindowData
});

export const toField = (newCurrentIndex: number) => ({
    type: actionTypes.TO_FIELD,
    newCurrentIndex
});