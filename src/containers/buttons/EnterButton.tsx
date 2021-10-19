import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as api from '../../api';
import '../../assets/less/buttons.less';

const EnterButton:React.FC = () => {
    const {login, password} = useSelector((state: any) => state);

    const dispatch = useDispatch();

    const handleEnter = React.useCallback(() => {
        dispatch(api.onUserAuthorized(login, password));
    }, [dispatch, login, password]);

    return <button
        className={'enter_button'}
        onClick={handleEnter}
    >Войти</button>;
};

export default EnterButton;