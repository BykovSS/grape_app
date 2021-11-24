import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../actions';
import {CurrentCell as CurrentCellComponent} from '../components/CurrentCell';
import {getYearsArrray} from '../utils';
import {EntityType} from '../types';

const CurrentCell: React.FC = () => {

    const {currentCell, selectedCells, guide} = useSelector((state: any) => state);
    const yearsArray = getYearsArrray();

    const dispatch = useDispatch();

    const handleChangeYear = React.useCallback((value: number) => () => {
        dispatch(actions.onChangeCurrentYear(value));
    }, [dispatch]);

    const handleChangeSort = React.useCallback((value: string) => () => {
        dispatch(actions.onChangeCurrentSort(value));
    }, [dispatch]);

    return <CurrentCellComponent
        currentCell={currentCell}
        yearsArray={yearsArray}
        sortsArray={guide ? (guide as EntityType[]).map(elem => elem.id) : null}
        disableSortSelect={!selectedCells || selectedCells && selectedCells.length === 0}
        handleChangeYear={handleChangeYear}
        handleChangeSort={handleChangeSort}
    />;
};

export default CurrentCell;