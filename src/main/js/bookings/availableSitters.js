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
import {AvailableBooking} from 'js/bookings/booking';

class AvailableSitter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {sitters: [{
                name: 'no name'
            }]};
    }

    componentWillMount() {
        this.props.getAvailableSitters(this.props.booking.id).then(response => {
            this.setState({sitters: response});
        });

    }


    render() {
        console.log('xxxx');
        console.log(this.state.sitters);
        return (
            <h2>demo</h2>
        );
    }
}

AvailableSitter = connect(
    state =>({
        booking: Users.State.getActiveBooking(state)
    }),
    dispatch => ({
        getAvailableSitters: bookingID => dispatch(Users.Actions.getAvailableSitters(bookingID))
    })
)(AvailableSitter);

export {AvailableSitter};

