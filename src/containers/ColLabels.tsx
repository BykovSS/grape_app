import * as React from 'react';
import {ColLabels as ColLabelsComponent} from '../components/ColLabels';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {getColsData, getColFromId} from '../utils';
import '../assets/less/rows.less';
import * as actions from '../actions';

const ColLabels:React.FC = () => {
    const {data: allData, currentFieldValue, currentPosition, windowSizes, numCol, numRow, zoom, selectedCells} = useSelector((state: any) => state, shallowEqual);
    const data = React.useMemo(() => {
        return allData && currentFieldValue ? allData[currentFieldValue] : [];
    }, [allData, currentFieldValue]);
    const {currentOrdinate} = currentPosition || {};
    const {windowHeight} = windowSizes || {};

    const colsData = getColsData(data);
    const dispatch = useDispatch();

    const handleClickColLabel = React.useCallback((colLabel: string) => () => {
        let isColSelected = true;
        for (let i=1; i<=numCol; i++) {
            isColSelected = !selectedCells.includes(i+'/'+colLabel) ? false : isColSelected;
        }
        let locSelectedCells;
        if (isColSelected) {
            locSelectedCells = selectedCells.filter((item: string) => getColFromId(item) !== colLabel);
        } else {
            locSelectedCells = selectedCells;
            for (let i=1; i<=numCol; i++) {
                if (!selectedCells.includes(i+'/'+colLabel)) {
                    locSelectedCells.push(i+'/'+colLabel);
                }
            }
        }
        dispatch(actions.changeSelectedCells(locSelectedCells));
    }, [numCol, selectedCells, dispatch]);

    return <ColLabelsComponent
        zoom={zoom}
        numRow={numRow}
        currentOrdinate={currentOrdinate}
        windowHeight={windowHeight}
        colsData={colsData}
        handleClickColLabel={handleClickColLabel}
    />;
};

export default ColLabels;