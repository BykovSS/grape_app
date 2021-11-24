import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as api from '../../api';
import {convertDataToSave} from '../../utils';
import '../../assets/less/buttons.less';

const SaveButton:React.FC = () => {
    const {data: allData, currentFieldValue} = useSelector((state: any) => state);
    const data = React.useMemo(() => {
        return allData && currentFieldValue ? allData[currentFieldValue] : [];
    }, [allData, currentFieldValue]);
    const dispatch = useDispatch();

    const handleSave = React.useCallback(() => {
        dispatch(api.saveDataToBase(JSON.stringify(convertDataToSave(data)), '/data/' + currentFieldValue));
    }, [dispatch, data, currentFieldValue]);

    return <button
        className={'save_button'}
        onClick={handleSave}
    >{'Сохранить'}</button>;
};

export default SaveButton;