import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import * as api from '../api';
import {App as AppComponent} from '../components/App';
import '../assets/less/index.less';

const App: React.FC = () => {
    console.log('App container');
    const [showMap, changeShowMap] = React.useState<boolean>(true);
    const {isAuthorized} = useSelector((state: any) => state);

    const dispatch = useDispatch();
    const history = useHistory();

    const redirectToLoginPage = React.useCallback(() => history.push('https://bykovss.github.io/grape_app/login'), [history]);

    React.useEffect(() => {
        if (isAuthorized) {
            dispatch(api.loadDataFromBase());
        } else {
            dispatch(api.checkUserAuthorization(redirectToLoginPage));
        }
    }, [isAuthorized, dispatch, redirectToLoginPage]);

    const handleChangeShowMap = React.useCallback(() => {
        changeShowMap(!showMap);
    }, [showMap]);

    return <AppComponent
        showMap={showMap}
        handleChangeShowMap={handleChangeShowMap}
    />;
};

export default App;