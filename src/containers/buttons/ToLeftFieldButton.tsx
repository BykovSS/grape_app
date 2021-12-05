import * as React from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import * as actions from '../../actions';
import {ToField} from '../../components/icons/ToField';
import '../../assets/less/buttons.less';
import {getCurrentIndex} from '../../utils';

const ToLeftFieldButton:React.FC = () => {
    const {dataInfo, currentFieldValue} = useSelector((state: any) => state, shallowEqual);
    const currentIndex = getCurrentIndex(dataInfo, currentFieldValue);
    const dispatch = useDispatch();

    const handleToField = React.useCallback(() => {
        dispatch(actions.toField(currentIndex - 1));
    }, [dispatch, currentIndex]);

    return <button
        className={'to-field_button to-field_button__left'}
        title={'К предыдущему участку'}
        disabled={currentIndex === 0}
        onClick={handleToField}
    ><ToField needRotate/></button>;
};

export default ToLeftFieldButton;