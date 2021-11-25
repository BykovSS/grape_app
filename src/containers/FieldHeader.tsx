import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../actions';
import {FieldHeader as SortLineFieldHeader} from '../components/FieldHeader';
import * as api from '../api';

const FieldHeader: React.FC = () => {
    const [showText, changeShowText] = React.useState<boolean>(true);
    const {dataInfo, currentFieldValue, currentFieldLabel} = useSelector((state: any) => state);

    const dispatch = useDispatch();

    const handleChangeShowText = React.useCallback(() => {
        changeShowText(!showText);
    }, [showText]);

    const handleChangeFieldLabel = React.useCallback((event: any) => {
        dispatch(actions.changeFieldLabel(currentFieldValue, event.target.value));
    }, [dispatch, currentFieldValue]);

    const handleClickApply = React.useCallback(() => {
        dispatch(api.saveDataToBase(dataInfo, '/dataInfo', handleChangeShowText));
    }, [dispatch, dataInfo, handleChangeShowText]);

    return <SortLineFieldHeader
        title={currentFieldLabel}
        showText={showText}
        handleChangeShowText={handleChangeShowText}
        handleChangeFieldLabel={handleChangeFieldLabel}
        handleClickApply={handleClickApply}
    />;
};

export default FieldHeader;