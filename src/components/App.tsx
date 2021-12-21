import * as React from 'react';
import {Header} from './Header';
import ModalWindow from '../containers/ModalWindow';
import FieldHeader from '../containers/FieldHeader';
import Field from '../containers/Field';
import RowLabels from '../containers/RowLabels';
import ColLabels from '../containers/ColLabels';
import VerticalNavigateButtonGroup from '../containers/buttons/VerticalNavigateButtonGroup';
import HorizontalNavigateButtonGroup from '../containers/buttons/HorizontalNavigateButtonsGroup';
import AddLeftRowButton from '../containers/buttons/AddLeftRowButton';
import AddRightRowButton from '../containers/buttons/AddRightRowButton';
import SaveButton from '../containers/buttons/SaveButton';
import ShiftButton from '../containers/buttons/ShiftButton';
import DeselectButton from '../containers/buttons/DeselectButton';
import CurrentCell from '../containers/CurrentCell';
import Report from '../containers/Report';
import Guide from '../containers/Guide';
import {Preloader} from './Preloader';
import '../assets/less/index.less';
import {MAP, REPORT} from '../constants';
import AddAndRemoveButtonGroup from '../containers/buttons/AddAndRemoveFieldButtonsGroup';

type Props = {
    showMap: boolean
    windowHeight: number
    otherHeight: number
    handleChangeShowMap: () => void
}

export const App: React.FC<Props> = (props) => {

    const {showMap, windowHeight, otherHeight, handleChangeShowMap} = props;

    return <div className={'app_workspase'}>
        <Header
            title={`${showMap ? 'Схема посадки' : 'Отчет о посадке'} саженцев винограда`}
            buttonType={showMap ? MAP : REPORT}
            handleChangeShowMap={handleChangeShowMap}
        />
        {showMap ? <div style={{height: String(windowHeight - otherHeight) + 'px'}} className={'view_field'}>
            <FieldHeader />
            <AddAndRemoveButtonGroup />
            <Field />
            <RowLabels />
            <ColLabels />
            <VerticalNavigateButtonGroup />
            <ShiftButton />
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