import * as React from 'react';

type Props = {
    zoom?: number
    color?: string
    isMac?: boolean
    forPDF?: boolean
}

export const Circle: React.FC<Props> = (props) => {

    const {zoom=1, color='black', isMac=false, forPDF} = props;

    return forPDF
        ? <img src={'../img/circle.png'} style={{width: '20px', height: '20px', padding: '1px'}} alt={''}/>
        : <div
        style={{
            fontSize: `${50*zoom}px`,
            marginTop: `${(isMac ? -7 : -6)*zoom}px`,
            color: color
        }}
    >&#9679;</div>;
};