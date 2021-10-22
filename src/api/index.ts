import * as actions from '../actions';
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth';
import {getDatabase, ref, set, child, get} from 'firebase/database';
import {getErrorMessageByCode, throwError} from '../utils';

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

export const loadDataFromBase = () => async (dispatch: Function) => {
    dispatch(actions.onRequestFetchData());
    const dbRef = ref(getDatabase());
    try {
        const response = await get(child(dbRef, '/'));
        if (response.exists()) {
            dispatch(actions.loadDataSuccess(response.val()));
        } else {
            throwError('Ошибка чтения базы данных!');
        }
    } catch (error) {
        console.log(error);
        dispatch(actions.loadDataError({
            showModalWindow: true,
            title: 'Ошибка загрузки данных!',
            description: String(error)
        }));
    }
};

export const saveDataToBase = (data: string, dataName: string) => async (dispatch: Function) => {
    dispatch(actions.onRequestSaveData());
    const db = getDatabase();
    try {
        await set(ref(db, dataName), data);
        dispatch(actions.saveDataComplete());
    } catch (error) {
        dispatch(actions.saveDataComplete({
            showModalWindow: true,
            title: 'Ошибка сохранения данных!',
            description: String(error)
        }));
    }
};