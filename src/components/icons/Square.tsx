import * as React from 'react';

type Props = {
    zoom?: number
    color?: string
}

export const Square: React.FC<Props> = (props) => {

    const {zoom=1, color='black'} = props;

    return <div
        style={{
            fontSize: `${40*zoom}px`,
            marginTop: `${-8*zoom}px`,
            color: color
        }}
    >&#9632;</div>;
};