import * as React from 'react';
import '../assets/less/cols.less';
import {RowDataType} from '../types';

type Props = {
    col: RowDataType
    cell_size: number
    zoom: number
    numRow: number
    handleClickColLabel: (colLabel: string) => () => void
}

export const ColLabel:React.FC<Props> = (props) => {
    const {col, cell_size, zoom, numRow, handleClickColLabel} = props;

    return <div
        className={'svg-col-label'}
        style={{
            height: cell_size,
            bottom: (col.y - 1) * cell_size,
            fontSize: `${11*zoom}px`,
            borderTop: col.y === numRow ? 'none' : '1px solid purple',
        }}
        onClick={handleClickColLabel(String(col.y))}
    >{col.y}</div>;
};