import * as React from 'react';
import {useDispatch} from 'react-redux';
import * as actions from '../actions';
import {App as AppComponent} from '../components/App';
import '../assets/less/index.less';

const App: React.FC = () => {

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(actions.fetchData());
    }, [dispatch]);

    const {appVersion} = window.navigator;

    React.useEffect(() => {
        dispatch(actions.loadDataError(appVersion));
    }, [dispatch, appVersion]);

    return <AppComponent />;
};

export default App;