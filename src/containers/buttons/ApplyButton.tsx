import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../actions';
import {convertDataToSave} from '../../utils';
import '../../assets/less/buttons.less';

const ApplyButton:React.FC = () => {
    const {guide} = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const handleSave = React.useCallback(() => {
        dispatch(actions.saveData(JSON.stringify(convertDataToSave(guide))));
    }, [dispatch, guide]);

    return <button
        className={'apply_button'}
        onClick={handleSave}
    >{'Применить'}</button>;
};

export default ApplyButton;