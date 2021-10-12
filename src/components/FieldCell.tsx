import * as React from 'react';
import {Icon} from './icons/Icon';
import '../assets/less/field.less';
import {dataType} from '../types';
import {getCellColor} from '../utils';

type Props = {
    cell: dataType
    cell_size: number
    numCol: number
    numRow: number
    selected: boolean
    zoom: number
    handleClickCell: (id: string) => () => void
}

export const FieldCell: React.FC<Props> = (props) => {

    const {cell, cell_size, numCol, numRow, selected, zoom, handleClickCell} = props;
    const {x, y, id, sort, year} = cell || {};
    const color = getCellColor(year);

    return <div
        className={`svg-cell ${selected ? 'selected' : ''}`}
        style={{
            width: cell_size,
            height: cell_size,
            left: (x - 1) * cell_size,
            bottom: (y - 1) * cell_size,
            fontSize: `${11*zoom}px`,
            borderRight: x === numCol ? 'none' : '1px solid #aaa',
            borderTop: y === numRow ? 'none' : '1px solid #aaa',
        }}
        data-x={x}
        data-y={y}
        onClick={handleClickCell(id)}
    ><Icon sort={sort} color={color} zoom={zoom}/></div>;
};