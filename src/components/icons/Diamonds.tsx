import * as React from 'react';

type Props = {
    zoom?: number
    color?: string
}

export const Diamonds: React.FC<Props> = (props) => {

    const {zoom=1, color='black'} = props;

    return <div
        style={{
            fontSize: `${38*zoom}px`,
            marginTop: `${-4*zoom}px`,
            color: color
        }}
    >&diams;</div>;
};