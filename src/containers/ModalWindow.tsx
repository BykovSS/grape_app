import * as React from 'react';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import * as actions from '../actions';
import {ModalWindow as ModalWindowComponent} from '../components/ModalWindow';

const ModalWindow:React.FC = () => {
    const {isWarningVisible} = useSelector((state: any) => state, shallowEqual);

    const dispatch = useDispatch();

    const handleCloseModalWindow = React.useCallback(() => {
        dispatch(actions.changeWarningVisible(false));
    }, [dispatch]);

    const handleConfirm = React.useCallback(() => {
        dispatch(actions.addLeftRow());
        handleCloseModalWindow();
    }, [dispatch, handleCloseModalWindow]);

    return <ModalWindowComponent
        visible={isWarningVisible}
        title={'Подтвердите добавление рядов слева'}
        description={<span>
                <span>{'Добавление рядов слева повлечет за собой изменение нумерации.'}</span>
                <span>{'Вы действительно хотите добавить ряд?'}</span></span>}
        handleCloseModalWindow={handleCloseModalWindow}
        handleConfirm={handleConfirm}
    />;
};

export default ModalWindow;