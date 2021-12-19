import * as React from 'react';
import {getCellSize} from '../../utils';

type Props = {
    zoom?: number
    forPDF?: boolean
    isMobil?: boolean
}

export const Ring: React.FC<Props> = (props) => {

    const {zoom=1, forPDF, isMobil} = props;
    const cell_size = getCellSize(zoom);

    return forPDF
        ? <img src={'../img/ring.png'} style={{width: '20px', height: '20px', padding: '1px'}} alt={''}/>
        : isMobil
            ? <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
                   style={{
                       padding: `${3*zoom}px`,
                       boxSizing: 'border-box',
                       width: cell_size - 1,
                       height: cell_size - 1
                   }}
                   className={'mobile-icon'}
            >
                <circle style={{fill:'transparent'}} stroke={'black'} strokeWidth={4} cx="24" cy="24" r="21"/>
            </svg>
            : <div
                style={{
                    fontSize: `${48*zoom}px`,
                    marginTop: `${-6*zoom}px`
                }}
            >&#9675;</div>;
};