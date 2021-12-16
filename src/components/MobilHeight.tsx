import * as React from 'react';
import {useSelector} from 'react-redux';

export const MobilHeight: React.FC = () => {

    const {windowSizes} = useSelector((state: any) => state);
    const {windowWidth, windowHeight} = windowSizes || {};

    return <div style={{position: 'absolute', bottom: '150px', right: '120px'}}>
        <div>{windowWidth + 'x' + windowHeight}</div>

    </div>;
};