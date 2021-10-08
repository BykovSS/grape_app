import * as React from 'react';

type Props = {
    zoom: number
    color: string
}

export const Triangle: React.FC<Props> = (props) => {

    const {zoom, color} = props;

    return <div
        style={{
            fontSize: `${28*zoom}px`,
            color: color
        }}
    >&#9650;</div>;
};