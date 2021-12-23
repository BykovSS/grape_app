import * as React from 'react';
import MapReportButton from '../containers/buttons/MapReportButton';
import UndoAndReturnUndoButtons from '../containers/buttons/UndoAndReturnUndoButtons';
import '../assets/less/header.less';
import {MAP} from '../constants';

type Props = {
    title: string
    buttonType: string
    handleChangeShowMap: () => void
}

export const Header:React.FC<Props> = (props) => {
    const {title, buttonType, handleChangeShowMap} = props;

    return <div className={'main_header-wrap'}>
        <MapReportButton
            type={buttonType}
            handleChangeShowMap={handleChangeShowMap}
        />
        <UndoAndReturnUndoButtons hide={buttonType !== MAP} />
        <h1 className={'main_header'}>{title}</h1>
    </div>;
};