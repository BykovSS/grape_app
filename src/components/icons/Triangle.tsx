import * as React from 'react';
import '../../assets/less/icons.less';
import {getCellSize} from '../../utils';

type Props = {
    zoom: number
    color: string
    forPDF?: boolean
    isMobil?: boolean
}

export const Triangle: React.FC<Props> = (props) => {

    const {zoom, color, forPDF, isMobil} = props;
    const cell_size = getCellSize(zoom);

    return forPDF
        ? <img src={'../img/triangle.png'} style={{width: '20px', height: '20px'}} alt={''}/>
        : isMobil
            ? <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
                   style={{
                       padding: `${4*zoom}px`,
                       width: cell_size - 1,
                       height: cell_size - 1
                   }}
                   className={'mobile-icon'}
            >
                <polygon style={{fill:`${color}`}} points="8,0 0,16 16,16"/>
            </svg>
            : <div
                style={{
                    fontSize: `${28*zoom}px`,
                    color: color
                }}
            >&#9650;</div>;
};