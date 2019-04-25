import React from 'react';
import * as ReduxForm from 'redux-form';

import {connect} from 'react-redux';

import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';
import {Redirect} from 'react-router-dom';
import * as Users from 'js/users';
import classNames from 'classnames';

import * as Apps from 'js/app.js';

import 'styles/main.scss';

import {Animated} from 'react-animated-css';
import {FormText, Input, Label, ModalBody} from 'reactstrap';

//Class that represents the password reset form
class PasswordResetForm extends React.Component {

    onSubmit = ({principal, securityAnswer}) => {
        alert(this.props.answer);
        this.props.answer = securityAnswer;
        alert(this.props.answer);
        return (this.props.authSecurityAnswer(principal));
    };

    render() {
        let {handleSubmit, submitting} = this.props;
        if (submitting) {
            alert(this.props.securityAnswer);
            alert(this.props.answer);
            if (this.props.securityAnswer === this.props.answer) {
                this.forceUpdate();
                return <Redirect to={'/passwordDisplay'}/>;
            }
            alert('Your security answer did not match our records');
            return;
        }

        return (
            <form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>

                <Bessemer.Field name="principal" friendlyName="Email"
                                validators={[Validation.requiredValidator, Validation.emailValidator]}/>
                <Bessemer.Field name="securityAnswer" friendlyName="What primary school did you attend?"/>

                <div className="wrapper">
                    <Bessemer.Button className="buttonType1" loading={submitting}>Submit</Bessemer.Button>
                </div>
            </form>
        );
    }
}

PasswordResetForm = ReduxForm.reduxForm({form: 'passwordReset'})(PasswordResetForm);

PasswordResetForm = connect(
    state => ({
        initialValues: {principal: '', securityAnswer: '', answer: ''}
    }),
    dispatch => ({
        authSecurityAnswer: (principal) => dispatch(Users.Actions.authSecurityAnswer(principal))
    })
)(PasswordResetForm);

export {PasswordResetForm};

class PasswordDisplay extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        alert('hello');
        let {handleSubmit, submitting} = this.props;
        if (!this.state.hasSubmitSucceeded) {
            return <Redirect to={'/login'}/>;
        }
        return (
            <form name="form">
                Password:
            </form>
        );
    }
}

PasswordDisplay = ReduxForm.reduxForm({form: 'passwordDisplay'})(PasswordDisplay);

PasswordDisplay = connect(
    state => ({
        initialValues: {
        }
    })
)(PasswordDisplay);

export {PasswordDisplay};