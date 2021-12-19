import * as React from 'react';
import {getCellSize} from '../../utils';

type Props = {
    zoom?: number
    color?: string
    isMac?: boolean
    forPDF?: boolean
    isMobil?: boolean
}

export const Hearts: React.FC<Props> = (props) => {

    const {zoom=1, color='black', isMac=false, forPDF, isMobil} = props;
    const cell_size = getCellSize(zoom);

    return forPDF
        ? <img src={'../img/hearts.png'} style={{width: '23px', height: '23px'}} alt={''}/>
        : isMobil
            ? <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"
                   style={{
                       padding: `${2*zoom}px`,
                       width: cell_size - 1,
                       height: cell_size - 1
                   }}
                   className={'mobile-icon mobile-icon__hearts'}
            >
                <path style={{fill:`${color}`}} d="m 6.9238749,12.964876 c -0.0111,-0.02 -0.0587,-0.1642 -0.10586,-0.3207 -0.29877,-0.9913 -0.8534,-1.9952 -1.78219,-3.2256997 -0.34895,-0.4623 -0.67739,-0.8717 -1.56552,-1.9513 -1.02835,-1.25 -1.32291,-1.6505 -1.62036,-2.2028 -0.17565,-0.3262 -0.35768,-0.8224 -0.41758,-1.1385 -0.0599,-0.3158 -0.0608,-0.8319 -0.002,-1.1006 0.23902,-1.093 1.2099,-1.9176 2.37084,-2.0136 1.32995,-0.10999996 2.46124,0.5618 3.05565,1.8147 l 0.13273,0.2797 0.0999,-0.221 c 0.14844,-0.3284 0.29139,-0.5505 0.53268,-0.8276 0.61434,-0.7056 1.34547,-1.0512 2.22626,-1.0524 0.3945301,-5e-4 0.6206001,0.032 0.9568001,0.1386 0.50282,0.1591 0.88133,0.407 1.21843,0.7979 0.87849,1.0187 0.77448,2.4066 -0.30777,4.1063 -0.25245,0.3965 -0.70795,0.9832 -1.33437,1.7187 -0.7213701,0.8469 -1.0738301,1.2773 -1.4347001,1.752 -0.86498,1.1376997 -1.44672,2.1714997 -1.76671,3.1394997 -0.0488,0.1477 -0.1,0.2853 -0.11365,0.3058 -0.0318,0.048 -0.11629,0.048 -0.1425,10e-4 z"/>
            </svg>
            : <div
                style={{
                    fontSize: `${(isMac ? 26 : 34)*zoom}px`,
                    color: color
                }}
            >&hearts;</div>;
};