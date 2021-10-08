import * as React from 'react';
import {Icon} from './icons/Icon';
import '../assets/less/guide.less';

type Props = {
    id: string
    label: string
    handleChangeSortLabel: (event: any) => void
}

export const SortLine: React.FC<Props> = (props) => {
    const {id, /* label*/} = props;

    return <div className={'guide-sort'}>
        <div className={'guide-icon'}><Icon sort={id} zoom={0.8}/></div>

    </div>;
};