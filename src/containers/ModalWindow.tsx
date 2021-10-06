import * as React from 'react';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import * as actions from '../actions';
import {ModalWindow as ModalWindowComponent} from '../components/ModalWindow';

const ModalWindow:React.FC = () => {
    const {fetchError, saveError} = useSelector((state: any) => state, shallowEqual);
    const visible = Boolean(fetchError) || Boolean(saveError);
    const title = fetchError
        ? 'Ошибка загрузки данных!'
        : saveError
            ? 'Ошибка сохранения данных!'
            : '';
    const description = fetchError ? fetchError : saveError ? saveError : '';


    const dispatch = useDispatch();

    const handleCloseModalWindow = React.useCallback(() => {
        dispatch(actions.cleanErrors());
    }, [dispatch]);

    return <ModalWindowComponent
        visible={visible}
        title={title}
        description={description}
        handleCloseModalWindow={handleCloseModalWindow}
    />;
};

export default ModalWindow;