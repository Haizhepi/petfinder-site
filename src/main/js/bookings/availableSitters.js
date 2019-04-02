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
import {AvailableBooking} from "js/bookings/booking";

class AvailableSitter extends React.Component {

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
        if (user.userType !== newUser.type) {
            newUser.type = 'BOTH';
        }
        this.props.editProfile(newUser).then(this.setState({hasSubmitSucceeded: true}));
    };

    render() {
        let {handleSubmit, submitting} = this.props;
        if (this.state.hasSubmitSucceeded) {
            //alert('success');
            return <Redirect to={'/'}/>;
        }

        return (
            <form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
                <Bessemer.Field name="firstName" friendlyName="first name"/>
                <Bessemer.Field name="lastName" friendlyName="last name"/>
                <Bessemer.Field name="gender" friendlyName="Gender"/>
                <Bessemer.Field name="zipcode" friendlyName="zip code"/>
                <Bessemer.Field name="userType" friendlyName="User Type"
                                field={<Bessemer.Select options={[{value: 'sitter', label: 'Sitter'},
                                    {value: 'owner', label: 'Owner'}]}
                                                        placeholder="Owner or Sitter?"
                                />}/>
                <div className="wrapper">
                    <Bessemer.Button className="buttonType1" loading={submitting}>Confirm</Bessemer.Button>
                </div>
            </form>
        );
    }
}

AvailableSitter = connect(
    state =>({

    }),
    dispatch => ({
        getAvailableSitters: bookingID => dispatch(Users.Actions.getAvailableSitters(bookingID))
    })
)(AvailableSitter);

export {AvailableSitter};

