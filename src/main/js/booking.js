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

class BookingForm extends React.Component {

    onSubmit = booking => {
        return this.props.makeBooking(booking).then(() => {
            //and then .catch and redirect in .then
        });
    };

    render() {
        let {handleSubmit, submitting} = this.props;

        if (submitting) {
            this.forceUpdate();
            return <Redirect to={'/'}/>;
        }
        return (
            <form className="regf" name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
            </form>
            )
    }
}

BookingForm = ReduxForm.reduxForm({form: 'booking'})(BookingForm);

BookingForm = connect(
    state => ({}),
    dispatch => ({})
)(BookingForm);