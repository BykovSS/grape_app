import * as React from 'react';
import {FieldCell} from './FieldCell';
import ZoomButtonGroup from '../containers/buttons/ZoomButtonGroup';
import '../assets/less/field.less';
import {dataType} from '../types';

type Props = {
    cell_size: number
    numCol: number
    numRow: number
    currentOrdinate: number
    currentAbscissa: number
    data: dataType[]
    selectedCells: string[]
    zoom: number
    handleClickCell: (id: string) => () => void
    increaseZoom: () => void
    decreaseZoom: () => void
}

export const Field: React.FC<Props> = (props) => {

    const {cell_size, numCol, numRow, currentOrdinate, currentAbscissa, data, selectedCells, zoom, handleClickCell, increaseZoom, decreaseZoom} = props;

    return <div className={'svg_field'}>
        <div
            className={'svg-cells-wrap'}
            style={{
                width: numCol * cell_size,
                height: numRow * cell_size,
                bottom: currentOrdinate,
                left: currentAbscissa
            }}>
            {data ? data.map((item: dataType, i: number) => <FieldCell
                key={i}
                cell={item}
                cell_size={cell_size}
                numCol={numCol}
                numRow={numRow}
                selectedCells={selectedCells}
                zoom={zoom}
                handleClickCell={handleClickCell}
            />) : null}
        </div>
        <ZoomButtonGroup
            increaseZoom={increaseZoom}
            decreaseZoom={decreaseZoom}
        />
    </div>;
};