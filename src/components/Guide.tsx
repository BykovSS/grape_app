import * as React from 'react';
import SortLine from '../containers/SortLine';
import ApplyGuideButton from '../containers/buttons/ApplyGuideButton';
import '../assets/less/guide.less';
import {GuideType} from '../types';

type Props = {
    isOpen: boolean
    guide: GuideType[]
    handleClickIcon: () => void
}

export const Guide: React.FC<Props> = (props) => {

    const {isOpen, guide, handleClickIcon} = props;

    return <div className={`guide ${isOpen ? 'opened' : 'closed'}`}>
        <h2 className={'guide-header'}>Обозначения</h2>
        <div className={'guide-content'}>
            <div className={'guide-data_wrap'}>
                <p className={'guide-separator'}>красные сорта</p>
                {guide && guide.map(elem => elem.type === 'red' ? <SortLine key={elem.id} id={elem.id} label={elem.label}/> : null)}
                <p className={'guide-separator'}>белые сорта</p>
                {guide && guide.map(elem => elem.type === 'white' ? <SortLine key={elem.id} id={elem.id} label={elem.label}/> : null)}
                <p className={'guide-separator'}>остальное</p>
                {guide && guide.map((elem, i, arr) => elem.type === 'other'
                    ? <SortLine
                        key={elem.id}
                        id={elem.id}
                        label={elem.label}
                        length={arr.filter(item => item.id.indexOf('star_') !== -1).length}
                    />
                    : null)}
                {guide && guide.map(elem => elem.type === 'free' ? <SortLine key={elem.id} id={elem.id} label={elem.label}/> : null)}
                {guide && guide.map(elem => elem.type === 'hatching' ? <SortLine key={elem.id} id={elem.id} label={elem.label}/> : null)}
                <p className={'guide-separator'}>возраст</p>
                <SortLine key={1} id={'color'} label={'1 год'} color={'green'}/>
                <SortLine key={2} id={'color'} label={'2 года'} color={'#f5e42c'}/>
                <SortLine key={3} id={'color'} label={'3 года'} color={'blue'}/>
                <SortLine key={4} id={'color'} label={'4+ года'} color={'red'}/>
                <SortLine key={5} id={'color'} label={'Куст отсутствует'}/>
            </div>
            <ApplyGuideButton />
        </div>
        <div className={'guide-open-button'} onClick={handleClickIcon}>
            <div className={'guide-open-button__icon'}/>
        </div>
    </div>;
};