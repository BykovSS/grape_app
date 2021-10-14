import * as React from 'react';
import '../../assets/less/buttons.less';
import {MAP, REPORT} from '../../constants';

type Props = {
    type: string
    handleChangeShowMap: () => void
}

const MapReportButton:React.FC<Props> = (props) => {
    const {type, handleChangeShowMap} = props;

    return <button
        className={'map-report_button'}
        onClick={handleChangeShowMap}
    >{type === MAP ? 'Отчет' : type === REPORT ? 'Схема' : ''}</button>;
};

export default MapReportButton;