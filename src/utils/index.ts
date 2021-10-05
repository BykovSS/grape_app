import {dataType, RowDataType} from '../types';
import {CELL_SIZE, OTHER_HEIGHT, OTHER_WIDTH} from '../constants';

export const generateData = (x: number, y: number) => {
    const data = [] as dataType[];
    for (let j = 1; j <= y; j++) {
        for (let i = 1; i <= x; i++) {
            data.push({
                id: i + '/' + j,
                row: i,
                x: i,
                y: j,
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
    const result = [] as RowDataType[];
    data.forEach(elem => {
        if (!result.reduce((res, item) => res || item.x === elem.x, false)) {
            result.push({id: elem.row, row: elem.row, x: elem.x});
        }
    });

    return result;
};

export const getCellSize = (zoom: number) => zoom * CELL_SIZE;
export const getMinCoord = (zoom: number, numCol: number, sizesWidth: number, otherWidth: number) => -numCol * getCellSize(zoom) + (sizesWidth - otherWidth);
export const getNumCol = (data: dataType[]) => data ? data.reduce((result: number, item: dataType) => item.x > result ? item.x : result, 0) : 0;
export const getNumRow = (data: dataType[]) => data ? data.reduce((result: number, item: dataType) => item.y > result ? item.y : result, 0) : 0;

export const getVisibleData = (data: dataType[], zoom: number, currentAbscissa: number, currentOrdinate: number, windowWidth: number, windowHeight: number) => {
  const result = [] as dataType[];
  if (!data) {
      return data;
  }

  data.forEach(elem => {
      if (elem.x >= Math.abs(Math.floor(currentAbscissa/getCellSize(zoom)))
          && elem.x <= Math.abs(Math.floor((currentAbscissa - windowWidth + OTHER_WIDTH)/getCellSize(zoom)))
          && elem.y >= Math.abs(Math.floor(currentOrdinate/getCellSize(zoom)))
          && elem.y <= Math.abs(Math.floor((currentOrdinate - windowHeight + OTHER_HEIGHT)/getCellSize(zoom)))) {
          result.push(elem);
      }
  });

  return result;
};

export const addRightRow = (data: dataType[]) => {
    if (!data) {
        return data;
    }

    const width = data.reduce((result: number, item: dataType) => item.x > result ? item.x : result, 0);
    const height = data.reduce((result: number, item: dataType) => item.y > result ? item.y : result, 0);
    const newCol: dataType[] = [];
    for (let i = 1; i<= height; i++) {
        newCol.push({
            id: Number(width + 1) + '/' + i,
            row: width + 1,
            x: width + 1,
            y: i,
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

    const width = data.reduce((result: number, item: dataType) => item.x > result ? item.x : result, 0);
    const height = data.reduce((result: number, item: dataType) => item.row > result ? item.row : result, 0);
    const newCol: dataType[] = [];
    for (let i = 1; i<= height; i++) {
        newCol.push({
            id: Number(width + 1) + '/' + i,
            row: width + 1,
            x: 1,
            y: i,
            sort: null,
            date: null
        });
    }
    const newData = data.map(elem => ({
        ...elem,
        x: Number(elem.x) + 1
    }));

    return [...newCol, ...newData];
};

export const getRowFromId = (id: string) => {
    const arr = id.split('/');

    return arr && arr.length > 0 ? arr[0] : '';
};