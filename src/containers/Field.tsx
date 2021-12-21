import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../actions';
import {Field as FieldComponent} from '../components/Field';
import {
    getWindowSizes,
    getCellSize,
    getMinCoord,
    getVisibleData,
    getSelectedCoord,
    getOtherValue,
    getTouchLocTarget
} from '../utils';
import {MIN_ZOOM, MAX_ZOOM, X_LEFT_MAX, Y_BOTTOM_MAX} from '../constants';

const Field: React.FC = () => {

    const {shiftKey: stateShiftKey, data: allData, currentFieldValue, windowSizes, currentPosition, numCol, numRow, mouseInMap, zoom, selectedCells} = useSelector((state: any) => state);
    const data = React.useMemo(() => {
        return allData && currentFieldValue ? allData[currentFieldValue] : [];
    }, [allData, currentFieldValue]);
    const {windowWidth, windowHeight} = windowSizes || {};
    const {currentAbscissa, currentOrdinate} = currentPosition || {};
    const {otherWidth, otherHeight} = getOtherValue(windowWidth, windowHeight);

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
    const x_left_min = getMinCoord(zoom, numCol, windowWidth, otherWidth);
    const y_bottom_min = getMinCoord(zoom, numRow, windowHeight, otherHeight);

    const visibleData = getVisibleData(data, zoom, currentAbscissa, currentOrdinate, windowWidth, windowHeight);

    const synchronizePosition = React.useCallback((newX: number, newY: number, zoom?: number) => {
        let locX = newX, locY = newY;
        const loc_x_left_min = zoom ? getMinCoord(zoom, numCol, windowWidth, otherWidth) : x_left_min;
        const loc_y_bottom_min = zoom ? getMinCoord(zoom, numRow, windowHeight, otherHeight) : y_bottom_min;

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
    }, [numCol, windowWidth, otherWidth, x_left_min, numRow, windowHeight, otherHeight, y_bottom_min, dispatch]);

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
            const locTarget = (target as HTMLElement).classList.contains('svg-cell') ? target : (target as HTMLElement).parentElement;
            const {x, y} = (locTarget as HTMLElement).dataset || {};
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

    const locCells = React.useRef([]);

    const handleDownMap = React.useCallback((event: MouseEvent | TouchEvent) => {
        let eventObj;
        let shiftKey = stateShiftKey;
        if (event && (event as TouchEvent).changedTouches) {
            const {changedTouches} = (event as TouchEvent);
            eventObj = changedTouches[0];
        } else {
            eventObj = (event as MouseEvent);
            shiftKey = eventObj.shiftKey;
        }
        const {clientX, clientY, target} = eventObj || {};

        let deltaX = 0;
        let deltaY = 0;
        let firstTarget = target;
        while (firstTarget && (firstTarget as HTMLElement).classList && !(firstTarget as HTMLElement).classList.contains('svg-cell')) {
            firstTarget = (firstTarget as HTMLElement).parentElement;
        }
        const {x: first_x, y: first_y} = (firstTarget as HTMLElement).dataset || {};

        const map = document.querySelector('.svg_field');
        let prevSelectedCells: string[] = [];

        const handleMooveMap = (event: MouseEvent | TouchEvent) => {
            map.classList.add('moved');
            let eventObj;
            if (event && (event as TouchEvent).changedTouches) {
                const {changedTouches} = (event as TouchEvent);
                eventObj = changedTouches[0];
            } else {
                eventObj = (event as MouseEvent);
            }
            const {pageX, pageY} = eventObj || {};
            deltaX = pageX - clientX;
            deltaY = - pageY + clientY;
            // dispatch(actions.changeCurrentPosition({
            //     currentAbscissa: currentAbscissa + deltaX,
            //     currentOrdinate: currentOrdinate + deltaY
            // }));
            // synchronizePosition(currentAbscissa + deltaX, currentOrdinate + deltaY);
            event.preventDefault();
        };

        const handleSelectMap = (event: MouseEvent | TouchEvent) => {
            let eventObj;
            let isTouch = false;
            if (event && (event as TouchEvent).changedTouches) {
                const {changedTouches} = (event as TouchEvent);
                eventObj = changedTouches[0];
                isTouch = true;
            } else {
                eventObj = (event as MouseEvent);
            }
            const {target, pageX, pageY} = eventObj || {};

            if (!(target as HTMLElement).classList.contains('svg_field')) {
                locCells.current = [];
                let locTarget = target;
                while (!(locTarget as HTMLElement).classList.contains('svg-cell')) {
                    locTarget = (locTarget as HTMLElement).parentElement;
                }
                if (isTouch) {
                    locTarget = getTouchLocTarget(first_x, first_y, pageX - clientX, - pageY + clientY, cell_size, numCol, numRow);
                }
                const {x, y} = (locTarget as HTMLElement).dataset || {};
                const {min_x, max_x, min_y, max_y} = getSelectedCoord(first_x, first_y, x, y);

                for (let i=min_x; i<=max_x; i++) {
                    for (let j=min_y; j<=max_y; j++) {
                        const id = i+'/'+j;
                        if (!locCells.current.includes(id)) {
                            locCells.current.push(id);
                            const element = document.querySelector(`.svg-cell[data-x="${i}"][data-y="${j}"]`);
                            (element as HTMLElement).classList.add('selected');
                        }
                    }
                }
                prevSelectedCells.forEach(elem => {
                    if (!locCells.current.includes(elem)) {
                        const [x, y] = elem.split('/');
                        const element = document.querySelector(`.svg-cell[data-x="${x}"][data-y="${y}"]`);
                        (element as HTMLElement).classList.remove('selected');
                    }
                });
                prevSelectedCells = locCells.current;
            }
            event.preventDefault();
        };

        let isDispatched = false;

        if (!shiftKey) {
            map.addEventListener('mousemove', handleMooveMap, false);
            map.addEventListener('touchmove', handleMooveMap, false);
        } else {
            map.addEventListener('mousemove', handleSelectMap, false);
            map.addEventListener('touchmove', handleSelectMap, false);
        }

        const handleUpMap = () => {
            if (!shiftKey) {
                if (!isDispatched) {
                    map.classList.remove('moved');
                    dispatch(actions.changeCurrentPosition({
                        currentAbscissa: currentAbscissa + deltaX,
                        currentOrdinate: currentOrdinate + deltaY
                    }));
                    synchronizePosition(currentAbscissa + deltaX, currentOrdinate + deltaY);
                    isDispatched = true;
                }
                map.removeEventListener('mousemove', handleMooveMap, false);
                map.removeEventListener('touchmove', handleMooveMap, false);
            } else {
                if (locCells.current && (locCells.current.length > 0)) {
                    dispatch(actions.changeSelectedCells(locCells.current));
                    locCells.current = [];
                }
                map.removeEventListener('mousemove', handleSelectMap, false);
                map.removeEventListener('touchmove', handleSelectMap, false);
            }
        };

        document.addEventListener('mouseup', handleUpMap, false);
        document.addEventListener('touchend', handleUpMap, false);
    }, [stateShiftKey, currentAbscissa, currentOrdinate, cell_size, numCol, numRow, dispatch, synchronizePosition]);

    React.useEffect(() => {
        const map = document.querySelector('.svg_field');

        map.addEventListener('mousedown', handleDownMap, false);
        map.addEventListener('touchstart', handleDownMap, false);
        map.addEventListener('dragstart', () => false, false);

        return () => {
            map.removeEventListener('mousedown', handleDownMap, false);
            map.removeEventListener('touchstart', handleDownMap, false);
        };
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
        data={visibleData}
        selectedCells={selectedCells}
        zoom={zoom}
        handleClickCell={handleClickCell}
        increaseZoom={increaseZoom}
        decreaseZoom={decreaseZoom}
    />;
};

export default Field;