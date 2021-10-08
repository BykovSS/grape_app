import * as React from 'react';

type Props = {
    zoom?: number
}

export const Ring: React.FC<Props> = (props) => {

    const {zoom=1} = props;

    return <div
        style={{
            fontSize: `${48*zoom}px`,
            marginTop: `${-6*zoom}px`
        }}
    >&#9675;</div>;
};