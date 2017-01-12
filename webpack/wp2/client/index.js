import './utils/tool';
import './utils/math';
import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
// // AppContainer is a necessary wrapper component for HMR

import CountDown from './components/CountDown/index';

// // import './style.scss';

const render = Component => {
	ReactDOM.render(
		<AppContainer>
			<Component />
		</AppContainer>,
		document.querySelector('#root')
	);
};

render(CountDown);

// // Hot Module Replacement API
// if (module.hot) {
// 	console.log('module.hot::: Hot Module Replacement API');
// 	module.hot.accept('./components/CountDown/index', () => {
// 		const NewApp = require('./components/CoundDown/index').default
// 		render(NewApp)
// 	});
// }

if (module.hot) {
	module.hot.accept();
}
