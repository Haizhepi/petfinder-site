import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import * as Pages from 'js/pages';
import * as Users from 'js/users';
import {connect} from 'react-redux';
import _ from 'lodash';

export default class Index extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		let defaultPage = 0;
		let home = 	<Route exact path="/" component={Pages.Home}/>;
		let register = <Route exact path="/register" component={Pages.RegisterPage}/>;
		let login = <Route exact path="/login" component={Pages.LoginPage}/>;
		let userInfo = <Route exact path="/page-1" component={Pages.Page1}/>;
		let addpet = <Route exact path="/pet" component={Pages.Page2}/>;
		let page3 = <Route exact path="/page-3" component={Pages.Page3}/>;
		let homepath = <Route exact path="/homepage" component={Pages.Homepage}/>;
		//alert(this.props.authentication);
		return (
			<HashRouter>
				<div>
					{home}
					{register}
					{login}
					{userInfo}
					{addpet}
					{page3}
					{homepath}
				</div>
			</HashRouter>
		);

	}
}

Index = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	})
)(Index);


