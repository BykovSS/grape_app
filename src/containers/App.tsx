import * as React from 'react';
import {useDispatch} from 'react-redux';
import * as actions from '../actions';
import {Header} from '../components/Header';
import ModalWindow from './ModalWindow';
import Field from './Field';
import {RowLabels} from '../components/RowLabels';
import VerticalNavigateButtonGroup from './buttons/VerticalNavigateButtonGroup';
import HorizontalNavigateButtonGroup from './buttons/HorizontalNavigateButtonsGroup';
import AddLeftRowButton from './buttons/AddLeftRowButton';
import AddRightRowButton from './buttons/AddRightRowButton';
import '../assets/less/index.less';

const App: React.FC = () => {

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(actions.fetchData());
    }, [dispatch]);

    return <div className={'app_workspase'}>
        <Header title={'Схема посадки саженцев винограда'}/>
        <div className={'view_field'}>
            <Field />
            <RowLabels />
            <VerticalNavigateButtonGroup />
            <HorizontalNavigateButtonGroup />
            <AddLeftRowButton />
            <AddRightRowButton />
        </div>
        <ModalWindow />
    </div>;
};

export default App;