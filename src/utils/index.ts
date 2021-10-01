import {dataType} from '../types';
import {CELL_SIZE} from '../constants';

export const generateData = (x: number, y: number) => {
    const data = [] as dataType[];
    for (let j = 1; j <= y; j++) {
        for (let i = 1; i <= x; i++) {
            data.push({
                id: i + '/' + j,
                active: false,
                col: i,
                row: j,
                sort: null,
                date: 1586523600000
            });
        }
    }

    return data;
};

export const getWindowSizes = () => {
  const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  return {windowWidth, windowHeight};
};

export const getRowsData = (data: dataType[]) => {
    if (!data) {
        return data;
    }
    const result = [] as {id: number}[];
    data.forEach(elem => {
        if (!result.reduce((res, item) => res || item.id === elem.col, false)) {
            result.push({id: elem.col});
        }
    });

    return result;
};

export const getCellSize = (zoom: number) => zoom * CELL_SIZE;
export const getMinKoord = (zoom: number, numCol: number, sizesWidth: number, otherWidth: number) => -numCol * getCellSize(zoom) + (sizesWidth - otherWidth);
export const getNumCol = (data: dataType[]) => data ? data.reduce((result: number, item: dataType) => item.col > result ? item.col : result, 0) : 0;
export const getNumRow = (data: dataType[]) => data ? data.reduce((result: number, item: dataType) => item.row > result ? item.row : result, 0) : 0;

export const addRightRow = (data: dataType[]) => {
    if (!data) {
        return data;
    }

    const width = data.reduce((result: number, item: dataType) => item.col > result ? item.col : result, 0);
    const height = data.reduce((result: number, item: dataType) => item.row > result ? item.row : result, 0);
    const newCol: dataType[] = [];
    for (let i = 1; i<= height; i++) {
        newCol.push({
            id: '[' + Number(width + 1) + '/' + i + ']',
            active: false,
            row: i,
            col: width + 1,
            sort: null,
            date: null
        });
    }

    return [...data, ...newCol];
};

export const addLeftRow = (data: dataType[]) => {
    if (!data) {
        return data;
    }

    const height = data.reduce((result: number, item: dataType) => item.row > result ? item.row : result, 0);
    const newCol: dataType[] = [];
    for (let i = 1; i<= height; i++) {
        newCol.push({
            id: '{1/' + i + '}',
            active: false,
            row: i,
            col: 1,
            sort: null,
            date: null
        });
    }
    const newData = data.map(elem => ({
        ...elem,
        id: elem.id.indexOf('[') !== -1
            ? '[' + Number(Number(elem.col) + 1) + '/' + elem.row + ']'
            : elem.id.indexOf('{') !== -1
                ? '{' + Number(Number(elem.col) + 1) + '/' + elem.row + '}'
                : Number(elem.col) + 1 + '/' + elem.row,
        col: Number(elem.col) + 1
    }));

    return [...newCol, ...newData];
};