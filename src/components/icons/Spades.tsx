import * as React from 'react';

type Props = {
    zoom?: number
    color?: string
}

export const Spades: React.FC<Props> = (props) => {

    const {zoom=1, color='black'} = props;

    return <div
        style={{
            fontSize: `${36*zoom}px`,
            marginTop: `${-4*zoom}px`,
            color: color
        }}
    >&spades;</div>;
};