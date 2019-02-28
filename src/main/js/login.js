import React from 'react';
import * as ReduxForm from 'redux-form';
import { connect } from 'react-redux';

import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';
import {Redirect} from 'react-router-dom';
import * as Users from 'js/users';

//Class that represents the log in form
class LoginForm extends React.Component {

	//Defines the on submit behavior
	onSubmit = ({principal, password}) => {
		return this.props.authenticate(principal, password);
	};

	render() {
		let { handleSubmit, submitting } = this.props;

		//console.log(submitting);
		if (submitting) {
			this.forceUpdate();
			return <Redirect to={'/'}/>;
		}


		return (
			<form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
				<Bessemer.Field name="principal" friendlyName="Email Address"
				                validators={[Validation.requiredValidator, Validation.emailValidator]} />

				<Bessemer.Field name="password" friendlyName="Password"
				                validators={[Validation.requiredValidator, Validation.passwordValidator]} />

				<Bessemer.Button loading={submitting}>Sign In</Bessemer.Button>
			</form>
		);
	}
}

LoginForm = ReduxForm.reduxForm({form: 'login'})(LoginForm);

LoginForm = connect(
	state => ({
		initialValues: { principal: 'Email Address', password: 'Password' }
	}),
	dispatch => ({
		authenticate: (principal, password) => dispatch(Users.Actions.authenticate(principal, password))
	})
)(LoginForm);

export { LoginForm };

//Class that represents a registration form
class RegistrationForm extends React.Component {
	onSubmit = user => {
		return this.props.register(user).then(() => {
		    //and then .catch and redirect in .then
		});
	};

	render() {
		let { handleSubmit, submitting } = this.props;

		if (submitting) {
			this.forceUpdate();
			return <Redirect to={'/'}/>;
		}

		return (
			<form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
				<Bessemer.Field name="principal" friendlyName="Email Address"
				                validators={[Validation.requiredValidator, Validation.emailValidator]} />

				<Bessemer.Field name="password" friendlyName="Password"
				                validators={[Validation.requiredValidator, Validation.passwordValidator]}
				                field={<input className="form-control" type="password" />} />
				<Bessemer.Field name="firstName" friendlyName="First Name"
								field={<input className="form-control" type="firstName"/>}/>

				<Bessemer.Field name="lastName" friendlyName="Last Name"
								field={<input className="form-control" type="lastName"/>}/>
				<Bessemer.Field name="gender" friendlyName="Gender"
								field={<Bessemer.Select options={[{value: 'female', label: 'female'},
											{value: 'male', label: 'male'}]}/>}/>
				<Bessemer.Field name="zipcode" friendlyName="Zip Code"
								field={<input className="form-control" type="zipcode"/>}/>


				<Bessemer.Button loading={submitting}>Register</Bessemer.Button>

			</form>
		);
	}
}

RegistrationForm = ReduxForm.reduxForm({form: 'register'})(RegistrationForm);

RegistrationForm = connect(
	state => ({
	}),
	dispatch => ({
		register: user => dispatch(Users.Actions.register(user))
	})
)(RegistrationForm);

export { RegistrationForm };