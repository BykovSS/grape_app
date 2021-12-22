import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../actions';
import '../../assets/less/buttons.less';

const DeselectButton:React.FC = () => {
    const {selectedCells} = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const handleDeselect = React.useCallback(() => {
        dispatch(actions.changeSelectedCells([]));
    }, [dispatch]);

    return <button
        className={'deselect_button'}
        disabled={!selectedCells || selectedCells && selectedCells.length === 0}
        onClick={handleDeselect}
    >Снять выделение</button>;
};

export default DeselectButton;