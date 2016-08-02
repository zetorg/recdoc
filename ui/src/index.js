import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import * as reducers from './reducers';
import Application from './components/Application.jsx';
import Dashboard from './components/Dashboard.jsx';

let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

const reducer = combineReducers({
	...reducers,
	routing: routerReducer
});

const store = createStore(
	reducer,
	applyMiddleware(thunkMiddleware)
);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
	<Provider store={store}>
		<div>
			<Router history={history}>
				<Route path="/" component={Application}>
					<IndexRoute component={Dashboard}/>
				</Route>
			</Router>
		</div>
	</Provider>,
	document.getElementById('application')
);