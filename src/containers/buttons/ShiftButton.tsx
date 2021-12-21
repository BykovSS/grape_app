import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../actions';
import '../../assets/less/buttons.less';

const ShiftButton:React.FC = () => {

    const {isMobil} = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const handleTouchStart = React.useCallback(() => {
        dispatch(actions.changeShiftKey(true));
    }, [dispatch]);

    const handleTouchEnd = React.useCallback(() => {
        dispatch(actions.changeShiftKey(false));
    }, [dispatch]);

    return isMobil && <button
        className={'shift_button'}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
    >{'Shift'}</button>;
};

export default ShiftButton;