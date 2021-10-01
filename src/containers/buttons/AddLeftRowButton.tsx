import * as React from 'react';
import {useDispatch} from 'react-redux';
import * as actions from '../../actions';
import '../../assets/less/buttons.less';

const AddLeftRowButton:React.FC = () => {
    const dispatch = useDispatch();

    const handleAddLeftRow = React.useCallback(() => {
        dispatch(actions.changeWarningVisible(true));
    }, [dispatch]);

    return <button
        className={'add_button add_button__left'}
        onClick={handleAddLeftRow}
    >Добавить ряд слева</button>;
};

export default AddLeftRowButton;