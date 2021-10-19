import * as React from 'react';
import {useSelector} from 'react-redux';
import EnterButton from '../containers/buttons/EnterButton';
import ModalWindow from '../containers/ModalWindow';
import '../assets/less/login.less';

type Props = {
    handleChangeLogin: (event: any) => void
    handleChangePassword: (event: any) => void
    handleKeyPress: (event: any) => void
}

export const LoginPage: React.FC<Props> = (props) => {

    const {handleChangeLogin, handleChangePassword, handleKeyPress} = props;
    const {login, password} = useSelector((state: any) => state);

    return <div className={'login-page'}>
        <div className={'login-page-form'}>
            <div className={'login-page-greet'}>
                <div className={'login-page-img'}/>
                <div className={'login-page-greet_header'}>{'Добро пожаловать!'}</div>
            </div>
            <div className={'login-page-input-wrap login-page-login'}>
                <div className={'login-page-label'}>{'Логин:'}</div>
                <input
                    type='text'
                    className={'login-page-input'}
                    value={login}
                    onChange={handleChangeLogin}
                    onKeyPress={handleKeyPress}
                />
            </div>
            <div className={'login-page-input-wrap login-page-password'}>
                <div className={'login-page-label'}>{'Пароль:'}</div>
                <input
                    type='password'
                    className={'login-page-input'}
                    value={password}
                    onChange={handleChangePassword}
                    onKeyPress={handleKeyPress}
                />
            </div>
            <div className={'login-page-button-wrap'}>
                <EnterButton/>
            </div>
        </div>
        <ModalWindow />
    </div>;
};