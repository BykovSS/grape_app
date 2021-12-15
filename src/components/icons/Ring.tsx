import * as React from 'react';

type Props = {
    zoom?: number
    forPDF?: boolean
}

export const Ring: React.FC<Props> = (props) => {

    const {zoom=1, forPDF} = props;

    return forPDF
        ? <img src={'../img/ring.png'} style={{width: '20px', height: '20px', padding: '1px'}} alt={''}/>
        : <div
        style={{
            fontSize: `${48*zoom}px`,
            marginTop: `${-6*zoom}px`
        }}
    >&#9675;</div>;
};