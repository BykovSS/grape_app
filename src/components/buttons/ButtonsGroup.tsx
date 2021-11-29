import * as React from 'react';
import '../../assets/less/buttons.less';

type Props = {
    className: string
    isButton_01: boolean
    Button_01_ClassName?: string
    Button_01_Title?: string
    Button_01_Disable?: boolean
    handleClickButton_01?: () => void
    Button_01_Label?: string | JSX.Element
    Button_02_ClassName: string
    Button_02_Title?: string
    Button_02_Disable: boolean
    handleClickButton_02: () => void
    Button_02_Label: string | JSX.Element
    Button_03_ClassName: string
    Button_03_Title?: string
    Button_03_Disable: boolean
    handleClickButton_03: () => void
    Button_03_Label: string | JSX.Element
    isButton_04: boolean
    Button_04_ClassName?: string
    Button_04_Title?: string
    Button_04_Disable?: boolean
    handleClickButton_04?: () => void
    Button_04_Label?: string | JSX.Element
}

export const ButtonsGroup: React.FC<Props> = (props) => {
    const {className, isButton_01, Button_01_ClassName, Button_01_Title, Button_01_Disable, handleClickButton_01, Button_01_Label,
        Button_02_ClassName, Button_02_Title, Button_02_Disable, handleClickButton_02, Button_02_Label,
        Button_03_ClassName, Button_03_Title, Button_03_Disable, handleClickButton_03, Button_03_Label,
        isButton_04, Button_04_Title, Button_04_ClassName, Button_04_Disable, handleClickButton_04, Button_04_Label} = props;

    return <div className={className}>
        {isButton_01 && <button
            className={Button_01_ClassName}
			title={Button_01_Title}
            disabled={Button_01_Disable}
            onClick={handleClickButton_01}
        >{Button_01_Label}</button>}
        <button
            className={Button_02_ClassName}
            title={Button_02_Title}
            disabled={Button_02_Disable}
            onClick={handleClickButton_02}
        >{Button_02_Label}</button>
        <button
            className={Button_03_ClassName}
            title={Button_03_Title}
            disabled={Button_03_Disable}
            onClick={handleClickButton_03}
        >{Button_03_Label}</button>
        {isButton_04 && <button
			className={Button_04_ClassName}
			title={Button_04_Title}
			disabled={Button_04_Disable}
			onClick={handleClickButton_04}
		>{Button_04_Label}</button>}
    </div>;
};