import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import * as actions from '../actions';
import * as api from '../api';
import {LoginPage as LoginPageComponent} from '../components/LoginPage';

const LoginPage: React.FC = () => {

    const {isAuthorized, login, password} = useSelector((state: any) => state);

    const dispatch = useDispatch();
    const history = useHistory();

    React.useEffect(() => {
        if (isAuthorized) {
            history.push('/');
        }
    }, [isAuthorized, history]);

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

    return <LoginPageComponent
        handleChangeLogin={handleChangeLogin}
        handleChangePassword={handleChangePassword}
        handleKeyPress={handleKeyPress}
    />;
};

export default LoginPage;