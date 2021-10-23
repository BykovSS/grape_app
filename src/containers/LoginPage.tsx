import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../actions';
import * as api from '../api';
import {LoginPage as LoginPageComponent} from '../components/LoginPage';

type Props = {
    showLoginPageContent: boolean
}

const LoginPage: React.FC<Props> = (props) => {

    const {showLoginPageContent} = props;
    const {login, password} = useSelector((state: any) => state);

    const dispatch = useDispatch();

    const handleChangeLogin = React.useCallback((event: any) => {
        dispatch(actions.onChangeLogin(event.target.value));
    }, [dispatch]);

    const handleChangePassword = React.useCallback((event: any) => {
        dispatch(actions.onChangePassword(event.target.value));
    }, [dispatch]);

    const handleKeyPress = React.useCallback((event: any) => {
        if (event.key === 'Enter') {
            dispatch(api.onUserAuthorized(login, password));
        }
    }, [dispatch, login, password]);

    return showLoginPageContent && <LoginPageComponent
        handleChangeLogin={handleChangeLogin}
        handleChangePassword={handleChangePassword}
        handleKeyPress={handleKeyPress}
    />;
};

export default LoginPage;