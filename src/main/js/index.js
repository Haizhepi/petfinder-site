import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import * as Pages from 'js/pages';
import {PetList} from 'js/petList';


export default class Index extends React.Component {
	render() {
		return (
			<HashRouter>
				<div>
					<Route exact path="/" component={Pages.Home} />
					<Route exact path="/register" component={Pages.RegisterPage} />
					<Route exact path="/login" component={Pages.LoginPage} />
					<Route exact path="/page-1" component={Pages.Page1} />
					<Route exact path="/pet" component={Pages.Page2} />
					<Route exact path="/page-3" component={PetList} />
					<Route exact path="/homepage" component={Pages.Homepage} />
				</div>
			</HashRouter>
		);
	}
}