import * as React from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as actions from '../../actions';
import {ToField} from '../../components/icons/ToField';
import '../../assets/less/buttons.less';
import {getCurrentIndex} from '../../utils';

const ToRightFieldButton:React.FC = () => {
    const {dataInfo, currentFieldValue} = useSelector((state: any) => state, shallowEqual);
    const currentIndex = getCurrentIndex(dataInfo, currentFieldValue);
    const dispatch = useDispatch();

    const handleToField = React.useCallback(() => {
        dispatch(actions.toField(currentIndex + 1));
    }, [dispatch, currentIndex]);

    return <button
        className={'to-field_button to-field_button__right'}
        title={'К следующему участку'}
        disabled={currentIndex === dataInfo.length - 1}
        onClick={handleToField}
    ><ToField/></button>;
};

export default ToRightFieldButton;