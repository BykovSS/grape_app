import * as React from 'react';
// import {useDispatch} from 'react-redux';
// import * as actions from '../actions';
import {useSelector} from 'react-redux';
import {Guide as GuideComponent} from '../components/Guide';

const Guide: React.FC = () => {

    const {guide} = useSelector((state: any) => state);

    const [isOpen, changeOpen] = React.useState<boolean>(false);

    const handleClickIcon = React.useCallback(() => {
        changeOpen(!isOpen);
    }, [isOpen]);

    return <GuideComponent
        isOpen={isOpen}
        guide={guide}
        handleClickIcon={handleClickIcon}
    />;
};

export default Guide;