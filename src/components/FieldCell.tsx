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
            left: (cell.col - 1) * cell_size,
            bottom: (cell.row - 1) * cell_size,
            fontSize: `${11*zoom}px`,
            borderRight: cell.col === numCol ? 'none' : '1px solid #aaa',
            borderTop: cell.row === numRow ? 'none' : '1px solid #aaa',
        }}
        onClick={handleClickCell(cell.id)}
    >{cell.id}</div>;
};