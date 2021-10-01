import * as React from 'react';
import {RowLabel} from './RowLabel';
import {useSelector, shallowEqual} from 'react-redux';
import {getCellSize, getRowsData} from '../utils';
import '../assets/less/rows.less';

export const RowLabels:React.FC = () => {
    const {data, currentPosition, numCol, zoom} = useSelector((state: any) => state, shallowEqual);
    const {currentAbscissa} = currentPosition || {};

    const cell_size = getCellSize(zoom);
    const rowsData = getRowsData(data);

    return <div className={'row_labels_field'} style={{height: 25*zoom}}>
        <div
            className={'svg-row-labels'}
            style={{
                width: numCol * cell_size,
                bottom: 0,
                left: currentAbscissa
            }}
        >
            {rowsData ? (rowsData as {id: number}[]).map((item, i: number) => <RowLabel
                key={i}
                row={item}
                cell_size={cell_size}
                zoom={zoom}
                numCol={numCol}
                />) : null}
        </div>
    </div>;
};