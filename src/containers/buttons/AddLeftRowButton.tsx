import * as React from 'react';
import {useDispatch} from 'react-redux';
import * as actions from '../../actions';
import {AddLeftColumn} from '../../components/icons/AddLeftColumn';
import '../../assets/less/buttons.less';

const AddLeftRowButton:React.FC = () => {
    const dispatch = useDispatch();

    const handleAddLeftRow = React.useCallback(() => {
        dispatch(actions.addLeftRow());
    }, [dispatch]);

    return <button
        className={'add_button add_button__left'}
        title={'Добавить ряд слева'}
        onClick={handleAddLeftRow}
    ><AddLeftColumn/></button>;
};

export default AddLeftRowButton;