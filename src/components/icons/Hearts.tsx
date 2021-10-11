import * as React from 'react';

type Props = {
    zoom?: number
    color?: string
    isMac?: boolean
}

export const Hearts: React.FC<Props> = (props) => {

    const {zoom=1, color='black', isMac=false} = props;

    return <div
        style={{
            fontSize: `${(isMac ? 26 : 34)*zoom}px`,
            color: color
        }}
    >&hearts;</div>;
};