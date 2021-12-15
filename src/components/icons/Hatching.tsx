import * as React from 'react';

type Props = {
    zoom?: number
    forPDF?: boolean
}

export const Hatching: React.FC<Props> = (props) => {
    const {zoom, forPDF} = props;

    return forPDF
        ? <img src={'../img/hatching.png'} style={{width: '23px', height: '23px'}} alt={''}/>
        : <div className={'icon__hatching'} style={{
        width: 'inherit',
        height: 'inherit',
        background: `repeating-linear-gradient(-60deg, #8b4513 0, #8b4513 ${zoom}px, transparent ${zoom}px, transparent ${3*zoom}px)`
    }} />;
};