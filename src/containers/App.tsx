import * as React from 'react';
import {useDispatch} from 'react-redux';
import * as actions from '../actions';
import {App as AppComponent} from '../components/App';
import '../assets/less/index.less';

const App: React.FC = () => {

    const [showMap, changeShowMap] = React.useState<boolean>(true);

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(actions.fetchData());
    }, [dispatch]);

    const handleChangeShowMap = React.useCallback(() => {
        changeShowMap(!showMap);
    }, [showMap]);

    return <AppComponent
        showMap={showMap}
        handleChangeShowMap={handleChangeShowMap}
    />;
};

export default App;