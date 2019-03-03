import React from 'react';
import * as ReduxForm from 'redux-form';

import { connect } from 'react-redux';

import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';
import {Redirect} from 'react-router-dom';
import * as Users from 'js/users';
import classNames from 'classnames';

import * as Apps from 'js/app.js';

import 'styles/main.scss';

//Class that represents the log in form
class LoginForm extends React.Component {

    //Defines the on submit behavior
    onSubmit = ({principal, password}) => {
        return this.props.authenticate(principal, password);
    };

    render() {
        let {handleSubmit, submitting} = this.props;

		if (submitting) {
			if (this.props.authentication != null) {
				this.forceUpdate();
				return <Redirect to={'/'}/>;
			}
		}

        return (
            <form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
                <Bessemer.Field name="principal" friendlyName="Email Address"
                                validators={[Validation.requiredValidator, Validation.emailValidator]}/>

                <Bessemer.Field name="password" friendlyName="Password"
                                validators={[Validation.requiredValidator, Validation.passwordValidator]}/>

                <Bessemer.Button loading={submitting}>Sign In</Bessemer.Button>
            </form>
        );
    }
}

LoginForm = ReduxForm.reduxForm({form: 'login'})(LoginForm);

LoginForm = connect(
    state => ({
        initialValues: {principal: '', password: ''}
    }),
    dispatch => ({
        authenticate: (principal, password) => dispatch(Users.Actions.authenticate(principal, password))
    })

)(LoginForm);

export {LoginForm};

//Class that represents a registration form
class RegistrationForm extends React.Component {

    /*
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: ''
        };

        this.submitData = this.submitData.bind(this);
    }

    inputPassword = (event) => {
        this.setState({password: event.target.value});
    };

    confirmPassword = (event) => {
        this.setState({confirmPassword: event.target.value});
    };

    submitData(event) {
        event.preventDefault();
        const {password, confirmPassword} = this.state;

        if (password === confirmPassword) {
            alert('m');
        } else {
            alert('np');
        }
    }

    formIsValid = () => {
        const password = { ...this.state.password };
        const confirmPassword = { ...this.state.confirmPassword };
        let isGood = true;

        if (password.value !== confirmPassword.value) {
            isGood = false;
        }

        alert(password.value);

        if (!isGood) {
            this.setState({
                password,
                confirmPassword,
            });
        }

        return isGood;
    }


    onSubmit = (user) => {

        alert(this.state.confirmPassword.value);

        // run the validation, and if it's good move on.
        if (this.formIsValid()) {
            return this.props.register(user);
        }
    };

    render() {

        let { handleSubmit, submitting } = this.props;

        const { password, confirmPassword } = this.state;

        const passwordGroupClass = classNames('form-control',
            { 'has-error': !password.isValid }
        );
        const confirmGroupClass = classNames('form-control',
            { 'has-error': !confirmPassword.isValid }
        );

        if (submitting) {
            this.forceUpdate();
            return <Redirect to={'/'}/>;
        }

        return (
            <form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}
            >
                <Bessemer.Field name="principal" friendlyName="Email Address"
                                validators={[Validation.requiredValidator, Validation.emailValidator]}/>

                <Bessemer.Field name="password" friendlyName="Password"
                                validators={[Validation.requiredValidator, Validation.passwordValidator]}
                                field={<input value={password.value}
                                              onChange={this.inputPassword}
                                              className={passwordGroupClass} type="password" placeholder="Password"
                                              id="pw"
                                />}/>
                <span className="help-block">{password.message}</span>

                <Bessemer.Field name="confirmPassword" friendlyName="Confirm Password"
                                validators={[Validation.requiredValidator, Validation.passwordValidator]}
                                field={<input value={confirmPassword.value}
                                              onChange={this.confirmPassword}
                                              className={confirmGroupClass} type="cpassword" placeholder="Confirm Password"
                                              id="cpw"
                                />}/>
                <span className="help-block">{confirmPassword.message}</span>


                <Bessemer.Field name="firstName" friendlyName="First Name"
                                field={<input className="form-control" type="firstName"/>}/>

                <Bessemer.Field name="lastName" friendlyName="Last Name"
                                field={<input className="form-control" type="lastName"/>}/>

                <Bessemer.Field name="gender" friendlyName="Gender"
                                field={<Bessemer.Select options={[{value: 'female', label: 'female'},
                                    {value: 'male', label: 'male'}]} placeholder="Choose Your Gender"/>}/>

                <Bessemer.Field name="zipcode" friendlyName="Zip Code"
                                field={<input className="form-control" type="zipcode"/>}/>

                <Bessemer.Button loading={submitting}>Register</Bessemer.Button>

            </form>
        );

    }
    */
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
			<form className="regf" name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
				<Bessemer.Field name="principal" friendlyName="Email Address"
				                validators={[Validation.requiredValidator, Validation.emailValidator]}
								placeholder=""
                />

				<Bessemer.Field name="password" friendlyName="Password"
				                validators={[Validation.requiredValidator, Validation.passwordValidator]}
				                field={<input className="form-control" type="password"
                                              placeholder="Enter Your Password"/>} />

                <Bessemer.Field name="confirmPassword" friendlyName="Confirm Password"
                                validators={[Validation.requiredValidator, Validation.passwordValidator]}
                                field={<input className="form-control" type="password"
                                              placeholder="Re-enter Your Password"
                                />}/>
				<Bessemer.Field name="firstName" friendlyName="First Name"
								field={<input className="form-control" type="firstName"
                                              placeholder="Your First Name"
                                />}/>

				<Bessemer.Field name="lastName" friendlyName="Last Name"
								field={<input className="form-control" type="lastName"
                                              placeholder="Your Last Name"
                                />}/>
				<Bessemer.Field name="gender" friendlyName="Gender"
								field={<Bessemer.Select options={[{value: 'Female', label: 'Female'},
											{value: 'Male', label: 'Male'},
                                    {value: 'Other', label: 'Other'}]}
                                                        placeholder="Choose Your Gender"

                                />}/>
				<Bessemer.Field name="zipcode" friendlyName="Zip Code"
								field={<input className="form-control" type="zipcode"/>}/>
				<Bessemer.Field name="userType" friendlyName="User Type"
								field={<Bessemer.Select options={[{value: 'sitter', label: 'sitter'},
									{value: 'owner', label: 'owner'}]}/>}/>


				<Bessemer.Button loading={submitting}>Register</Bessemer.Button>

			</form>
		);
	}
}

RegistrationForm = ReduxForm.reduxForm({form: 'register'})(RegistrationForm);

RegistrationForm = connect(
    state => ({
        initialValues: {password: '', confirmPassword: ''}
    }),

    dispatch => ({
        register: user => dispatch(Users.Actions.register(user))
    })
)(RegistrationForm);


export {RegistrationForm};

class EditProfileForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {hasSubmitSucceeded: false};
	}

	onSubmit = user => {
		let newUser = this.props.user;
		newUser.firstName = user.firstName;
		newUser.lastName = user.lastName;
		newUser.gender = user.gender;
		newUser.zipcode = user.zipcode;
		this.props.editProfile(newUser).then(this.setState({hasSubmitSucceeded: true}));
	};
	render() {
		let { handleSubmit, submitting } = this.props;
		if(this.state.hasSubmitSucceeded) {
			alert('success');
			return <Redirect to={'/'}/>;
		}

		return (
			<form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
				<Bessemer.Field name="firstName" friendlyName="first name"/>
				<Bessemer.Field name="lastName" friendlyName="last name"/>
				<Bessemer.Field name="gender" friendlyName="Gender"/>
				<Bessemer.Field name="zipcode" friendlyName="zip code"/>
				<Bessemer.Button loading={submitting}>Sign In</Bessemer.Button>
			</form>
		);
	}
}

EditProfileForm = ReduxForm.reduxForm({form: 'edit_profile'})(EditProfileForm);

EditProfileForm = connect(
	state => ({
		initialValues: { firstName: Users.State.getUser(state).firstName,
						lastName: Users.State.getUser(state).lastName,
						gender: Users.State.getUser(state).gender,
						zipcode: Users.State.getUser(state).zipcode},
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	}),
	dispatch => ({
		editProfile: user => dispatch(Users.Actions.editProfile(user))
	})
)(EditProfileForm);

export { EditProfileForm };
