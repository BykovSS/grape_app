import * as React from 'react';

type Props = {
    zoom?: number
    color?: string
    isMac?: boolean
    forPDF?: boolean
}

export const Diamonds: React.FC<Props> = (props) => {

    const {zoom=1, color='black', isMac=false, forPDF} = props;

    return forPDF
        ? <img src={'../img/diamonds.png'} style={{width: '25px', height: '25px'}} alt={''}/>
        : <div
        style={{
            fontSize: `${(isMac ? 25 : 38)*zoom}px`,
            marginTop: `${(isMac ? 0 : -4)*zoom}px`,
            color: color
        }}
    >&diams;</div>;
};