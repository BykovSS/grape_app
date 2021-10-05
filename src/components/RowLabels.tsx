import * as React from 'react';
import {RowLabel} from './RowLabel';
import {getCellSize} from '../utils';
import '../assets/less/rows.less';
import {RowDataType} from '../types';

type Props = {
    zoom: number
    numCol: number
    currentAbscissa: number
    rowsData: RowDataType[]
    handleClickRowLabel: (rowLabel: string) => () => void
}

export const RowLabels:React.FC<Props> = (props) => {
    const {zoom, numCol, currentAbscissa, rowsData, handleClickRowLabel} = props;
    const cell_size = getCellSize(zoom);

    return <div className={'row_labels_field'} style={{height: 25*zoom}}>
        <div
            className={'svg-row-labels'}
            style={{
                width: numCol * cell_size,
                bottom: 0,
                left: currentAbscissa
            }}
        >
            {rowsData ? rowsData.map((item, i: number) => <RowLabel
                key={i}
                row={item}
                cell_size={cell_size}
                zoom={zoom}
                numCol={numCol}
                handleClickRowLabel={handleClickRowLabel}
                />) : null}
        </div>
    </div>;
};