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
import CurrentCell from '../containers/CurrentCell';
import {Report} from './Report';
import Guide from '../containers/Guide';
import {Preloader} from './Preloader';
import '../assets/less/index.less';
import {MAP, REPORT} from '../constants';

type Props = {
    showMap: boolean
    handleChangeShowMap: () => void
}

export const App: React.FC<Props> = (props) => {

    const {showMap, handleChangeShowMap} = props;

    return <div className={'app_workspase'}>
        <Header
            title={`${showMap ? 'Схема посадки' : 'Отчет о посадке'} саженцев винограда`}
            buttonType={showMap ? MAP : REPORT}
            handleChangeShowMap={handleChangeShowMap}
        />
        {showMap ? <div className={'view_field'}>
            <Field />
            <RowLabels />
            <VerticalNavigateButtonGroup />
            <HorizontalNavigateButtonGroup />
            <AddLeftRowButton />
            <AddRightRowButton />
            <SaveButton/>
            <DeselectButton />
            <CurrentCell />
        </div> : <Report/>}
        <Guide />
        <Preloader />
        <ModalWindow />
    </div>;
};