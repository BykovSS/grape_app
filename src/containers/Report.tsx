import * as React from 'react';
import {Report as ReportComponent} from '../components/Report';
import {useSelector} from 'react-redux';
import {getInitialTableData, getAge} from '../utils';
import {dataType} from '../types';

const Report:React.FC = () => {
    const {currentFieldValue, guide} = useSelector((state: any) => state);
    const currentData = useSelector((state: any) => currentFieldValue ? state.data[currentFieldValue] : null);

    const tableData = getInitialTableData(guide);

    currentData && currentData.forEach((item: dataType) => {
        const {sort, year} = item;
        const age = getAge(year);
        tableData.forEach(elem => {
            if (sort === elem.id) {
                if (age === null) elem.a_0++;
                else if (typeof age === 'number' && age <= 0) elem.a_1++;
                else if (age === 1) elem.a_2++;
                else if (age === 2) elem.a_3++;
                else elem.a_4++;
            }
        });
    });

    return <ReportComponent
        tableData={tableData}
    />;
};

export default Report;