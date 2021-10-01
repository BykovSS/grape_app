// import * as fetch from 'isomorphic-fetch';
import {actionTypes} from '../constants/actionTypes';
import {dataType} from '../types';
import {generateData} from '../utils';

export const onRequestFetchData = () => ({
    type: actionTypes.FETCH_DATA_REQUEST
});

export const loadDataSuccess = (data: dataType[]) => ({
    type: actionTypes.FETCH_DATA_SUCCESS,
    data
});

export const loadDataError = (error: string) => ({
    type: actionTypes.FETCH_DATA_FAILURE,
    error
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

export const changeWarningVisible = (isWarningVisible: boolean) => ({
    type: actionTypes.CHANGE_WARNING_VISIBLE,
    isWarningVisible
});

export const changeSelectedCells = (selectedCells: string[]) => ({
    type: actionTypes.CHANGE_SELECTED_CELLS,
    selectedCells
});

export const fetchData = (/*url = 'data.json'*/) => async (dispatch: Function) => {
    dispatch(onRequestFetchData());

    try {
        // const response = await fetch(`${url}`);
        // const data = await response.json();
        const data = await generateData(80, 50);
        dispatch(loadDataSuccess(data));
    } catch (error) {
        dispatch(loadDataError(error));
    }
};