import * as React from 'react';
import ToLeftFieldButton from '../containers/buttons/ToLeftFieldButton';
import ToRightFieldButton from '../containers/buttons/ToRightFieldButton';
import '../assets/less/header.less';

type Props = {
    title: string
    showText: boolean
    inReport?: boolean
    handleChangeShowText: () => void
    handleChangeFieldLabel: (event: any) => void
    handleClickApply: () => void
}

export const FieldHeader:React.FC<Props> = (props) => {
    const {title, showText, inReport, handleChangeShowText, handleChangeFieldLabel, handleClickApply} = props;

    return <div className={`field_header-wrap${inReport ? ' report_header' : ''}`}>
        <ToLeftFieldButton/>
        {showText
            ? <h2 className={'field_header__test'} onClick={handleChangeShowText}>{title}</h2>
            : <div className={'field_header__input-wrap'}>
                <input type={'text'} value={title} onChange={handleChangeFieldLabel}/>
                <button onClick={handleClickApply}>OK</button>
            </div>
        }
        <ToRightFieldButton/>
    </div>;
};