import * as React from 'react';
import {getCellSize} from '../../utils';

type Props = {
    zoom?: number
    color?: string
    isMac?: boolean
    forPDF?: boolean
    isMobil?: boolean
}

export const Spades: React.FC<Props> = (props) => {

    const {zoom=1, color='black', isMac=false, forPDF, isMobil} = props;
    const cell_size = getCellSize(zoom);

    return forPDF
        ? <img src={'../img/spades.png'} style={{width: '23px', height: '23px'}} alt={''}/>
        : isMobil
            ? <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 533.333 533.333"
                   style={{
                       padding: `${4*zoom}px`,
                       width: cell_size - 1,
                       height: cell_size - 1
                   }}
                   className={'mobile-icon'}
            >
                <path style={{fill:`${color}`}} d="M425.817,181.328C325.001,106.402,290.262,46.423,266.668,0.001l0,0c-0.002,0-0.002-0.001-0.002-0.001v0.001
                    c-23.592,46.422-58.333,106.402-159.149,181.327c-171.893,127.753-10.092,306.077,132.166,207.93
                    c-9.269,60.9-40.901,105.298-73.025,124.416v19.659h100.008h100.008v-19.656c-32.126-19.118-63.756-63.517-73.026-124.419
                    C435.905,487.407,597.709,309.081,425.817,181.328z"/>
            </svg>
            : <div
                style={{
                    fontSize: `${(isMac ? 26 : 36)*zoom}px`,
                    marginTop: `${(isMac ? 0 : -4)*zoom}px`,
                    color: color
                }}
            >&spades;</div>;
};