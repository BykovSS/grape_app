import * as React from 'react';

type Props = {
    zoom?: number
}

export const Hatching: React.FC<Props> = (props) => {
    const {zoom} = props;

    return <div style={{
        width: 'inherit',
        height: 'inherit',
        background: `repeating-linear-gradient(-60deg, #555 0, #555 ${zoom}px, transparent ${zoom}px, transparent ${3*zoom}px)`
    }} />;
};