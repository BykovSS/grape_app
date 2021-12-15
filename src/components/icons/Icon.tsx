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
import {getStarIdAndNum} from '../../utils';

type Props = {
    sort: string
    zoom?: number
    color?: string
    forPDF?: boolean
}

export const Icon: React.FC<Props> = (props) => {

    const {sort, zoom=1, color='black', forPDF} = props;
    const {appVersion} = window.navigator;
    const isMac = appVersion.indexOf('Mac OS') !== -1;

    const {locSort, starNum} = getStarIdAndNum(sort);

    switch (locSort) {
        case 'triangle':
            return <Triangle zoom={zoom} color={color} forPDF={forPDF}/>;
        case 'square':
        case 'color':
            return <Square isMac={isMac} zoom={zoom} color={color} forPDF={forPDF}/>;
        case 'circle':
            return <Circle isMac={isMac} zoom={zoom} color={color} forPDF={forPDF}/>;
        case 'spades':
            return <Spades isMac={isMac} zoom={zoom} color={color} forPDF={forPDF}/>;
        case 'hearts':
            return <Hearts isMac={isMac} zoom={zoom} color={color} forPDF={forPDF}/>;
        case 'clubs':
            return <Clubs isMac={isMac} zoom={zoom} color={color} forPDF={forPDF}/>;
        case 'diamonds':
            return <Diamonds isMac={isMac} zoom={zoom} color={color} forPDF={forPDF}/>;
        case 'star':
            return <Star isMac={isMac} zoom={zoom} color={color} num={Number(starNum)} forPDF={forPDF}/>;
        case 'ring':
            return <Ring zoom={zoom} forPDF={forPDF}/>;
        case 'hatching':
            return <Hatching zoom={zoom} forPDF={forPDF}/>;
        default:
            return null;
    }
};