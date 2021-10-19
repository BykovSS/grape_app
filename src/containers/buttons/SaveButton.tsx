import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as api from '../../api';
import {convertDataToSave} from '../../utils';
import '../../assets/less/buttons.less';

const SaveButton:React.FC = () => {
    const {data} = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const handleSave = React.useCallback(() => {
        dispatch(api.saveData(JSON.stringify(convertDataToSave(data))));
    }, [dispatch, data]);

    return <button
        className={'save_button'}
        onClick={handleSave}
    >{'Сохранить'}</button>;
};

export default SaveButton;