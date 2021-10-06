import * as React from 'react';
import {useSelector} from 'react-redux';
import '../assets/less/preloader.less';

export const Preloader:React.FC = () => {
    const {isFetching, isSaving} = useSelector((state: any) => state);
    const visible = isFetching || isSaving;
    const description = isFetching
        ? 'Идет загрузка данных!'
        : isSaving
            ? 'Идет сохранение данных!'
            : '';

    return visible && <div className={'preloader-wrap'}>
		<div className={'preloader'}>
			<div className={'preloader-title'}>{'Подождите...'}</div>
			<div className={'preloader-description'}>{description}</div>
		</div>
	</div>;
};