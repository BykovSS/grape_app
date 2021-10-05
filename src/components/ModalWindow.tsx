import * as React from 'react';
import '../assets/less/modal.less';

type Props = {
    visible: boolean
    title: string
    description: string | JSX.Element
    handleCloseModalWindow: () => void
    handleConfirm?: () => void
}

export const ModalWindow:React.FC<Props> = (props) => {
    const {visible, title, description, handleCloseModalWindow/*, handleConfirm*/} = props;

    return visible && <div className={'modal_window-wrap'}>
        <div className={'modal_window'}>
            <div className={'modal_window-title'}>{title}</div>
            <div className={'modal_window-description'}>{description}</div>
            <div className={'modal_window-buttons'}>
                <button
                    className={'modal_window-button'}
                    onClick={handleCloseModalWindow}
                >ОК</button>
                {/*<button*/}
                {/*    className={'modal_window-button'}*/}
                {/*    onClick={handleConfirm}*/}
                {/*>Подтверждаю</button>*/}
            </div>
        </div>
    </div>;
};