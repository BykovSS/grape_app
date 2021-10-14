import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../actions';
import '../../assets/less/buttons.less';
import {dataType} from '../../types';
import {APPLY, CLEAR} from '../../constants';

type Props = {
    type: string
}

const ApplyClearButton:React.FC<Props> = (props) => {
    const {type} = props;

    const {data, currentCell, selectedCells} = useSelector((state: any) => state);
    const disabled = !selectedCells || selectedCells && selectedCells.length === 0;
    const {sort=null, year=null} = type === APPLY ? currentCell || {} : {};

    const dispatch = useDispatch();

    const handleClick = React.useCallback(() => {
        dispatch(actions.changeData(data.map((elem: dataType) => selectedCells.includes(elem.id) ? {...elem, sort, year} : elem)));
    }, [dispatch, data, selectedCells, sort, year]);

    return <button
        className={'apply-clear_button'}
        disabled={disabled}
        onClick={handleClick}
    >{type === APPLY ? 'Применить' : type === CLEAR ? 'Очистить' : ''}</button>;
};

export default ApplyClearButton;