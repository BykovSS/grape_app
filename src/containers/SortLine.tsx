import * as React from 'react';
import {useDispatch} from 'react-redux';
import * as actions from '../actions';
import {SortLine as SortLineComponent} from '../components/SortLine';

type Props = {
    id: string;
    label: string
}

const SortLine: React.FC<Props> = (props) => {
    const {id, label} = props;
    const dispatch = useDispatch();

    const handleChangeSortLabel = React.useCallback((event: any) => {
        dispatch(actions.changeGuideLabel(id, event.target.value));
    }, [dispatch, id]);

    return <SortLineComponent
        id={id}
        label={label}
        handleChangeSortLabel={handleChangeSortLabel}
    />;
};

export default SortLine;