import * as React from 'react';
import {useDispatch} from 'react-redux';
import * as actions from '../../actions';
import '../../assets/less/buttons.less';

const DeselectButton:React.FC = () => {
    const dispatch = useDispatch();

    const handleDeselect = React.useCallback(() => {
        dispatch(actions.changeSelectedCells([]));
    }, [dispatch]);

    return <button
        className={'deselect_button'}
        onClick={handleDeselect}
    >Снять выделение</button>;
};

export default DeselectButton;