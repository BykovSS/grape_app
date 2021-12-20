import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../actions';
import * as api from '../api';
import {App as AppComponent} from '../components/App';
import LoginPage from './LoginPage';
import * as MobileDetect from 'mobile-detect';
import '../assets/less/index.less';
import {getOtherValue} from '../utils';

const App: React.FC = () => {
    const [showMap, changeShowMap] = React.useState<boolean>(true);
    const [showLoginPageContent, changeShowLoginPageContent] = React.useState<boolean>(false);
    const {isAuthorized, currentFieldValue, windowSizes, dataInfo} = useSelector((state: any) => state);
    const currentData = useSelector((state: any) => currentFieldValue ? state.data[currentFieldValue] : null);
    const {windowHeight, windowWidth} = windowSizes || {};
    const dataInfoLength = dataInfo ? dataInfo.length : 0;
    const {otherHeight} = getOtherValue(windowWidth, windowHeight);

    const onShowLoginPageContent = React.useCallback(() => {
        changeShowLoginPageContent(true);
    }, []);

    const dispatch = useDispatch();

    React.useEffect(() => {
        const md = new MobileDetect(window.navigator.userAgent);
        if (md.mobile() || /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(window.navigator.userAgent) || windowWidth > 0 && windowWidth < 1024) {
            dispatch(actions.changeMobil());
        }
    }, [dispatch, windowWidth]);

    React.useEffect(() => {
        if (isAuthorized) {
            dispatch(api.loadDataFromBase('/dataInfo', actions.loadDataInfoSuccess));
            dispatch(api.loadDataFromBase('/guide', actions.loadGuideSuccess));
        } else {
            dispatch(api.checkUserAuthorization(onShowLoginPageContent));
        }
    }, [isAuthorized, dispatch, onShowLoginPageContent]);

    React.useEffect(() => {
        if (isAuthorized && currentFieldValue && (!currentData || currentData && currentData.length === 0 || dataInfoLength <= 7)) {
            dispatch(api.loadDataFromBase('/data/' + currentFieldValue, actions.loadDataSuccess, currentFieldValue));
        }
    }, [isAuthorized, currentFieldValue, currentData, dataInfoLength, dispatch]);

    const handleChangeShowMap = React.useCallback(() => {
        changeShowMap(!showMap);
    }, [showMap]);

    return isAuthorized ? <AppComponent
        showMap={showMap}
        windowHeight={windowHeight}
        otherHeight={otherHeight}
        handleChangeShowMap={handleChangeShowMap}
    /> : <LoginPage
        showLoginPageContent={showLoginPageContent}
    />;
};

export default App;