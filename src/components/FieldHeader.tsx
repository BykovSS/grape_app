import * as React from 'react';
import ToLeftFieldButton from '../containers/buttons/ToLeftFieldButton';
import ToRightFieldButton from '../containers/buttons/ToRightFieldButton';
import '../assets/less/header.less';

type Props = {
    title: string
    showText: boolean
    inReport?: boolean
    isGeneral?: boolean
    fieldCount?: number
    handleChangeShowText: () => void
    handleChangeFieldLabel: (event: any) => void
    handleClickApply: () => void
}

export const FieldHeader:React.FC<Props> = (props) => {
    const {title, showText, inReport, isGeneral, fieldCount, handleChangeShowText, handleChangeFieldLabel, handleClickApply} = props;
    const headerTitle = isGeneral ? 'Общий отчет по всем участкам (' + fieldCount + ' шт.)' : title;

    return <div className={`field_header-wrap${inReport ? ' report_header' : ''}`}>
        {!isGeneral ? <ToLeftFieldButton/> : null}
        {showText
            ? <h2 className={'field_header__test'} onClick={handleChangeShowText}>{headerTitle}</h2>
            : <div className={'field_header__input-wrap'}>
                <input type={'text'} value={title} onChange={handleChangeFieldLabel}/>
                <button onClick={handleClickApply}>OK</button>
            </div>
        }
        {!isGeneral ? <ToRightFieldButton/> : null}
    </div>;
};