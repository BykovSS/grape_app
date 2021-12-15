import * as React from 'react';

type Props = {
    zoom?: number
    color?: string
    isMac?: boolean
    forPDF?: boolean
    isMobil?: boolean
}

export const Circle: React.FC<Props> = (props) => {

    const {zoom=1, color='black', isMac=false, forPDF, isMobil} = props;

    return forPDF
        ? <img src={'../img/circle.png'} style={{width: '20px', height: '20px', padding: '1px'}} alt={''}/>
        : isMobil
            ? <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{padding: `${4*zoom}px`}} className={'mobile-icon'}>
                <circle style={{fill:`${color}`}} cx="24" cy="24" r="24"/>
            </svg>
            : <div
                style={{
                    fontSize: `${50*zoom}px`,
                    marginTop: `${(isMac ? -7 : -6)*zoom}px`,
                    color: color
                }}
            >&#9679;</div>;
};