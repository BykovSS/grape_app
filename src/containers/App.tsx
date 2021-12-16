import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../actions';
import * as api from '../api';
import {App as AppComponent} from '../components/App';
import LoginPage from './LoginPage';
import '../assets/less/index.less';

const App: React.FC = () => {
    const [showMap, changeShowMap] = React.useState<boolean>(true);
    const [showLoginPageContent, changeShowLoginPageContent] = React.useState<boolean>(false);
    const {isAuthorized, currentFieldValue, windowSizes} = useSelector((state: any) => state);
    const currentData = useSelector((state: any) => currentFieldValue ? state.data[currentFieldValue] : null);
    const {windowHeight} = windowSizes || {};

    const onShowLoginPageContent = React.useCallback(() => {
        changeShowLoginPageContent(true);
    }, []);

    const dispatch = useDispatch();

    React.useEffect(() => {
        if (isAuthorized) {
            dispatch(api.loadDataFromBase('/dataInfo', actions.loadDataInfoSuccess));
            dispatch(api.loadDataFromBase('/guide', actions.loadGuideSuccess));
        } else {
            dispatch(api.checkUserAuthorization(onShowLoginPageContent));
        }
    }, [isAuthorized, dispatch, onShowLoginPageContent]);

    React.useEffect(() => {
        if (isAuthorized && currentFieldValue && (!currentData || currentData && currentData.length === 0)) {
            dispatch(api.loadDataFromBase('/data/' + currentFieldValue, actions.loadDataSuccess, currentFieldValue));
        }
    }, [isAuthorized, currentFieldValue, currentData, dispatch]);

    const handleChangeShowMap = React.useCallback(() => {
        changeShowMap(!showMap);
    }, [showMap]);

    return isAuthorized ? <AppComponent
        showMap={showMap}
        windowHeight={windowHeight}
        handleChangeShowMap={handleChangeShowMap}
    /> : <LoginPage
        showLoginPageContent={showLoginPageContent}
    />;
};

export default App;