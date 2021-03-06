import * as React from 'react';
import '../assets/less/modal.less';

type Props = {
    visible: boolean
    title: string
    description: string
    needConfirm: boolean
    handleClickConfirm: () => void
    handleCloseModalWindow: () => void
}

export const ModalWindow:React.FC<Props> = (props) => {
    const {visible, title, description, needConfirm, handleClickConfirm, handleCloseModalWindow} = props;
    const descriptionArr = description ? description.split(';') : [];

    return visible ? <div className={'modal_window-wrap'}>
        <div className={'modal_window'}>
            <div className={'modal_window-title'}>{title}</div>
            <div className={'modal_window-description'}>
                {descriptionArr.map((elem, i) => <span key={i}>{elem}</span>)}
            </div>
            <div className={'modal_window-buttons'}>
                {needConfirm && <button
					className={'modal_window-button'}
					onClick={handleClickConfirm}
				>Удалить</button>}
                <button
                    className={'modal_window-button'}
                    onClick={handleCloseModalWindow}
                >{needConfirm ? 'Отмена' : 'ОК'}</button>
            </div>
        </div>
    </div> : null;
};