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