import * as React from 'react';
import {Header} from './Header';
import ModalWindow from '../containers/ModalWindow';
import Field from '../containers/Field';
import RowLabels from '../containers/RowLabels';
import VerticalNavigateButtonGroup from '../containers/buttons/VerticalNavigateButtonGroup';
import HorizontalNavigateButtonGroup from '../containers/buttons/HorizontalNavigateButtonsGroup';
import AddLeftRowButton from '../containers/buttons/AddLeftRowButton';
import AddRightRowButton from '../containers/buttons/AddRightRowButton';
import SaveButton from '../containers/buttons/SaveButton';
import DeselectButton from '../containers/buttons/DeselectButton';
import {Preloader} from './Preloader';
import '../assets/less/index.less';

export const App: React.FC = () => {

    return <div className={'app_workspase'}>
        <Header title={'Схема посадки саженцев винограда'}/>
        <div className={'view_field'}>
            <Field />
            <RowLabels />
            <VerticalNavigateButtonGroup />
            <HorizontalNavigateButtonGroup />
            <AddLeftRowButton />
            <AddRightRowButton />
            <SaveButton />
            <DeselectButton />
            <Preloader />
        </div>
        <ModalWindow />
    </div>;
};