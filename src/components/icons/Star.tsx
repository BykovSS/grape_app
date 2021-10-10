import * as React from 'react';

type Props = {
    zoom?: number
    color?: string
    num?: number
    isMac?: boolean
}

export const Star: React.FC<Props> = (props) => {

    const {zoom=1, color='black', num=1, isMac=false} = props;

    return <div
        style={{
            fontSize: `${(isMac ? 26 : 34)*zoom}px`,
            marginTop: `${(isMac ? 0 : -6)*zoom}px`,
            color: color,
            position: 'relative'
        }}
    >
        &#9733;
        <span
            style={{
                fontSize: `${11*zoom}px`,
                marginTop: `${-3*zoom}px`,
                color: 'white',
                position: 'absolute',
                left: 0,
                right: 0,
                top: '50%',
                textAlign: 'center'
            }}
        >{num}</span>
    </div>;
};