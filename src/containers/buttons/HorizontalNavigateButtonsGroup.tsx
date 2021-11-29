import * as React from 'react';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import * as actions from '../../actions';
import {ButtonsGroup} from '../../components/buttons/ButtonsGroup';
import {Arrow} from '../../components/icons/Arrow';
import '../../assets/less/buttons.less';
import {OTHER_WIDTH, X_LEFT_MAX} from '../../constants';
import {getCellSize, getMinCoord} from '../../utils';
import {DbArrow} from '../../components/icons/DbArrow';

const HorizontalNavigateButtonGroup:React.FC = () => {
    const {windowSizes, currentPosition, numCol, mostRight, zoom, isNeedClickRight, isNeedClickLeft} = useSelector((state: any) => state, shallowEqual);
    const {windowWidth} = windowSizes || {};
    const {currentAbscissa, currentOrdinate} = currentPosition || {};
    const cell_size = getCellSize(zoom);
    const x_left_min = getMinCoord(zoom, numCol, windowWidth, OTHER_WIDTH);

    const dispatch = useDispatch();

    const handleClickMostLeft = React.useCallback(() => {
        dispatch(actions.changeCurrentPosition({currentAbscissa: 0, currentOrdinate}));
    }, [dispatch, currentOrdinate]);

    const handleClickLeft = React.useCallback(() => {
        const newPosition = currentAbscissa + Math.ceil((windowWidth - OTHER_WIDTH) * 0.7);
        dispatch(actions.changeCurrentPosition({currentAbscissa: newPosition > X_LEFT_MAX ? X_LEFT_MAX : newPosition, currentOrdinate}));
    }, [currentAbscissa, windowWidth, dispatch, currentOrdinate]);

    const handleClickRight = React.useCallback(() => {
        const newPosition = currentAbscissa - Math.ceil((windowWidth - OTHER_WIDTH) * 0.7);
        dispatch(actions.changeCurrentPosition({currentAbscissa: newPosition < x_left_min ? x_left_min : newPosition, currentOrdinate}));
    }, [currentAbscissa, windowWidth, dispatch, x_left_min, currentOrdinate]);

    const handleClickMostRight = React.useCallback(() => {
        const newPosition = windowWidth - OTHER_WIDTH - mostRight * cell_size;
        dispatch(actions.changeCurrentPosition({currentAbscissa: newPosition > X_LEFT_MAX ? X_LEFT_MAX : newPosition, currentOrdinate}));
    }, [windowWidth, mostRight, cell_size, dispatch, currentOrdinate]);

    React.useEffect(() => {
        if (isNeedClickLeft && currentAbscissa + cell_size === X_LEFT_MAX) {
            handleClickLeft();
            dispatch(actions.disableNeedClicks());
        }
    }, [isNeedClickLeft, currentAbscissa, cell_size, handleClickLeft, dispatch]);

    React.useEffect(() => {
        if (isNeedClickRight && currentAbscissa - cell_size === x_left_min) {
            handleClickRight();
            dispatch(actions.disableNeedClicks());
        }
    }, [isNeedClickRight, currentAbscissa, cell_size, x_left_min, handleClickRight, dispatch]);

    return <ButtonsGroup
        className={'navigate_buttons horizontal_buttons'}
        isButton_01
        Button_01_ClassName={'navigate_button horizontal_button horizontal_button__left'}
        Button_01_Disable={currentAbscissa === X_LEFT_MAX}
        handleClickButton_01={handleClickMostLeft}
        Button_01_Label={<DbArrow rotate={180} />}
        Button_02_ClassName={'navigate_button horizontal_button horizontal_button__left'}
        Button_02_Disable={currentAbscissa === X_LEFT_MAX}
        handleClickButton_02={handleClickLeft}
        Button_02_Label={<Arrow rotate={180}/>}
        Button_03_ClassName={'navigate_button horizontal_button horizontal_button__right'}
        Button_03_Disable={currentAbscissa === x_left_min}
        handleClickButton_03={handleClickRight}
        Button_03_Label={<Arrow />}
        isButton_04
        Button_04_ClassName={'navigate_button horizontal_button horizontal_button__most_right'}
        Button_04_Disable={currentAbscissa === x_left_min}
        handleClickButton_04={handleClickMostRight}
        Button_04_Label={<DbArrow />}
    />;
};

export default HorizontalNavigateButtonGroup;