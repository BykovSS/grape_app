import * as fetch from 'isomorphic-fetch';
import {actionTypes} from '../constants/actionTypes';
import {GuideType} from '../types';
import {createErrorMessage, throwError} from '../utils';

export const onRequestFetchData = () => ({
    type: actionTypes.FETCH_DATA_REQUEST
});

export const loadDataSuccess = (fetchedData: {data: string[], guide: GuideType[]}) => ({
    type: actionTypes.FETCH_DATA_SUCCESS,
    fetchedData
});

export const loadDataError = (fetchError: string) => ({
    type: actionTypes.FETCH_DATA_FAILURE,
    fetchError
});

export const onRequestSaveData = () => ({
    type: actionTypes.SAVE_DATA_REQUEST
});

export const saveDataSuccess = () => ({
    type: actionTypes.SAVE_DATA_SUCCESS
});

export const saveDataError = (saveError: string) => ({
    type: actionTypes.SAVE_DATA_FAILURE,
    saveError
});

export const cleanErrors = () => ({
    type: actionTypes.CLEAN_ERRORS
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

export const fetchData = (url = 'data/data.json') => async (dispatch: Function) => {
    dispatch(onRequestFetchData());

    try {
        const response = await fetch(`${url}`);
        if (response && !response.ok) {
            throwError(createErrorMessage(response));
        }
        const fetchedData = await response.json();
        dispatch(loadDataSuccess(fetchedData));
    } catch (fetchError) {
        dispatch(loadDataError(String(fetchError)));
    }
};

export const saveData = (data: string, url = 'data/data.json') => async (dispatch: Function) => {
    dispatch(onRequestSaveData());

    try {
        const response = await fetch(`${url}`, {
            method: 'post',
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            },
            body: data
        });
        if (response && !response.ok) {
            throwError(createErrorMessage(response));
        }
        dispatch(saveDataSuccess());
    } catch (saveError) {
        dispatch(saveDataError(String(saveError)));
    }
};