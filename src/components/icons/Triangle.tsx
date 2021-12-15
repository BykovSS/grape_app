import * as React from 'react';

type Props = {
    zoom: number
    color: string
    forPDF?: boolean
}

export const Triangle: React.FC<Props> = (props) => {

    const {zoom, color, forPDF} = props;

    return forPDF
        ? <img src={'../img/triangle.png'} style={{width: '20px', height: '20px'}} alt={''}/>
        : <div
        style={{
            fontSize: `${28*zoom}px`,
            color: color
        }}
    >&#9650;</div>;
};