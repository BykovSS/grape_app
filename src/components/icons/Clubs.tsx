import * as React from 'react';

type Props = {
    zoom?: number
    color?: string
    isMac?: boolean
    forPDF?: boolean
}

export const Clubs: React.FC<Props> = (props) => {

    const {zoom=1, color='black', isMac=false, forPDF} = props;

    return forPDF
        ? <img src={'../img/clubs.png'} style={{width: '23px', height: '23px'}} alt={''}/>
        : <div
        style={{
            fontSize: `${(isMac ? 26 : 34)*zoom}px`,
            marginTop: `${(isMac ? 0 : -4)*zoom}px`,
            color: color
        }}
    >&clubs;</div>;
};