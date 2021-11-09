import * as React from 'react';
import {useDispatch} from 'react-redux';
import * as actions from '../actions';
import {SortLine as SortLineComponent} from '../components/SortLine';

type Props = {
    id: string;
    label: string
    color?: string
    length?: number
}

const SortLine: React.FC<Props> = (props) => {
    const {id, label, color, length} = props;
    const dispatch = useDispatch();

    const handleChangeSortLabel = React.useCallback((event: any) => {
        dispatch(actions.changeGuideLabel(id, event.target.value));
    }, [dispatch, id]);

    const handleClickAddButton = React.useCallback(() => {
        dispatch(actions.addNewGuide({id: 'star_' + Number(length+1), label: '', type: 'other'}));
    }, [dispatch, length]);

    const handleClickRemoveButton = React.useCallback((id: string) => () => {
        dispatch(actions.removeGuide(id));
    }, [dispatch]);

    return <SortLineComponent
        id={id}
        label={label}
        color={color}
        length={length}
        handleChangeSortLabel={handleChangeSortLabel}
        handleClickAddButton={handleClickAddButton}
        handleClickRemoveButton={handleClickRemoveButton}
    />;
};

export default SortLine;