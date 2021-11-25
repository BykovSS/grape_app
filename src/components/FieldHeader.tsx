import * as React from 'react';
import '../assets/less/header.less';

type Props = {
    title: string
    showText: boolean
    handleChangeShowText: () => void
    handleChangeFieldLabel: (event: any) => void
    handleClickApply: () => void
}

export const FieldHeader:React.FC<Props> = (props) => {
    const {title, showText, handleChangeShowText, handleChangeFieldLabel, handleClickApply} = props;

    return <div className={'field_header-wrap'}>
        {showText
            ? <h2 className={'field_header__test'} onClick={handleChangeShowText}>{title}</h2>
            : <div className={'field_header__input-wrap'}>
                <input type={'text'} value={title} onChange={handleChangeFieldLabel}/>
                <button onClick={handleClickApply}>OK</button>
            </div>
        }
    </div>;
};