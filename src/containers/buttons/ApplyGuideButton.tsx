import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as api from '../../api';
import '../../assets/less/buttons.less';

const ApplyGuideButton:React.FC = () => {
    const {guide} = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const handleSave = React.useCallback(() => {
        dispatch(api.saveDataToBase(JSON.stringify(guide), 'guide'));
    }, [dispatch, guide]);

    return <button
        className={'apply_button'}
        onClick={handleSave}
    >{'Применить'}</button>;
};

export default ApplyGuideButton;