import * as React from 'react';
import {Icon} from './icons/Icon';
import '../assets/less/select.less';
import {SORT} from '../constants';

type Props = {
    type: string
    value: string | number
    options: (string | number)[]
    disable: boolean
    onChange?: (value: string | number) => () => void
}

export const Select: React.FC<Props> = (props) => {
    const {type, value, options, disable, onChange} = props;

    const useOutsideAlerter = (ref: any) => {
        React.useEffect(() => {
            const handleClickOutside = (event: any) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    const selectSingle = document.querySelector(`.${'__' + type + '__select'}`);
                    if ('active' === selectSingle.getAttribute('data-state')) {
                        selectSingle.setAttribute('data-state', '');
                    }
                }
            };

            document.addEventListener('mousedown', handleClickOutside);

            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref]);
    };



    React.useEffect(() => {
        const handleClickInSideContent = (element: Element) => () => {
            if (!disable) {
                if ('active' === element.getAttribute('data-state')) {
                    element.setAttribute('data-state', '');
                } else {
                    element.setAttribute('data-state', 'active');
                }
            }
        };

        const handleClickLabel = (elem: Element) => () => {
            elem.setAttribute('data-state', '');
        };

        const selectSingle = document.querySelector(`.${'__' + type + '__select'}`);
        const selectSingle_title = selectSingle.querySelector(`.${'__' + type + '__select__title'}`);
        const selectSingle_labels = selectSingle.querySelectorAll(`.${'__' + type + '__select__label'}`);

        selectSingle_title.addEventListener('click', handleClickInSideContent(selectSingle));

        for (let i = 0; i < selectSingle_labels.length; i++) {
            selectSingle_labels[i].addEventListener('click', handleClickLabel(selectSingle));
        }

        return () => {
            selectSingle_title.addEventListener('click', handleClickInSideContent(selectSingle));
            for (let i = 0; i < selectSingle_labels.length; i++) {
                selectSingle_labels[i].removeEventListener('click', handleClickLabel(selectSingle));
            }
        };
    }, [disable, type]);

    const wrapperRef = React.useRef(null);
    useOutsideAlerter(wrapperRef);

    return <div
        className={`__select ${'__' + type + '__select'}`}
        data-state={''}
        ref={wrapperRef}
    >
        <div
            className={`__select__title ${'__' + type + '__select__title'}${disable ? ' disable' : ''}`}
            data-default={value ? value : 'none'}
        >
            {value
                ? type === SORT
                    ? <div className={'__select__icon'}><Icon sort={value as string} zoom={0.8}/></div>
                    : value
                : ''}
        </div>
        <div className={'__select__content'}>
            {options && options.map((elem, i) => elem ? <React.Fragment key={i}>
                <input id={'singleSelect_' + i} className={'__select__input'} type={'radio'} name={'singleSelect'} defaultChecked={elem === value}/>
                <label
                    htmlFor={'singleSelect_' + i}
                    className={`__select__label ${'__' + type + '__select__label'}`}
                    onClick={onChange(elem)}
                >
                    {type === SORT
                        ? <div className={'__select__icon'}><Icon sort={elem as string} zoom={0.8}/></div>
                        : elem}
                </label>
            </React.Fragment> : null)}
        </div>
    </div>;
};