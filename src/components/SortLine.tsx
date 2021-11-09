import * as React from 'react';
import {Icon} from './icons/Icon';
import {getStarIdAndNum} from '../utils';
import '../assets/less/guide.less';

type Props = {
    id: string
    label: string
    color?: string
    length?: number
    handleChangeSortLabel: (event: any) => void
    handleClickAddButton: () => void
    handleClickRemoveButton: (id: string) => () => void
}

export const SortLine: React.FC<Props> = (props) => {
    const {id, label, color, length, handleChangeSortLabel, handleClickAddButton, handleClickRemoveButton} = props;
    const {locSort, starNum} = getStarIdAndNum(id);

    return <div className={'guide-sort'}>
        <div className={'guide-icon'}><Icon sort={id} zoom={0.8} color={color}/></div>
        <span className={'guide-dash'}>-</span>
        {id === 'ring' || id === 'hatching' || id === 'color'
            ? <p className={'guide-text'}>{label}</p>
            : <input type={'text'} className={`guide-input${locSort === 'star' ? ' guide-input-star' : ''}`} value={label} onChange={handleChangeSortLabel}/>}
        {locSort === 'star'
            ? <button
                className={'guide-button'}
                disabled={length >= 9 || Boolean(starNum ? Number(starNum) < length : false)}
                onClick={handleClickAddButton}
            >+</button>
            : null}
        {locSort === 'star'
            ? <button
                    className={'guide-button'}
                    disabled={length === 1 || Boolean(starNum ? Number(starNum) < length : false)}
                    onClick={handleClickRemoveButton(id)}
                >-</button>
            : null}
    </div>;
};