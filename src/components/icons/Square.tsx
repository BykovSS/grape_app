import * as React from 'react';

type Props = {
    zoom?: number
    color?: string
    isMac?: boolean
    forPDF?: boolean
}

export const Square: React.FC<Props> = (props) => {

    const {zoom=1, color='black', isMac=false, forPDF} = props;

    return forPDF
        ? <img src={'../img/square.png'} style={{width: '20px', height: '20px'}} alt={''}/>
        : <div
        style={{
            fontSize: `${(isMac ? 58 : 40)*zoom}px`,
            marginTop: `${-8*zoom}px`,
            color: color
        }}
    >&#9632;</div>;
};