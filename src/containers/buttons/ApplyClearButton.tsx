import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../actions';
import '../../assets/less/buttons.less';
import {dataType} from '../../types';
import {APPLY, CLEAR, SORT_WITH_YEAR, SORT_WITHOUT_YEAR} from '../../constants';

type Props = {
    type: string
}

const ApplyClearButton:React.FC<Props> = (props) => {
    const {type} = props;

    const {data: allData, currentFieldValue, currentCell, selectedCells} = useSelector((state: any) => state);
    const data = React.useMemo(() => {
        return allData && currentFieldValue ? allData[currentFieldValue] : [];
    }, [allData, currentFieldValue]);
    const disabled = !selectedCells || selectedCells && selectedCells.length === 0;
    const {sort=null, year=null} = type === APPLY ? currentCell || {} : {};

    const dispatch = useDispatch();

    const handleClick = React.useCallback(() => {
        dispatch(actions.changeData(data.map((e: dataType) => selectedCells.includes(e.id)
            ? {
                ...e,
                sort,
                year: SORT_WITHOUT_YEAR.includes(sort)
                    ? null
                    : SORT_WITH_YEAR.includes(sort) && year !== 'absent' && (!year || isNaN(year) || year === 'null')
                        ? 'absent'
                        : year
            }
            : e))
        );
        const selectedCellsData = data.filter((e: dataType) => selectedCells.includes(e.id));
        dispatch(actions.addLogEvent({
            id: 'log_' + Date.now(),
            fieldId: currentFieldValue,
            prevData: selectedCellsData,
            currentData: selectedCellsData.map((e: dataType) => (
                {
                    ...e,
                    sort,
                    year: SORT_WITHOUT_YEAR.includes(sort)
                        ? null
                        : SORT_WITH_YEAR.includes(sort) && year !== 'absent' && (!year || isNaN(year) || year === 'null')
                            ? 'absent'
                            : year
                })
            )
        }, currentFieldValue));
    }, [dispatch, data, selectedCells, sort, year, currentFieldValue]);

    return <button
        className={'apply-clear_button'}
        disabled={disabled}
        onClick={handleClick}
    >{type === APPLY ? 'Применить' : type === CLEAR ? 'Очистить' : ''}</button>;
};

export default ApplyClearButton;