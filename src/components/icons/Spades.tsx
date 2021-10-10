import * as React from 'react';

type Props = {
    zoom?: number
    color?: string
    isMac?: boolean
}

export const Spades: React.FC<Props> = (props) => {

    const {zoom=1, color='black', isMac=false} = props;

    return <div
        style={{
            fontSize: `${(isMac ? 26 : 36)*zoom}px`,
            marginTop: `${(isMac ? 0 : -4)*zoom}px`,
            color: color
        }}
    >&spades;</div>;
};