import * as React from 'react';
import '../assets/less/field.less';
import {dataType} from '../types';

type Props = {
    cell: dataType
    cell_size: number
    numCol: number
    numRow: number
    selectedCells: string[]
    zoom: number
    handleClickCell: (id: string) => () => void
}

export const FieldCell: React.FC<Props> = (props) => {

    const {cell, cell_size, numCol, numRow, selectedCells, zoom, handleClickCell} = props;

    return <div
        className={`svg-cell ${selectedCells.includes(cell.id) ? 'selected' : ''}`}
        style={{
            width: cell_size,
            height: cell_size,
            left: (cell.x - 1) * cell_size,
            bottom: (cell.y - 1) * cell_size,
            fontSize: `${11*zoom}px`,
            borderRight: cell.x === numCol ? 'none' : '1px solid #aaa',
            borderTop: cell.y === numRow ? 'none' : '1px solid #aaa',
        }}
        data-x={cell.x}
        data-y={cell.y}
        onClick={handleClickCell(cell.id)}
    >{cell.id}</div>;
};