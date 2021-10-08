import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../actions';
import {convertDataToSave} from '../../utils';
import '../../assets/less/buttons.less';

type Props = {
    title: string
}

const SaveButton:React.FC<Props> = (props) => {
    const {title} = props;
    const {data, guide} = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const handleSave = React.useCallback(() => {
        dispatch(actions.saveData(JSON.stringify({data: convertDataToSave(data), guide})));
    }, [dispatch, data, guide]);

    return <button
        className={'save_button'}
        onClick={handleSave}
    >{title}</button>;
};

export default SaveButton;