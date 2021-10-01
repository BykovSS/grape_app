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
        firstButtonClassName={'zoom_button zoom_button__inc'}
        firstButtonDisable={zoom === MAX_ZOOM}
        handleClickFirstButton={increaseZoom}
        firstButtonLabel={'+'}
        secondButtonClassName={'zoom_button zoom_button__dec'}
        secondButtonDisable={zoom === MIN_ZOOM}
        handleClickSecondButton={decreaseZoom}
        secondButtonLabel={'-'}
    />;
};

export default ZoomButtonGroup;