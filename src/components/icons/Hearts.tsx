import * as React from 'react';

type Props = {
    zoom?: number
    color?: string
}

export const Hearts: React.FC<Props> = (props) => {

    const {zoom=1, color='black'} = props;

    return <div
        style={{
            fontSize: `${34*zoom}px`,
            color: color
        }}
    >&hearts;</div>;
};