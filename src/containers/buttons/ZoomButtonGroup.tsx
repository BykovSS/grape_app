import * as React from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import {ButtonsGroup} from '../../components/buttons/ButtonsGroup';
import '../../assets/less/buttons.less';
import {MAX_ZOOM, MIN_ZOOM} from '../../constants';

type Props = {
    increaseZoom: () => void
    decreaseZoom: () => void
}

const ZoomButtonGroup:React.FC<Props> = (props) => {
    const {increaseZoom, decreaseZoom} = props;
    const {zoom} = useSelector((state: any) => state, shallowEqual);

    return <ButtonsGroup
        className={'zoom_buttons'}
        isButton_01={false}
        Button_02_ClassName={'zoom_button zoom_button__inc'}
        Button_02_Title={'Увеличить'}
        Button_02_Disable={zoom === MAX_ZOOM}
        handleClickButton_02={increaseZoom}
        Button_02_Label={'+'}
        Button_03_ClassName={'zoom_button zoom_button__dec'}
        Button_03_Title={'Уменьшить'}
        Button_03_Disable={zoom === MIN_ZOOM}
        handleClickButton_03={decreaseZoom}
        Button_03_Label={'-'}
        isButton_04={false}
    />;
};

export default ZoomButtonGroup;