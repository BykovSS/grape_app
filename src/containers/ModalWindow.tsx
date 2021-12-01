import * as React from 'react';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import * as actions from '../actions';
import {ModalWindow as ModalWindowComponent} from '../components/ModalWindow';

const ModalWindow:React.FC = () => {
    const {errorWindowData} = useSelector((state: any) => state, shallowEqual);
    const {showModalWindow, title, description, handleClickConfirm} = errorWindowData || {};

    const dispatch = useDispatch();

    const handleCloseModalWindow = React.useCallback(() => {
        dispatch(actions.closeErrorWindow());
    }, [dispatch]);

    return <ModalWindowComponent
        visible={showModalWindow}
        title={title}
        description={description}
        needConfirm={Boolean(handleClickConfirm)}
        handleClickConfirm={handleClickConfirm ? handleClickConfirm(handleCloseModalWindow) : null}
        handleCloseModalWindow={handleCloseModalWindow}
    />;
};

export default ModalWindow;