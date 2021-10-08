import * as React from 'react';
import {Triangle} from './Triangle';
import {Square} from './Square';
import {Circle} from './Circle';
import {Spades} from './Spades';
import {Hearts} from './Hearts';
import {Clubs} from './Clubs';
import {Diamonds} from './Diamonds';
import {Star} from './Star';
import {Ring} from './Ring';
import {Hatching} from './Hatching';

type Props = {
    sort: string
    zoom?: number
    color?: string
}

export const Icon: React.FC<Props> = (props) => {

    const {sort, zoom=1, color='black'} = props;

    let locSort = sort;
    let starNum: string;

    if (sort && sort.startsWith('star_')) {
        [locSort, starNum] = sort.split('_');
    }

    switch (locSort) {
        case 'triangle':
            return <Triangle zoom={zoom} color={color}/>;
        case 'square':
            return <Square zoom={zoom} color={color}/>;
        case 'circle':
            return <Circle zoom={zoom} color={color}/>;
        case 'spades':
            return <Spades zoom={zoom} color={color}/>;
        case 'hearts':
            return <Hearts zoom={zoom} color={color}/>;
        case 'clubs':
            return <Clubs zoom={zoom} color={color}/>;
        case 'diamonds':
            return <Diamonds zoom={zoom} color={color}/>;
        case 'star':
            return <Star zoom={zoom} color={color} num={Number(starNum)}/>;
        case 'ring':
            return <Ring zoom={zoom}/>;
        case 'hatching':
            return <Hatching zoom={zoom}/>;
        default:
            return null;
    }
};