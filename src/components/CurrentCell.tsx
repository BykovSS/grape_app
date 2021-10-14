import * as React from 'react';
import {Select} from './Select';
import '../assets/less/current.less';
import {dataType} from '../types';
import ApplyClearButton from '../containers/buttons/ApplyClearButton';
import {APPLY, CLEAR, SORT, YEAR} from '../constants';

type Props = {
    currentCell: dataType
    yearsArray: number[]
    sortsArray: string[]
    disableSortSelect: boolean
    handleChangeYear: (value: number) => () => void
    handleChangeSort: (value: string) => () => void
}

export const CurrentCell: React.FC<Props> = (props) => {
    const {currentCell, yearsArray, sortsArray, disableSortSelect, handleChangeYear, handleChangeSort} = props;
    const {year, sort} = currentCell || {};

    return <div className={'current-cell-wrap'}>
        <div className={'current-cell-header'}>{'Задать значение:'}</div>
        <div className={'current-cell-select'}>
            <p className={'current-cell-label'}>{'Сорт:'}</p>
            <Select
                type={SORT}
                value={sort ? sort : ''}
                options={sortsArray}
                disable={disableSortSelect}
                onChange={handleChangeSort}
            />
        </div>
        <div className={'current-cell-select'}>
            <p className={'current-cell-label'}>{'Год:'}</p>
            <Select
                type={YEAR}
                value={year}
                options={yearsArray}
                disable={!sort || sort === 'ring' || sort === 'hatching'}
                onChange={handleChangeYear}
            />
        </div>
        <div className={'current-cell-button'}>
            <ApplyClearButton type={APPLY}/>
        </div>
        <div className={'current-cell-button'}>
            <ApplyClearButton type={CLEAR}/>
        </div>
    </div>;
};