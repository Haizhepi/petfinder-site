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
import axios from 'axios';

//Class that represents the password reset form
export function checkEmail(email) {
    return axios.post('/api/user/check', email);
}

class PasswordResetForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {hasSubmitSucceeded: false};
    }

    onSubmit = (form) => {
        alert(form.principal);
        checkEmail(form.principal).then(response => {
            console.log(response);
            if (response === 'found' ) {
                this.setState({hasSubmitSucceeded: true});
            }
            else {
                alert('Email not found');
            }
        });
    };

    render() {
        let {handleSubmit, submitting} = this.props;
        if (this.state.hasSubmitSucceeded) {
            alert('submit');
        }

        return (
            <form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>

                <Bessemer.Field name="principal" friendlyName="Email"
                                validators={[Validation.requiredValidator, Validation.emailValidator]}/>

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

class AnswerQuestion extends React.Component {
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
                <div className="title">Password Recovered</div>
                <hr/>
                <Bessemer.Field name="answer" friendlyName="Your answer: "
                                field={<input className="form-control" type="answer"
                                />}/>
                <div className="wrapper">
                    <Bessemer.Button className="buttonType1" loading={submitting}>Save Changes</Bessemer.Button>
                </div>
            </form>
        );
    }
}

AnswerQuestion = ReduxForm.reduxForm({form: 'passwordDisplay'})(PasswordDisplay);

AnswerQuestion = connect(
    state => ({
        initialValues: {
        }
    })
)(AnswerQuestion);

export {AnswerQuestion};