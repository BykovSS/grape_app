import * as React from 'react';
import {RowLabels as RowLabelsComponent} from '../components/RowLabels';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {getRowsData, getRowFromId} from '../utils';
import '../assets/less/rows.less';
import * as actions from '../actions';

const RowLabels:React.FC = () => {
    const {data: allData, currentFieldValue, currentPosition, numCol, numRow, zoom, selectedCells} = useSelector((state: any) => state, shallowEqual);
    const data = React.useMemo(() => {
        return allData && currentFieldValue ? allData[currentFieldValue] : [];
    }, [allData, currentFieldValue]);
    const {currentAbscissa} = currentPosition || {};

    const rowsData = getRowsData(data);
    const dispatch = useDispatch();

    const handleClickRowLabel = React.useCallback((rowLabel: string) => () => {
        let isRowSelected = true;
        for (let i=1; i<=numRow; i++) {
            isRowSelected = !selectedCells.includes(rowLabel+'/'+i) ? false : isRowSelected;
        }
        let locSelectedCells;
        if (isRowSelected) {
            locSelectedCells = selectedCells.filter((item: string) => getRowFromId(item) !== rowLabel);
        } else {
            locSelectedCells = selectedCells;
            for (let i=1; i<=numRow; i++) {
                if (!selectedCells.includes(rowLabel+'/'+i)) {
                    locSelectedCells.push(rowLabel+'/'+i);
                }
            }
        }
        dispatch(actions.changeSelectedCells(locSelectedCells));
    }, [numRow, selectedCells, dispatch]);

    return <RowLabelsComponent
        zoom={zoom}
        numCol={numCol}
        currentAbscissa={currentAbscissa}
        rowsData={rowsData}
        handleClickRowLabel={handleClickRowLabel}
    />;
};

export default RowLabels;