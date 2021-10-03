import * as React from 'react';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import * as actions from '../../actions';
import {ButtonsGroup} from '../../components/buttons/ButtonsGroup';
import '../../assets/less/buttons.less';
import {OTHER_HEIGHT, Y_BOTTOM_MAX} from '../../constants';
import {getMinCoord} from '../../utils';

const VerticalNavigateButtonGroup:React.FC = () => {
    const {windowSizes, currentPosition, numRow, zoom} = useSelector((state: any) => state, shallowEqual);
    const {windowHeight} = windowSizes || {};
    const {currentAbscissa, currentOrdinate} = currentPosition || {};
    const y_bottom_min = getMinCoord(zoom, numRow, windowHeight, OTHER_HEIGHT);

    const dispatch = useDispatch();

    const handleClickTop = React.useCallback(() => {
        const newPosition = currentOrdinate - Math.ceil((windowHeight - OTHER_HEIGHT) * 0.7);
        dispatch(actions.changeCurrentPosition({currentAbscissa, currentOrdinate: newPosition < y_bottom_min ? y_bottom_min : newPosition}));
    }, [currentOrdinate, windowHeight, dispatch, currentAbscissa, y_bottom_min]);

    const handleClickBottom = React.useCallback(() => {
        const newPosition = currentOrdinate + Math.ceil((windowHeight - OTHER_HEIGHT) * 0.7);
        dispatch(actions.changeCurrentPosition({currentAbscissa, currentOrdinate: newPosition > Y_BOTTOM_MAX ? Y_BOTTOM_MAX : newPosition}));
    }, [currentOrdinate, windowHeight, dispatch, currentAbscissa]);

    return <ButtonsGroup
        className={'navigate_buttons vertical_buttons'}
        firstButtonClassName={'navigate_button vertical_button vertical_button__top'}
        firstButtonDisable={currentOrdinate === y_bottom_min}
        handleClickFirstButton={handleClickTop}
        firstButtonLabel={<span>&#11014;</span>}
        secondButtonClassName={'navigate_button vertical_button vertical_button__bottom'}
        secondButtonDisable={currentOrdinate === Y_BOTTOM_MAX}
        handleClickSecondButton={handleClickBottom}
        secondButtonLabel={<span>&#11015;</span>}
    />;
};

export default VerticalNavigateButtonGroup;