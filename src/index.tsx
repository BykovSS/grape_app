import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {initializeApp} from 'firebase/app';
import firebaseConfig from './config/config';
import {Provider} from 'react-redux';
import {appStore} from './store';
import App from './containers/App';

initializeApp(firebaseConfig);

ReactDOM.render(<Provider store={appStore}>
    <App/>
</Provider>, document.getElementById('app'));

export const moduleHotAccept = (module: NodeModule) => {
    if (module.hot) {
        module.hot.accept();
    }
};

moduleHotAccept(module);