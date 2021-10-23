import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as api from '../api';
import {App as AppComponent} from '../components/App';
import '../assets/less/index.less';
import LoginPage from './LoginPage';

const App: React.FC = () => {
    const [showMap, changeShowMap] = React.useState<boolean>(true);
    const [showLoginPageContent, changeShowLoginPageContent] = React.useState<boolean>(false);
    const {isAuthorized} = useSelector((state: any) => state);

    const onShowLoginPageContent = React.useCallback(() => {
        changeShowLoginPageContent(true);
    }, []);

    const dispatch = useDispatch();

    React.useEffect(() => {
        if (isAuthorized) {
            dispatch(api.loadDataFromBase());
        } else {
            dispatch(api.checkUserAuthorization(onShowLoginPageContent));
        }
    }, [isAuthorized, dispatch, onShowLoginPageContent]);

    const handleChangeShowMap = React.useCallback(() => {
        changeShowMap(!showMap);
    }, [showMap]);

    return isAuthorized ? <AppComponent
        showMap={showMap}
        handleChangeShowMap={handleChangeShowMap}
    /> : <LoginPage
        showLoginPageContent={showLoginPageContent}
    />;
};

export default App;