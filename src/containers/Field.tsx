import * as React from 'react';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import * as actions from '../actions';
import {Field as FieldComponent} from '../components/Field';
import {getWindowSizes, getCellSize, getMinKoord} from '../utils';
import {MIN_ZOOM, MAX_ZOOM, OTHER_WIDTH, OTHER_HEIGHT, X_LEFT_MAX, Y_BOTTOM_MAX} from '../constants';
import '../assets/less/index.less';

const Field: React.FC = () => {

    const {data, windowSizes, currentPosition, numCol, numRow, mouseInMap, zoom, selectedCells} = useSelector((state: any) => state, shallowEqual);
    const {windowWidth, windowHeight} = windowSizes || {};
    const {currentAbscissa, currentOrdinate} = currentPosition || {};

    const dispatch = useDispatch();

    const handleChangeSizes = React.useCallback(() => {
        dispatch(actions.changeWindowSizes(getWindowSizes()));
    }, [dispatch]);

    React.useEffect(() => {
        handleChangeSizes();
    }, [handleChangeSizes]);

    React.useEffect(() => {
        window.addEventListener('resize', handleChangeSizes, false);

        return () => window.removeEventListener('resize', handleChangeSizes, false);
    }, [handleChangeSizes]);

    const handlerMouseMoove = React.useCallback((event: MouseEvent) => {
        if (event.type === 'mouseenter') {
            dispatch(actions.changeMousePosition(true));
        } else if (event.type === 'mouseleave') {
            dispatch(actions.changeMousePosition(false));
        }
    }, [dispatch]);

    React.useEffect(() => {
        const map = document.querySelector('.svg_field');

        map.addEventListener('mouseenter', handlerMouseMoove, false);
        map.addEventListener('mouseleave', handlerMouseMoove, false);

        return () => {
            map.removeEventListener('mouseenter', handlerMouseMoove, false);
            map.removeEventListener('mouseleave', handlerMouseMoove, false);
        };

    }, [handlerMouseMoove]);

    const cell_size = getCellSize(zoom);
    const x_left_min = getMinKoord(zoom, numCol, windowWidth, OTHER_WIDTH);
    const y_bottom_min = getMinKoord(zoom, numRow, windowHeight, OTHER_HEIGHT);

    const synchronizePosition = React.useCallback((newX: number, newY: number, zoom?: number) => {
        let locX = newX, locY = newY;
        const loc_x_left_min = zoom ? getMinKoord(zoom, numCol, windowWidth, OTHER_WIDTH) : x_left_min;
        const loc_y_bottom_min = zoom ? getMinKoord(zoom, numRow, windowHeight, OTHER_HEIGHT) : y_bottom_min;

        if (newX < loc_x_left_min) {
            locX = loc_x_left_min;
        } else if (newX > X_LEFT_MAX) {
            locX = X_LEFT_MAX;
        }
        if (newY < loc_y_bottom_min) {
            locY = loc_y_bottom_min;
        } else if (newY > Y_BOTTOM_MAX) {
            locY = Y_BOTTOM_MAX;
        }
        if (locX !== newX || locY !== newY) {
            dispatch(actions.changeCurrentPosition({currentAbscissa: locX, currentOrdinate: locY}));
        }
    }, [numCol, windowWidth, x_left_min, numRow, windowHeight, y_bottom_min, dispatch]);

    const increaseZoom = React.useCallback(() => {
        dispatch(actions.changeZoom(zoom < MAX_ZOOM ? zoom + 0.25 : zoom));
    }, [dispatch, zoom]);

    const decreaseZoom = React.useCallback(() => {
        const locZoom = zoom > MIN_ZOOM ? zoom - 0.25 : zoom;
        dispatch(actions.changeZoom(locZoom));
        synchronizePosition(currentAbscissa, currentOrdinate, locZoom);
    }, [dispatch, zoom, synchronizePosition, currentAbscissa, currentOrdinate]);

    const handlerOnScrool = React.useCallback((event: WheelEvent) => {
        if (mouseInMap) {
            const {deltaY} = event || {};
            if (deltaY < 0) {
                increaseZoom();
            } else if (deltaY > 0) {
                decreaseZoom();
            }
        }
    }, [mouseInMap, increaseZoom, decreaseZoom]);

    React.useEffect(() => {
        window.addEventListener('wheel', handlerOnScrool, false);

        return () => window.removeEventListener('wheel', handlerOnScrool, false);
    });

    const handleClickCell = React.useCallback((id: string) => () => {
        if (selectedCells.includes(id)) {
            dispatch(actions.changeSelectedCells(selectedCells.filter((item: string) => item !== id)));
        } else {
            dispatch(actions.changeSelectedCells([...selectedCells, id]));
        }
    }, [selectedCells, dispatch]);

    return <FieldComponent
        cell_size={cell_size}
        numCol={numCol}
        numRow={numRow}
        currentOrdinate={currentOrdinate}
        currentAbscissa={currentAbscissa}
        data={data}
        selectedCells={selectedCells}
        zoom={zoom}
        handleClickCell={handleClickCell}
        increaseZoom={increaseZoom}
        decreaseZoom={decreaseZoom}
    />;
};

export default Field;