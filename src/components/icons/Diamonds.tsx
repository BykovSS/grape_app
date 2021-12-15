import * as React from 'react';

type Props = {
    zoom?: number
    color?: string
    isMac?: boolean
    forPDF?: boolean
    isMobil?: boolean
}

export const Diamonds: React.FC<Props> = (props) => {

    const {zoom=1, color='black', isMac=false, forPDF, isMobil} = props;

    return forPDF
        ? <img src={'../img/diamonds.png'} style={{width: '25px', height: '25px'}} alt={''}/>
        : isMobil
            ? <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" style={{padding: `${zoom}px`}} className={'mobile-icon mobile-icon__diamonds'}>
                <path style={{fill:`${color}`}} d="m 6.999995,1 c -1.2494,2.0791 -2.65591,4.0791 -4.08487,6 1.49629,1.9209 2.92525,3.9209 4.08487,6 1.20452,-2.1187 2.52125,-4.1385 4.08488,-6 C 9.566135,5.0791 8.182065,3.0396 6.999995,1 Z"/>
            </svg>
            : <div
                style={{
                    fontSize: `${(isMac ? 25 : 38)*zoom}px`,
                    marginTop: `${(isMac ? 0 : -4)*zoom}px`,
                    color: color
                }}
            >&diams;</div>;
};