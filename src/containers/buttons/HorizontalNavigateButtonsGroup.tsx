import * as React from 'react';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import * as actions from '../../actions';
import {ButtonsGroup} from '../../components/buttons/ButtonsGroup';
import '../../assets/less/buttons.less';
import {OTHER_WIDTH, X_LEFT_MAX} from '../../constants';
import {getCellSize, getMinKoord} from '../../utils';

const HorizontalNavigateButtonGroup:React.FC = () => {
    const {windowSizes, currentPosition, numCol, zoom, isNeedClickRight, isNeedClickLeft} = useSelector((state: any) => state, shallowEqual);
    const {windowWidth} = windowSizes || {};
    const {currentAbscissa, currentOrdinate} = currentPosition || {};
    const cell_size = getCellSize(zoom);
    const x_left_min = getMinKoord(zoom, numCol, windowWidth, OTHER_WIDTH);

    const dispatch = useDispatch();

    const handleClickLeft = React.useCallback(() => {
        const newPosition = currentAbscissa + Math.ceil((windowWidth - OTHER_WIDTH) * 0.7);
        dispatch(actions.changeCurrentPosition({currentAbscissa: newPosition > X_LEFT_MAX ? X_LEFT_MAX : newPosition, currentOrdinate}));
    }, [currentAbscissa, windowWidth, dispatch, currentOrdinate]);

    const handleClickRight = React.useCallback(() => {
        const newPosition = currentAbscissa - Math.ceil((windowWidth - OTHER_WIDTH) * 0.7);
        dispatch(actions.changeCurrentPosition({currentAbscissa: newPosition < x_left_min ? x_left_min : newPosition, currentOrdinate}));
    }, [currentAbscissa, windowWidth, dispatch, x_left_min, currentOrdinate]);

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
        firstButtonClassName={'navigate_button horizontal_button horizontal_button__left'}
        firstButtonDisable={currentAbscissa === X_LEFT_MAX}
        handleClickFirstButton={handleClickLeft}
        firstButtonLabel={<span>&#11013;</span>}
        secondButtonClassName={'navigate_button horizontal_button horizontal_button__right'}
        secondButtonDisable={currentAbscissa === x_left_min}
        handleClickSecondButton={handleClickRight}
        secondButtonLabel={<span>&#11013;</span>}
    />;
};

export default HorizontalNavigateButtonGroup;