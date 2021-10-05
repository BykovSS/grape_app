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

    // const handleConfirm = React.useCallback(() => {
    //
    //     handleCloseModalWindow();
    // }, [handleCloseModalWindow]);

    return <ModalWindowComponent
        visible={isWarningVisible}
        title={'Результат сохранения'}
        description={<span>
                <span>{'Сохранение данных прошло успешно!'}</span></span>}
        handleCloseModalWindow={handleCloseModalWindow}
        // handleConfirm={handleConfirm}
    />;
};

export default ModalWindow;