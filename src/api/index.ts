import * as fetch from 'isomorphic-fetch';
import * as actions from '../actions';
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth';
import {createErrorMessage, getErrorMessageByCode, throwError} from '../utils';

export const checkUserAuthorization = (failedCallback: Function) => (dispatch: Function) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            dispatch(actions.onChangeAuthStatus(true));
        } else failedCallback();
    });
};

export const onUserAuthorized = (login: string, password: string) => async (dispatch: Function) => {
    const auth = getAuth();
    try {
        const userCredential = await signInWithEmailAndPassword(auth, login, password);
        const user = userCredential.user;
        if (user) dispatch(actions.onChangeAuthStatus(true));
    } catch (error) {
        dispatch(actions.showErrorWindow({
            showModalWindow: true,
            title: 'Ошибка авторизации',
            description: getErrorMessageByCode(error.code)
        }));
    }
};

export const fetchData = (url = 'data/data.json') => async (dispatch: Function) => {
    dispatch(actions.onRequestFetchData());

    try {
        const response = await fetch(`${url}`);
        if (response && !response.ok) {
            throwError(createErrorMessage(response));
        }
        const fetchedData = await response.json();
        dispatch(actions.loadDataSuccess(fetchedData));
    } catch (fetchError) {
        dispatch(actions.loadDataError(String(fetchError)));
    }
};

export const saveData = (data: string, url = 'data/data.json') => async (dispatch: Function) => {
    dispatch(actions.onRequestSaveData());

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
        dispatch(actions.saveDataSuccess());
    } catch (saveError) {
        dispatch(actions.saveDataError(String(saveError)));
    }
};