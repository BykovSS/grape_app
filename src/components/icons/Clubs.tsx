import * as React from 'react';

type Props = {
    zoom?: number
    color?: string
    isMac?: boolean
    forPDF?: boolean
    isMobil?: boolean
}

export const Clubs: React.FC<Props> = (props) => {

    const {zoom=1, color='black', isMac=false, forPDF, isMobil} = props;

    return forPDF
        ? <img src={'../img/clubs.png'} style={{width: '23px', height: '23px'}} alt={''}/>
        : isMobil
            ? <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" style={{padding: `${2*zoom}px`}} className={'mobile-icon mobile-icon__clubs'}>
                <path style={{fill:`${color}`}} d="m 5.9879637,6.1783 c -1.89881,-0.907 -4.69189,0.1749 -4.03105,2.6155 0.64399,2.3784 3.42513,1.8564 4.38685,0.4087 -0.40121,2.745 -1.10584,3.1724 -1.52817,3.7683 l 4.48387,0 c -0.4543,-0.6373 -1.27925,-1.0233 -1.76303,-3.806 0.96908,1.4454 3.8823703,1.9464 4.5170603,-0.3976 0.62435,-2.3058 -2.1900103,-3.619 -4.0614903,-2.5751 1.79457,-1.2051 2.4390503,-5.1629 -0.95987,-5.1629 -3.43247,0 -2.85977,4.0352 -1.04417,5.1491 z"/>
            </svg>
            : <div
                style={{
                    fontSize: `${(isMac ? 26 : 34)*zoom}px`,
                    marginTop: `${(isMac ? 0 : -4)*zoom}px`,
                    color: color
                }}
            >&clubs;</div>;
};