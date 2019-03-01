import _ from 'lodash';

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Users from 'js/users';
import * as Login from 'js/login';
import * as Pets from 'js/petInfo';
import * as PetList from 'js/petList';

export class Home extends React.Component {
	render() {
		return (

			<div className="container padded">


				{ _.isDefined(this.props.user) && <div>
				<h1>U r logged in</h1>
					<ul>
						<li><Link to="/register">Register as Owner</Link></li>
						<li><Link to="/login">Login</Link></li>
						<li><Link to="/page-1">Page 1</Link></li>
						<li><Link to="/pet">Add Pet</Link></li>
						<li><Link to="/page-3">Pet List</Link></li>
						<li><Link to="/homepage">UserProfile</Link></li>
					</ul>
				</div>
				}
				{ this.props.user == null &&
				<div>
					<h1>This is the home page.</h1>
					<ul>
						<li><Link to="/register">Register as Owner</Link></li>
						<li><Link to="/login">Login</Link></li>
						<li><Link to="/page-1">Page 1</Link></li>
						<li><Link to="/pet">Add Pet</Link></li>
						<li><Link to="/page-3">Pet List</Link></li>
					</ul>
				</div>
				}
			</div>




		);
	}
}

Home = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	}),
	dispatch => ({
		register: user => dispatch(Users.Actions.register(user))
	})
)(Home);


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
				<h2><Link to="/">home</Link></h2>

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

class Page3 extends React.Component {


	render() {
		return (
			<div className="container padded">

				<h1>Pets</h1>
		        <PetList.PetList />
			</div>
		);
	}
}
Page3 = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state),
		pet: Users.State.getPet(state)
	})
)(Page3);
export { Page3 };


export class Homepage extends React.Component {
	render() {


		return (

			<div className="container padded">
				<h1>Home Page</h1>
				{ _.isDefined(this.props.authentication) &&
				<div><h1>This is Ur User Profile</h1>
				<ul>
					<li>{this.props.user.firstName}</li>
					<li>{this.props.user.lastName}</li>
					<li>{this.props.user.gender}</li>
					<li>{this.props.user.zipcode}</li>
				</ul>
				</div>
				}

			</div>
		);
	}
}
Homepage = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state),
		pet: Users.State.getPet(state)
	})
)(Homepage);
