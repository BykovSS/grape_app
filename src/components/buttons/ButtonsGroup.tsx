import * as React from 'react';
import '../../assets/less/buttons.less';

type Props = {
    className: string
    firstButtonClassName: string
    firstButtonDisable: boolean
    handleClickFirstButton: () => void
    firstButtonLabel: string | JSX.Element
    secondButtonClassName: string
    secondButtonDisable: boolean
    handleClickSecondButton: () => void
    secondButtonLabel: string | JSX.Element
}

export const ButtonsGroup: React.FC<Props> = (props) => {
    const {className, firstButtonClassName, firstButtonDisable, handleClickFirstButton, firstButtonLabel, secondButtonClassName,
        secondButtonDisable, handleClickSecondButton, secondButtonLabel} = props;

    return <div className={className}>
        <button
            className={firstButtonClassName}
            disabled={firstButtonDisable}
            onClick={handleClickFirstButton}
        >{firstButtonLabel}</button>
        <button
            className={secondButtonClassName}
            disabled={secondButtonDisable}
            onClick={handleClickSecondButton}
        >{secondButtonLabel}</button>
    </div>;
};