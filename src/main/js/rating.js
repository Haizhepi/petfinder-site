import React from 'react';
import * as Users from 'js/users';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as Bessemer from 'js/login';
import * as Validation from 'js/alloy/utils/validation';

import * as ReduxForm from 'redux-form';

import {connect} from 'react-redux';

import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';
import {Redirect} from 'react-router-dom';
import * as Users from 'js/users';
import classNames from 'classnames';

import * as Apps from 'js/app.js';

class LeaveRating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {sitters: [{
                name: 'no name'
            }]};
    }

    onSubmit = (rating) => {
        return this.props.addRating(this.props.booking, rating);
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
                <Bessemer.Field name="rating" friendlyName="Leave a Rating"/>
                <div className="wrapper">
                    <Bessemer.Button className="buttonType1" loading={submitting}>Submit</Bessemer.Button>
                </div>
            </form>
        );
    }

}

LeaveRating = Redux.reduxForm({form: 'rating'})(LeaveRating);

LeaveRating = connect(
    state =>({
        booking: Users.State.getActiveBooking(state)
    }),
    dispatch => ({
        addRating: (booking, content) => dispatch(Users.Actions.addRating(booking, content))
    })
)(LeaveRating);

export {LeaveRating};