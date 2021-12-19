import * as React from 'react';
import {getCellSize} from '../../utils';

type Props = {
    zoom?: number
    color?: string
    isMac?: boolean
    forPDF?: boolean
    isMobil?: boolean
}

export const Circle: React.FC<Props> = (props) => {

    const {zoom=1, color='black', isMac=false, forPDF, isMobil} = props;
    const cell_size = getCellSize(zoom);

    return forPDF
        ? <img src={'../img/circle.png'} style={{width: '20px', height: '20px', padding: '1px'}} alt={''}/>
        : isMobil
            ? <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
                   style={{
                       padding: `${3*zoom}px`,
                       width: cell_size - 1,
                       height: cell_size - 1
                   }}
                   className={'mobile-icon'}
            >
                <circle style={{fill:`${color}`}} stroke={color} strokeWidth={4} cx="24" cy="24" r="21"/>
            </svg>
            : <div
                style={{
                    fontSize: `${50*zoom}px`,
                    marginTop: `${(isMac ? -7 : -6)*zoom}px`,
                    color: color
                }}
            >&#9679;</div>;
};