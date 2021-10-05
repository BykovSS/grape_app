import * as React from 'react';
import '../assets/less/rows.less';
import {RowDataType} from '../types';

type Props = {
    row: RowDataType
    cell_size: number
    zoom: number
    numCol: number
    handleClickRowLabel: (rowLabel: string) => () => void
}

export const RowLabel:React.FC<Props> = (props) => {
    const {row, cell_size, zoom, numCol, handleClickRowLabel} = props;

    return <div
        className={'svg-row-label'}
        style={{
            width: cell_size,
            left: (row.x - 1) * cell_size,
            fontSize: `${11*zoom}px`,
            borderRight: row.x === numCol ? 'none' : '1px solid purple',
        }}
        onClick={handleClickRowLabel(String(row.row))}
    >{row.row}</div>;
};