import * as React from 'react';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import * as actions from '../../actions';
import {ButtonsGroup} from '../../components/buttons/ButtonsGroup';
import '../../assets/less/buttons.less';
import {OTHER_HEIGHT, Y_BOTTOM_MAX} from '../../constants';
import {getCellSize, getMinCoord} from '../../utils';
import {Arrow} from '../../components/icons/Arrow';
import {DbArrow} from '../../components/icons/DbArrow';

const VerticalNavigateButtonGroup:React.FC = () => {
    const {windowSizes, currentPosition, numRow, mostTop, zoom} = useSelector((state: any) => state, shallowEqual);
    const {windowHeight} = windowSizes || {};
    const {currentAbscissa, currentOrdinate} = currentPosition || {};
    const cell_size = getCellSize(zoom);
    const y_bottom_min = getMinCoord(zoom, numRow, windowHeight, OTHER_HEIGHT);

    const dispatch = useDispatch();

    const handleClickMostTop = React.useCallback(() => {
        const newPosition = windowHeight - OTHER_HEIGHT - mostTop * cell_size;
        dispatch(actions.changeCurrentPosition({currentAbscissa, currentOrdinate: newPosition > Y_BOTTOM_MAX ? Y_BOTTOM_MAX : newPosition}));
    }, [windowHeight, mostTop, cell_size, dispatch, currentAbscissa]);

    const handleClickTop = React.useCallback(() => {
        const newPosition = currentOrdinate - Math.ceil((windowHeight - OTHER_HEIGHT) * 0.7);
        dispatch(actions.changeCurrentPosition({currentAbscissa, currentOrdinate: newPosition < y_bottom_min ? y_bottom_min : newPosition}));
    }, [currentOrdinate, windowHeight, dispatch, currentAbscissa, y_bottom_min]);

    const handleClickBottom = React.useCallback(() => {
        const newPosition = currentOrdinate + Math.ceil((windowHeight - OTHER_HEIGHT) * 0.7);
        dispatch(actions.changeCurrentPosition({currentAbscissa, currentOrdinate: newPosition > Y_BOTTOM_MAX ? Y_BOTTOM_MAX : newPosition}));
    }, [currentOrdinate, windowHeight, dispatch, currentAbscissa]);

    const handleClickMostBottom = React.useCallback(() => {
        dispatch(actions.changeCurrentPosition({currentAbscissa, currentOrdinate: 0}));
    }, [dispatch, currentAbscissa]);

    return <ButtonsGroup
        className={'navigate_buttons vertical_buttons'}
        isButton_01
        Button_01_ClassName={'navigate_button vertical_button vertical_button__most-top'}
        Button_01_Title={'До конца вверх'}
        Button_01_Disable={currentOrdinate === y_bottom_min}
        handleClickButton_01={handleClickMostTop}
        Button_01_Label={<DbArrow/>}
        Button_02_ClassName={'navigate_button vertical_button vertical_button__top'}
        Button_02_Title={'Вверх'}
        Button_02_Disable={currentOrdinate === y_bottom_min}
        handleClickButton_02={handleClickTop}
        Button_02_Label={<Arrow/>}
        Button_03_ClassName={'navigate_button vertical_button vertical_button__bottom'}
        Button_03_Title={'Вниз'}
        Button_03_Disable={currentOrdinate === Y_BOTTOM_MAX}
        handleClickButton_03={handleClickBottom}
        Button_03_Label={<Arrow/>}
        isButton_04
        Button_04_ClassName={'navigate_button vertical_button vertical_button__most-bottom'}
        Button_04_Title={'До конца вниз'}
        Button_04_Disable={currentOrdinate === Y_BOTTOM_MAX}
        handleClickButton_04={handleClickMostBottom}
        Button_04_Label={<DbArrow/>}
    />;
};

export default VerticalNavigateButtonGroup;