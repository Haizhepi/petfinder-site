import _ from 'lodash';

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Users from 'js/users';
import * as Login from 'js/login';
import * as Pets from 'js/petInfo';

export class Home extends React.Component {
	render() {
		return (
			<div className="container padded">
				<h1>This is the home page.</h1>
				<ul>
					<li><Link to="/register">Register as Owner</Link></li>
					<li><Link to="/login">Login</Link></li>
					<li><Link to="/page-1">Page 1</Link></li>
					<li><Link to="/pet">Page 2</Link></li>
					<li><Link to="/page-3">Page 3</Link></li>
					<li><Link to="/homepage">Homepage</Link></li>
				</ul>
			</div>
		);
	}
}

export class RegisterPage extends React.Component {
	render() {
		return (
			<div className="container padded">
				<div className="row">
					<div className="col-6 offset-md-3">
						<h2>Register as Owner</h2>
						<hr />
						<Login.RegistrationForm />
					</div>
				</div>
			</div>
		);
	}
}

export class LoginPage extends React.Component {
	render() {
		return (
			<div className="container padded">
				<h1>This is the login page</h1>
				<div className="row">
					<div className="col-6 offset-md-3">
						<h2>Login</h2>
						<hr />
						<Login.LoginForm />
					</div>
				</div>
			</div>
		);
	}
}

class Page1 extends React.Component {
	render() {
		return (
			<div className="container padded">
				<h1>This is page 1</h1>


				{ _.isDefined(this.props.authentication) &&
				<div>{this.props.authentication['access_token']}</div>
				}

				{ _.isDefined(this.props.user) &&
				<div>Welcome, {this.props.user.principal}!</div>
				}
			</div>
		);
	}
}

Page1 = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	})
)(Page1);

export { Page1 };

class Page2 extends React.Component {
	render() {
		return (
			<div className="container padded">
			    <h1>Owner Profile Page</h1>
                <Pets.PetForm />
            </div>
        );
    }
}
Page2 = connect(
    state => ({
    authentication: Users.State.getAuthentication(state),
    user: Users.State.getUser(state),
    pet: Users.State.getPet(state)
    })
)(Page2);

export { Page2 };

export class Page3 extends React.Component {
	render() {
		return (
			<div className="container padded">
				<h1>This is page 3</h1>
			</div>
		);
	}
}

export class Homepage extends React.Component {
	render() {
		return (
			<div className="container padded">
				<h1>This is homepage</h1>
			</div>
		);
	}
}
