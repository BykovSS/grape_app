import * as React from 'react';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import * as actions from '../actions';
import {Field as FieldComponent} from '../components/Field';
import {getWindowSizes, getCellSize, getMinCoord, getVisibleData} from '../utils';
import {MIN_ZOOM, MAX_ZOOM, OTHER_WIDTH, OTHER_HEIGHT, X_LEFT_MAX, Y_BOTTOM_MAX} from '../constants';

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

    const handleMouseMoove = React.useCallback((event: MouseEvent) => {
        if (event.type === 'mouseenter') {
            dispatch(actions.changeMousePosition(true));
        } else if (event.type === 'mouseleave') {
            dispatch(actions.changeMousePosition(false));
        }
    }, [dispatch]);

    React.useEffect(() => {
        const map = document.querySelector('.svg_field');

        map.addEventListener('mouseenter', handleMouseMoove, false);
        map.addEventListener('mouseleave', handleMouseMoove, false);

        return () => {
            map.removeEventListener('mouseenter', handleMouseMoove, false);
            map.removeEventListener('mouseleave', handleMouseMoove, false);
        };

    }, [handleMouseMoove]);

    const cell_size = getCellSize(zoom);
    const x_left_min = getMinCoord(zoom, numCol, windowWidth, OTHER_WIDTH);
    const y_bottom_min = getMinCoord(zoom, numRow, windowHeight, OTHER_HEIGHT);

    const visibleData = getVisibleData(data, zoom, currentAbscissa, currentOrdinate, windowWidth, windowHeight);

    const synchronizePosition = React.useCallback((newX: number, newY: number, zoom?: number) => {
        let locX = newX, locY = newY;
        const loc_x_left_min = zoom ? getMinCoord(zoom, numCol, windowWidth, OTHER_WIDTH) : x_left_min;
        const loc_y_bottom_min = zoom ? getMinCoord(zoom, numRow, windowHeight, OTHER_HEIGHT) : y_bottom_min;

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

    const increaseZoom = React.useCallback((deltaLeft?: number, deltaBottom?: number) => {
        const locDeltaLeft = deltaLeft && typeof deltaLeft === 'number' ? deltaLeft : 0;
        const locDeltaBottom = deltaBottom && typeof deltaBottom === 'number' ? deltaBottom : 0;
        const locZoom = zoom < MAX_ZOOM ? zoom + 0.25 : zoom;
        dispatch(actions.changeZoom(locZoom));
        if (locDeltaLeft || locDeltaBottom) {
            dispatch(actions.changeCurrentPosition({currentAbscissa: currentAbscissa - locDeltaLeft, currentOrdinate: currentOrdinate - locDeltaBottom}));
        }
        synchronizePosition(currentAbscissa - locDeltaLeft, currentOrdinate - locDeltaBottom, locZoom);
    }, [dispatch, zoom, currentAbscissa, currentOrdinate, synchronizePosition]);

    const decreaseZoom = React.useCallback((deltaLeft?: number, deltaBottom?: number) => {
        const locDeltaLeft = deltaLeft && typeof deltaLeft === 'number' ? deltaLeft : 0;
        const locDeltaBottom = deltaBottom && typeof deltaBottom === 'number' ? deltaBottom : 0;
        const locZoom = zoom > MIN_ZOOM ? zoom - 0.25 : zoom;
        dispatch(actions.changeZoom(locZoom));
        if (locDeltaLeft || locDeltaBottom) {
            dispatch(actions.changeCurrentPosition({currentAbscissa: currentAbscissa + locDeltaLeft, currentOrdinate: currentOrdinate + locDeltaBottom}));
        }
        synchronizePosition(currentAbscissa + locDeltaLeft, currentOrdinate + locDeltaBottom, locZoom);
    }, [dispatch, zoom, synchronizePosition, currentAbscissa, currentOrdinate]);

    const handlerOnScrool = React.useCallback((event: WheelEvent) => {
        if (mouseInMap) {
            const {deltaY, target} = event || {};
            const {x, y} = (target as HTMLElement).dataset || {};
            if (deltaY < 0) {
                const locZoom = zoom < MAX_ZOOM ? zoom + 0.25 : zoom;
                const deltaZoom = (locZoom - zoom)/zoom;
                const deltaLeft = (x === '1' ? 0 : x === String(numCol) ? numCol : Number(x) - 1/2)*deltaZoom*cell_size;
                const deltaBottom = (y === '1' ? 0 : y === String(numRow) ? numRow : Number(y) - 1/2)*deltaZoom*cell_size;
                increaseZoom(deltaLeft, deltaBottom);
            } else if (deltaY > 0) {
                const locZoom = zoom > MIN_ZOOM ? zoom - 0.25 : zoom;
                const deltaZoom = (zoom - locZoom)/zoom;
                const deltaLeft = (Number(x) - 1/2)*deltaZoom*cell_size;
                const deltaBottom = (Number(y) - 1/2)*deltaZoom*cell_size;
                decreaseZoom(deltaLeft, deltaBottom);
            }
        }
    }, [mouseInMap, cell_size, zoom, numCol, numRow, increaseZoom, decreaseZoom]);

    React.useEffect(() => {
        window.addEventListener('wheel', handlerOnScrool, false);

        return () => window.removeEventListener('wheel', handlerOnScrool, false);
    });

    const isMooved = React.useRef(false);

    const handleMouseDownMap = React.useCallback((event: MouseEvent) => {
        const {clientX, clientY} = event || {};
        const map = document.querySelector('.svg_field');

        const handleMouseMooveMap = (event: MouseEvent) => {
            map.classList.add('moved');
            isMooved.current = true;
            const {pageX, pageY} = event || {};
            dispatch(actions.changeCurrentPosition({
                currentAbscissa: currentAbscissa + pageX - clientX,
                currentOrdinate: currentOrdinate - pageY + clientY
            }));
            synchronizePosition(currentAbscissa + pageX - clientX, currentOrdinate - pageY + clientY);
        };

        map.addEventListener('mousemove', handleMouseMooveMap, false);

        document.addEventListener('mouseup', () => {
            map.classList.remove('moved');
            map.removeEventListener('mousemove', handleMouseMooveMap, false);
        }, false);

    }, [currentAbscissa, currentOrdinate, dispatch, synchronizePosition]);

    React.useEffect(() => {
        const map = document.querySelector('.svg_field');

        map.addEventListener('mousedown', handleMouseDownMap, false);
        map.addEventListener('dragstart', () => false, false);

        return () => map.removeEventListener('mousedown', handleMouseDownMap, false);
    });

    const handleClickCell = React.useCallback((id: string) => () => {
        if (!isMooved.current) {
            if (selectedCells.includes(id)) {
                dispatch(actions.changeSelectedCells(selectedCells.filter((item: string) => item !== id)));
            } else {
                dispatch(actions.changeSelectedCells([...selectedCells, id]));
            }
        } else {
            isMooved.current = false;
        }
    }, [selectedCells, dispatch]);

    return <FieldComponent
        cell_size={cell_size}
        numCol={numCol}
        numRow={numRow}
        currentOrdinate={currentOrdinate}
        currentAbscissa={currentAbscissa}
        data={visibleData}
        selectedCells={selectedCells}
        zoom={zoom}
        handleClickCell={handleClickCell}
        increaseZoom={increaseZoom}
        decreaseZoom={decreaseZoom}
    />;
};

export default Field;