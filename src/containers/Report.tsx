import * as React from 'react';
import {Report as ReportComponent} from '../components/Report';
import {useDispatch, useSelector} from 'react-redux';
import {getInitialTableData, getTableData} from '../utils';
import {EntityType} from '../types';
import * as api from '../api';
import * as actions from '../actions';

const Report:React.FC = () => {
    const [isGeneral, changeGeneral] = React.useState<boolean>(false);
    const {currentFieldValue, isAuthorized, guide, dataInfo, data} = useSelector((state: any) => state);
    const dataInfoLength = dataInfo ? dataInfo.length : 0;

    const dispatch = useDispatch();

    React.useEffect(() => {
        if (isAuthorized && isGeneral) {
            dataInfo.forEach((e: EntityType) => {
                const value = e.value;
                if (value && !data[value]) {
                    dispatch(api.loadDataFromBase('/data/' + value, actions.loadDataSuccess, value));
                }
            });
        }
    }, [isAuthorized, isGeneral, dataInfo, data, data.length, dispatch]);

    const handleChangeGeneral = React.useCallback(() => {
        changeGeneral(!isGeneral);
    }, [isGeneral]);

    const initialTableData = getInitialTableData(guide);

    const tableData = getTableData(isGeneral, data, guide, dataInfoLength, currentFieldValue);

    return <ReportComponent
        tableData={tableData || initialTableData}
        isGeneral={isGeneral}
        fieldCount={dataInfoLength}
        handleChangeGeneral={handleChangeGeneral}
    />;
};

export default Report;