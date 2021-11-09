import {dataType, GuideType, RowDataType} from '../types';
import {CELL_SIZE, KOEF, OTHER_HEIGHT, OTHER_WIDTH, START_YEAR} from '../constants';

// export const generateData = (x: number, y: number) => {
//     const data = [] as dataType[];
//     for (let j = 1; j <= y; j++) {
//         for (let i = 1; i <= x; i++) {
//             data.push({
//                 id: i + '/' + j,
//                 row: i,
//                 x: i,
//                 y: j,
//                 sort: null,
//                 year: null
//             });
//         }
//     }
//
//     return data;
// };
//
// export const generateGuide = () => [
//     {id: 'triangle', label: '', type: 'red'},
//     {id: 'square', label: '', type: 'red'},
//     {id: 'circle', label: '', type: 'red'},
//     {id: 'spades', label: '', type: 'white'},
//     {id: 'hearts', label: '', type: 'white'},
//     {id: 'clubs', label: '', type: 'white'},
//     {id: 'diamonds', label: '', type: 'white'},
//     {id: 'star_1', label: '', type: 'other'},
//     {id: 'ring', label: 'Свободное место', type: 'free'},
//     {id: 'hatching', label: 'Непригодно для посадки', type: 'hatching'},
// ];

export const convertDataToSave = (data: dataType[]) => {
    return data ? data.map(elem => elem.row + '$' + elem.x + '$' + elem.y + '$' + elem.sort + '$' + elem.year) : [];
};

export const parseDataFromFetch = (data: string[]) => {
    return data ? data.map(elem => {
        const [row, x, y, sort, year] = elem.split('$');

        return {id: x+'/'+y, row:Number(row), x:Number(x), y:Number(y), sort: sort === 'null' ? null : sort, year: Number(year)};
    }) : [];
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

export const getColsData = (data: dataType[]) => {
    if (!data) {
        return data;
    }
    const result = [] as RowDataType[];
    data.forEach(elem => {
        if (!result.reduce((res, item) => res || item.y === elem.y, false)) {
            result.push({id: elem.y, y: elem.y});
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

  const cell_size = getCellSize(zoom);

  data.forEach(elem => {
      if (elem.x >= Math.abs(Math.floor(currentAbscissa/cell_size)) - Math.floor(KOEF*(windowWidth - OTHER_WIDTH)/cell_size)
          && elem.x <= Math.abs(Math.floor((currentAbscissa - windowWidth + OTHER_WIDTH)/cell_size)) + Math.floor(KOEF*(windowWidth - OTHER_WIDTH)/cell_size)
          && elem.y >= Math.abs(Math.floor(currentOrdinate/cell_size)) - Math.floor(2*KOEF*(windowHeight - OTHER_HEIGHT)/cell_size)
          && elem.y <= Math.abs(Math.floor((currentOrdinate - windowHeight + OTHER_HEIGHT)/cell_size)) + Math.floor(2*KOEF*(windowHeight - OTHER_HEIGHT)/cell_size) ) {
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
            year: null
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
            year: null
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

export const getColFromId = (id: string) => {
    const arr = id.split('/');

    return arr && arr.length > 0 ? arr[1] : '';
};

export const throwError = (error?: string) => {
    throw new Error(error);
};

export const getStarIdAndNum = (sort: string) => {
    let locSort = sort;
    let starNum: string;

    if (sort && sort.startsWith('star_')) {
        [locSort, starNum] = sort.split('_');
    }

    return {locSort, starNum};
};

export const getYearsArrray = () => {
    const yearsArray = [0];
    const currentYear = (new Date()).getFullYear();
    for (let i=START_YEAR; i<= currentYear; i++) {
        yearsArray.push(i);
    }

    return yearsArray;
};

export const getAge = (year: number) => {
    if (typeof year !== 'number' || isNaN(year)) {
        return null;
    }
    const currentYear = (new Date()).getFullYear();
    const currentMonth = (new Date()).getMonth();

    return currentMonth > 3 ? currentYear - year : currentYear - year - 1;
};

export const getCellColor = (year: number) => {
    const age = getAge(year);
    if (age === null) return 'black';
    switch (age) {
        case -1:
        case 0: return 'green';
        case 1: return '#f5e42c';
        case 2: return 'blue';
        default: return 'red';
    }
};

export const getInitialTableData = (guide: GuideType[]): (GuideType & {a_1?: number, a_2?: number, a_3?: number, a_4?: number})[] => {
    if (!guide) {
        return guide;
    }

    return [...guide].map(elem => ({...elem, a_1: 0, a_2: 0, a_3: 0, a_4: 0}));
};

export const getErrorMessageByCode = (code: string) => {
    switch (code) {
        case 'auth/user-not-found': return 'Пользователь не найден!';
        case 'auth/invalid-email': return 'Введите корректный email!';
        case 'auth/user-disabled': return 'Пользователь заблокирован!';
        case 'auth/internal-error': return 'Не указан пароль!';
        case 'auth/wrong-password': return 'Указан неверный пароль!';
        default: return 'Неизвестная ошибка!';
    }
};