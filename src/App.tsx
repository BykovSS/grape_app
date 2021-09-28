import * as React from 'react';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import * as actions from './actions';
import {getSizes, getRowsData, getCellSize, getMinKoord} from './utils';
import {MIN_ZOOM, MAX_ZOOM} from './constants';
import './assets/less/index.less';
import {dataType} from './types';

const App: React.FC = () => {

    const [sizes, changeSizes] = React.useState<{ width: number, height: number }>(getSizes());
    const [fieldPosition, changeFieldPosition] = React.useState<{ width: number, height: number }>({width: 0, height: 0});
    const [mouseInMap, changeMouseInMap] = React.useState<boolean>(false);
    const [isVisibleWarning, changeVisibleWarning] = React.useState<boolean>(false);
    const [selectedCells, changeSelectedCells] = React.useState<string[]>([]);

    const otherHeight = 153;
    const otherWidth = 292;

    const handleChangeSizes = React.useCallback(() => {
        changeSizes(getSizes());
    }, []);

    React.useEffect(() => {
        window.addEventListener('resize', handleChangeSizes, false);

        return () => window.removeEventListener('resize', handleChangeSizes, false);
    }, [handleChangeSizes]);

    const handlerMouseMoove = React.useCallback((event: MouseEvent) => {
        if (event.type === 'mouseenter') {
            changeMouseInMap(true);
        } else if (event.type === 'mouseleave') {
            changeMouseInMap(false);
        }
    }, []);

    React.useEffect(() => {
        const map = document.querySelector('.svg_field');

        map.addEventListener('mouseenter', handlerMouseMoove, false);
        map.addEventListener('mouseleave', handlerMouseMoove, false);

        return () => {
            map.removeEventListener('mouseenter', handlerMouseMoove, false);
            map.removeEventListener('mouseleave', handlerMouseMoove, false);
        };

    }, [handlerMouseMoove]);

    const {data, zoom, isNeedClickRight, isNeedClickLeft} = useSelector((state: any) => state, shallowEqual);
    const numCol = data.reduce((result: number, item: dataType) => item.col > result ? item.col : result, 0);
    const numRow = data.reduce((result: number, item: dataType) => item.row > result ? item.row : result, 0);
    const rowsData = getRowsData(data);

    const cell_size = getCellSize(zoom);
    const x_left_min = getMinKoord(zoom, numCol, sizes.width, otherWidth);
    const x_left_max = 0;
    const y_bottom_min = getMinKoord(zoom, numRow, sizes.height, otherHeight);
    const y_bottom_max = 0;

    const synchronizePosition = React.useCallback((newX: number, newY: number, zoom?: number) => {
        let locX = newX, locY = newY;
        const loc_x_left_min = zoom ? getMinKoord(zoom, numCol, sizes.width, otherWidth) : x_left_min;
        const loc_y_bottom_min = zoom ? getMinKoord(zoom, numRow, sizes.height, otherHeight) : y_bottom_min;

        if (newX < loc_x_left_min) {
            locX = loc_x_left_min;
        } else if (newX > x_left_max) {
            locX = x_left_max;
        }
        if (newY < loc_y_bottom_min) {
            locY = loc_y_bottom_min;
        } else if (newY > y_bottom_max) {
            locY = y_bottom_max;
        }
        if (locX !== newX || locY !== newY) {
            changeFieldPosition({width: locX, height: locY});
        }
    }, [numCol, sizes.width, otherWidth, x_left_min, numRow, sizes.height, otherHeight, y_bottom_min, x_left_max, y_bottom_max]);

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(actions.fetchData());
    }, [dispatch]);

    const increaseZoom = React.useCallback(() => {
        dispatch(actions.changeZoom(zoom < MAX_ZOOM ? zoom + 0.25 : zoom));
    }, [dispatch, zoom]);

    const decreaseZoom = React.useCallback(() => {
        const locZoom = zoom > MIN_ZOOM ? zoom - 0.25 : zoom;
        dispatch(actions.changeZoom(locZoom));
        synchronizePosition(fieldPosition.width, fieldPosition.height, locZoom);
    }, [dispatch, zoom, synchronizePosition, fieldPosition.width, fieldPosition.height]);

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

    const handleClickLeft = React.useCallback(() => {
        const newPosition = fieldPosition.width + Math.ceil((sizes.width - otherWidth) * 0.7);
        changeFieldPosition({width: newPosition > x_left_max ? x_left_max : newPosition, height: fieldPosition.height});
    }, [fieldPosition.width, sizes.width, otherWidth, x_left_max, fieldPosition.height]);

    const handleClickRight = React.useCallback(() => {
        const newPosition = fieldPosition.width - Math.ceil((sizes.width - otherWidth) * 0.7);
        changeFieldPosition({width: newPosition < x_left_min ? x_left_min : newPosition, height: fieldPosition.height});
    }, [fieldPosition.width, sizes.width, otherWidth, x_left_min, fieldPosition.height]);

    const handleClickBottom = React.useCallback(() => {
        const newPosition = fieldPosition.height + Math.ceil((sizes.height - otherHeight) * 0.7);
        changeFieldPosition({width: fieldPosition.width, height: newPosition > y_bottom_max ? y_bottom_max : newPosition});
    }, [fieldPosition.height, sizes.height, otherHeight, fieldPosition.width, y_bottom_max]);

    const handleClickTop = React.useCallback(() => {
        const newPosition = fieldPosition.height - Math.ceil((sizes.height - otherHeight) * 0.7);
        changeFieldPosition({width: fieldPosition.width, height: newPosition < y_bottom_min ? y_bottom_min : newPosition});
    }, [fieldPosition.height, sizes.height, otherHeight, fieldPosition.width, y_bottom_min]);

    const handleAddRightRow = React.useCallback(() => {
        dispatch(actions.addRightRow());
    }, [dispatch]);

    const handleAddLeftRow = React.useCallback(() => {
        changeVisibleWarning(true);
    }, []);

    const handleCancelAddLeftRow = React.useCallback(() => {
        changeVisibleWarning(false);
    }, []);

    const handleConfirmAddLeftRow = React.useCallback(() => {
        dispatch(actions.addLeftRow());
        changeVisibleWarning(false);
    }, [dispatch]);

    React.useEffect(() => {
        if (isNeedClickRight && fieldPosition.width - cell_size === x_left_min) {
            handleClickRight();
            dispatch(actions.disableNeedClicks());
        }
    }, [isNeedClickRight, fieldPosition.width, cell_size, x_left_min, handleClickRight, dispatch]);

    React.useEffect(() => {
        if (isNeedClickLeft && fieldPosition.width + cell_size === x_left_max) {
            handleClickLeft();
            dispatch(actions.disableNeedClicks());
        }
    }, [isNeedClickLeft, fieldPosition.width, cell_size, handleClickLeft, dispatch]);

    const handleClickCell = React.useCallback((id: string) => () => {
        if (selectedCells.includes(id)) {
            changeSelectedCells(selectedCells.filter(item => item !== id));
        } else {
            changeSelectedCells([...selectedCells, id]);
        }
    }, [selectedCells]);

    return <div className={'app_workspase'}>
        <h1 className={'main_header'}>Grape App</h1>
        <div className={'view_field'}>
            <div className={'svg_field'}>
                <div
                    className={'svg-cells-wrap'}
                    style={{
                        width: numCol * cell_size,
                        height: numRow * cell_size,
                        bottom: fieldPosition.height,
                        left: fieldPosition.width
                }}>
                    {data ? data.map((item: dataType, i: number) => <div
                        key={i}
                        className={`svg-cell ${selectedCells.includes(item.id) ? 'selected' : ''}`}
                        style={{
                            width: cell_size,
                            height: cell_size,
                            left: (item.col - 1) * cell_size,
                            bottom: (item.row - 1) * cell_size,
                            fontSize: `${11*zoom}px`,
                            borderRight: item.col === numCol ? 'none' : '1px solid #aaa',
                            borderTop: item.row === numRow ? 'none' : '1px solid #aaa',
                        }}
                        onClick={handleClickCell(item.id)}
                    >{item.id}</div>) : null}
                </div>
                <div className={'zoom_buttons'}>
                    <button
                        className={'zoom_button zoom_button__inc'}
                        disabled={zoom === MAX_ZOOM}
                        onClick={increaseZoom}
                    >+</button>
                    <button
                        className={'zoom_button zoom_button__dec'}
                        disabled={zoom === MIN_ZOOM}
                        onClick={decreaseZoom}
                    >-</button>
                </div>
            </div>
            <div className={'row_labels_field'} style={{height: 25*zoom}}>
                <div
                    className={'svg-row-labels'}
                    style={{
                        width: numCol * cell_size,
                        bottom: 0,
                        left: fieldPosition.width
                    }}
                >
                    {rowsData ? (rowsData as {id: number, width: number}[]).map((item, i: number) => <div
                        key={i}
                        className={'svg-row-label'}
                        style={{
                            width: cell_size,
                            left: (item.id - 1) * cell_size,
                            fontSize: `${11*zoom}px`,
                            borderRight: item.id === numCol ? 'none' : '1px solid purple',
                        }}
                    >{item.id}</div>) : null}
                </div>
            </div>
            <div className={'navigate_buttons vertical_buttons'}>
                <button
                    className={'navigate_button vertical_button vertical_button__top'}
                    onClick={handleClickTop}
                    disabled={fieldPosition.height === y_bottom_min}
                >&#11014;</button>
                <button
                    className={'navigate_button vertical_button vertical_button__bottom'}
                    onClick={handleClickBottom}
                    disabled={fieldPosition.height === y_bottom_max}
                >&#11015;</button>
            </div>
            <div className={'navigate_buttons horizontal_buttons'}>
                <button
                    className={'navigate_button horizontal_button horizontal_button__left'}
                    onClick={handleClickLeft}
                    disabled={fieldPosition.width === x_left_max}
                >&#11013;</button>
                <button
                    className={'navigate_button horizontal_button horizontal_button__right'}
                    onClick={handleClickRight}
                    disabled={fieldPosition.width === x_left_min}
                >&#11013;</button>
            </div>
            <button
                className={'add_button add_button__left'}
                onClick={handleAddLeftRow}
            >Добавить ряд слева</button>
            <button
                className={'add_button add_button__right'}
                onClick={handleAddRightRow}
            >Добавить ряд справа</button>
        </div>
        {isVisibleWarning ? <div className={'warning_window-wrap'}>
            <div className={'warning_window'}>
                <div className={'warning_window-title'}>{'Подтвердите добавление рядов слева'}</div>
                <div className={'warning_window-description'}>
                    <span>{'Добавление рядов слева повлечет за собой изменение нумерации.'}</span>
                    <span>{'Вы действительно хотите добавить ряд?'}</span>
                </div>
                <div className={'warning_window-buttons'}>
                    <button
                        className={'warning_window-button'}
                        onClick={handleCancelAddLeftRow}
                    >Отмена</button>
                    <button
                        className={'warning_window-button'}
                        onClick={handleConfirmAddLeftRow}
                    >Подтверждаю</button>
                </div>
            </div>
        </div> : null}
    </div>;
};

export default App;