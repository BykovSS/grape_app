import * as React from 'react';
import {useSelector} from 'react-redux';
import {Guide as GuideComponent} from '../components/Guide';
import {GUIDE_BOTTOM, GUIDE_TOP} from '../constants';

const Guide: React.FC = () => {

    const {guide, windowSizes} = useSelector((state: any) => state);
    const {windowHeight} = windowSizes || {};

    const [isOpen, changeOpen] = React.useState<boolean>(false);
    const [heightStyle, changeHeightStyle] = React.useState<number>(0);

    const handleClickIcon = React.useCallback(() => {
        changeOpen(!isOpen);
    }, [isOpen]);

    React.useEffect(() => {
        const guideData = document.querySelector('.guide-data_wrap');
        let height = 0;
        guideData.childNodes.forEach(e => {
            height = height + parseInt(getComputedStyle(e as Element).marginTop) + (e as Element).clientHeight + parseInt(getComputedStyle(e as Element).marginBottom);
        });
        if (windowHeight > GUIDE_BOTTOM + parseInt(getComputedStyle(guideData).top) + height + parseInt(getComputedStyle(guideData).bottom) + GUIDE_TOP && guide.length > 0) {
            changeHeightStyle(parseInt(getComputedStyle(guideData).top) + height + parseInt(getComputedStyle(guideData).bottom) + 5);
        }

        return () => changeHeightStyle(0);
    }, [windowHeight, changeHeightStyle, guide.length]);

    return <GuideComponent
        isOpen={isOpen}
        guide={guide}
        heightStyle={heightStyle}
        handleClickIcon={handleClickIcon}
    />;
};

export default Guide;