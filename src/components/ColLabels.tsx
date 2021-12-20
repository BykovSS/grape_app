import * as React from 'react';
import {ColLabel} from './ColLabel';
import {getCellSize} from '../utils';
import {RowDataType} from '../types';
import '../assets/less/cols.less';

type Props = {
    zoom: number
    numRow: number
    currentOrdinate: number
    windowHeight: number
    otherHeight: number
    colsData: RowDataType[]
    handleClickColLabel: (colLabel: string) => () => void
}

export const ColLabels:React.FC<Props> = (props) => {
    const {zoom, numRow, currentOrdinate, windowHeight, otherHeight, colsData, handleClickColLabel} = props;
    const cell_size = getCellSize(zoom);

    return <div
        className={'col_labels_field'}
        style={{
            width: 25*zoom,
            left: -25*zoom,
            top: -25*zoom - (windowHeight - otherHeight)
        }}
    >
        <div
            className={'svg-col-labels'}
            style={{
                height: numRow * cell_size,
                left: 0,
                bottom: currentOrdinate
            }}
        >
            {colsData ? colsData.map((item, i: number) => <ColLabel
                key={i}
                col={item}
                cell_size={cell_size}
                zoom={zoom}
                numRow={numRow}
                handleClickColLabel={handleClickColLabel}
            />) : null}
        </div>
    </div>;
};