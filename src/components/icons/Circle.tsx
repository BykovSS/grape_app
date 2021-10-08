import * as React from 'react';

type Props = {
    zoom?: number
    color?: string
}

export const Circle: React.FC<Props> = (props) => {

    const {zoom=1, color='black'} = props;

    return <div
        style={{
            fontSize: `${50*zoom}px`,
            marginTop: `${-6*zoom}px`,
            color: color
        }}
    >&#9679;</div>;
};