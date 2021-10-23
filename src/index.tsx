import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {HashRouter, Switch, Route} from 'react-router-dom';
import * as firebase from 'firebase/app';
import firebaseConfig from './config/config';
import {Provider} from 'react-redux';
import {appStore} from './store';
import App from './containers/App';
import LoginPage from './containers/LoginPage';
console.log('w1');
firebase.initializeApp(firebaseConfig);
console.log('w2');
ReactDOM.render(<Provider store={appStore}>
    <HashRouter>
        <Switch>
            <Route exact path="/">
                <App/>
            </Route>
            <Route path='/login'>
                <LoginPage/>
            </Route>
        </Switch>
    </HashRouter>
</Provider>, document.getElementById('app'));

export const moduleHotAccept = (module: NodeModule) => {
    if (module.hot) {
        module.hot.accept();
    }
};

moduleHotAccept(module);