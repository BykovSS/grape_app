import * as React from 'react';

type Props = {
    zoom?: number
    color?: string
    isMac?: boolean
    forPDF?: boolean
}

export const Hearts: React.FC<Props> = (props) => {

    const {zoom=1, color='black', isMac=false, forPDF} = props;

    return forPDF
        ? <img src={'../img/hearts.png'} style={{width: '23px', height: '23px'}} alt={''}/>
        : <div
        style={{
            fontSize: `${(isMac ? 26 : 34)*zoom}px`,
            color: color
        }}
    >&hearts;</div>;
};