import * as React from 'react';
import {getCellSize} from '../../utils';

type Props = {
    zoom?: number
    color?: string
    num?: number
    isMac?: boolean
    forPDF?: boolean
    isMobil?: boolean
}

export const Star: React.FC<Props> = (props) => {

    const {zoom=1, color='black', num=1, isMac=false, forPDF, isMobil} = props;
    const cell_size = getCellSize(zoom);

    return forPDF
        ? <div style={{position: 'relative'}}>
            <img src={'../img/star.png'} style={{width: '23px', height: '23px'}} alt={''}/>
            <span style={{
                fontSize: '11px',
                marginTop: '-7px',
                color: 'white',
                position: 'absolute',
                left: 0,
                right: 0,
                top: '50%',
                textAlign: 'center'
            }}>{num}</span>
        </div>
        : isMobil
            ? <div className={'mobile-icon-wrap mobile-icon__star-wrap'}>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 525.153 525.153"
                     style={{
                         padding: `${2*zoom}px`,
                         width: cell_size - 1,
                         height: cell_size - 1
                     }}
                     className={'mobile-icon mobile-icon__star'}
                >
                    <path style={{fill:`${color}`}} d="M262.576,414.028l162.272,97.963L381.786,327.4l143.367-124.199l-188.77-15.995L262.576,13.162L188.77,187.206L0,203.201
		                L143.367,327.4l-43.062,184.591L262.576,414.028z"/>
                </svg>
                <span
                    style={{
                        fontSize: `${10*zoom}px`,
                        marginTop: `${-3.5*zoom}px`,
                        color: 'white',
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: '50%',
                        textAlign: 'center'
                    }}
                >{num}</span>
            </div>
            : <div
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