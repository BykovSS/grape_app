import * as React from 'react';

type Props = {
    zoom?: number
    color?: string
    isMac?: boolean
    forPDF?: boolean
    isMobil?: boolean
}

export const Square: React.FC<Props> = (props) => {

    const {zoom=1, color='black', isMac=false, forPDF, isMobil} = props;

    return forPDF
        ? <img src={'../img/square.png'} style={{width: '20px', height: '20px'}} alt={''}/>
        : isMobil
            ? <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492 492" style={{padding: `${5*zoom}px`}} className={' mobile-icon mobile-icon__square'}>
                <path style={{fill:`${color}`}} d="M0,0h492v492H0V0z"/>
            </svg>
            : <div
                style={{
                    fontSize: `${(isMac ? 58 : 40)*zoom}px`,
                    marginTop: `${-8*zoom}px`,
                    color: color
                }}
            >&#9632;</div>;
};