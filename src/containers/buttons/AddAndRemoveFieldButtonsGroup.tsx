import * as React from 'react';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import * as actions from '../../actions';
import {ButtonsGroup} from '../../components/buttons/ButtonsGroup';
import {AddField} from '../../components/icons/AddField';
import {RemoveField} from '../../components/icons/RemoveField';
import '../../assets/less/buttons.less';
import * as api from '../../api';
import {convertDataToSave, generateData} from '../../utils';
import {EntityType} from '../../types';

const AddAndRemoveButtonGroup:React.FC = () => {
    const {dataInfo=[], currentFieldValue} = useSelector((state: any) => state, shallowEqual);
    let index = 0;
    (dataInfo as EntityType[]).forEach((e, i) => {if (e.value === currentFieldValue) index = i;});

    const dispatch = useDispatch();

    const onSuccessAddNewData = React.useCallback((info: {id: string, label: string, value: string}) => {
        dispatch(actions.addNewField(info));
    }, [dispatch]);

    const onAddNewData = React.useCallback((info: {id: string, label: string, value: string}) => {
        const {value} = info || {};
        dispatch(api.addDataToBase(JSON.stringify(convertDataToSave(generateData(200, 300))), '/data/' + value, onSuccessAddNewData(info)));
    }, [dispatch, onSuccessAddNewData]);

    const handleClickAddFieldButton = React.useCallback(() => {
        const id = String(Date.now());
        const label = 'Заголовок участка id' + id;
        const value = 'data_' + id;
        dispatch(api.addDataToBase({id, label, value}, `/dataInfo/${dataInfo.length}`, onAddNewData({id, label, value})));
    }, [dispatch, dataInfo.length, onAddNewData]);

    const onSuccessRemoveData = React.useCallback(() => {
        dispatch(actions.removeField(index, currentFieldValue));
    }, [dispatch, index, currentFieldValue]);

    const onRemoveData = React.useCallback(() => {
        dispatch(api.removeDataFromBase('/data/' + currentFieldValue, onSuccessRemoveData));
    }, [dispatch, currentFieldValue, onSuccessRemoveData]);

    const handleClickRemoveFieldButton = React.useCallback(() => {
        dispatch(api.removeDataFromBase('/dataInfo/' + index, onRemoveData));
    }, [dispatch, index, onRemoveData]);

    return <ButtonsGroup
        className={'add-and-remove_buttons'}
        isButton_01={false}
        Button_02_ClassName={'add-and-remove_button add-field_button'}
        Button_02_Title={'Добавить участок'}
        Button_02_Disable={dataInfo && dataInfo.length >= 5}
        handleClickButton_02={handleClickAddFieldButton}
        Button_02_Label={<AddField/>}
        Button_03_ClassName={'add-and-remove_button remove-field_button'}
        Button_03_Title={'Удалить участок'}
        Button_03_Disable={dataInfo && dataInfo.length <= 1}
        handleClickButton_03={handleClickRemoveFieldButton}
        Button_03_Label={<RemoveField />}
        isButton_04={false}
    />;
};

export default AddAndRemoveButtonGroup;