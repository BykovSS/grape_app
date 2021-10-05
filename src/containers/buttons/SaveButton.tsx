import * as React from 'react';
import {useDispatch} from 'react-redux';
import * as actions from '../../actions';
import '../../assets/less/buttons.less';

const SaveButton:React.FC = () => {
    const dispatch = useDispatch();

    const handleDeselect = React.useCallback(() => {
        dispatch(actions.changeWarningVisible(true));
    }, [dispatch]);

    return <button
        className={'save_button'}
        onClick={handleDeselect}
    >Сохранить</button>;
};

export default SaveButton;