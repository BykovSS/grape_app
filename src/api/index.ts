import * as actions from '../actions';
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth';
import {getDatabase, ref, set, child, get} from 'firebase/database';
import {getErrorMessageByCode, throwError} from '../utils';

export const checkUserAuthorization = (callback: Function) => (dispatch: Function) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            dispatch(actions.onChangeAuthStatus(true));
        } else {
            dispatch(actions.onChangeAuthStatus(false));
            if (callback) callback();
        }
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

export const loadDataFromBase = (path: string, successActionCreator: Function) => async (dispatch: Function) => {
    dispatch(actions.onRequestFetchData());
    const dbRef = ref(getDatabase());
    try {
        const response = await get(child(dbRef, path));
        if (response.exists()) {
            dispatch(successActionCreator(response.val()));
        } else {
            throwError('Ошибка чтения базы данных!');
        }
    } catch (error) {
        dispatch(actions.loadDataError({
            showModalWindow: true,
            title: 'Ошибка загрузки данных!',
            description: String(error)
        }));
    }
};

export const saveDataToBase = (data: any, dataName: string, successCallback?: Function) => async (dispatch: Function) => {
    dispatch(actions.onRequestSaveData());
    const db = getDatabase();
    try {
        await set(ref(db, dataName), data);
        dispatch(actions.saveDataComplete());
        if (successCallback) successCallback();
    } catch (error) {
        dispatch(actions.saveDataComplete({
            showModalWindow: true,
            title: 'Ошибка сохранения данных!',
            description: String(error)
        }));
    }
};