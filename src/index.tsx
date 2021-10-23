import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import * as firebase from 'firebase/app';
import firebaseConfig from './config/config';
import {Provider} from 'react-redux';
import {appStore} from './store';
import App from './containers/App';
import LoginPage from './containers/LoginPage';
console.log('q1');
firebase.initializeApp(firebaseConfig);
console.log('q2');
ReactDOM.render(<Provider store={appStore}>
    <BrowserRouter>
        <Switch>
            <Route exact path="grape_app/">
                <App/>
            </Route>
            <Route path='grape_app/login'>
                <LoginPage/>
            </Route>
        </Switch>
    </BrowserRouter>
</Provider>, document.getElementById('app'));

export const moduleHotAccept = (module: NodeModule) => {
    if (module.hot) {
        module.hot.accept();
    }
};

moduleHotAccept(module);