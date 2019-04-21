import React from 'react';
import * as ReduxForm from 'redux-form';

import {connect} from 'react-redux';

import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';
import {Link, Redirect} from 'react-router-dom';
import * as Users from 'js/users';
import classNames from 'classnames';

import * as Apps from 'js/app.js';

import 'styles/main.scss';

import {Animated} from 'react-animated-css';
import {AvailableBooking} from 'js/bookings/booking';
import {Button, ListGroupItem} from 'reactstrap';

class AvailableSitter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sitters: null
        };
    }


    componentWillMount() {
        this.props.getAvailableSitters(this.props.booking.id).then(response => {
            this.setState({sitters: response});
        });

    }


    render() {
        console.log('xxxx');
        if (!this.state.sitters) {
            return (
                <div><h2>Pet finder could not find any matching sitters</h2></div>
            );
        }
        return (
            <div>
            <h2>Available Sitters: </h2>
        {this.state.sitters.map(sitterDate => (
            <div>
            <ListGroupItem>
                <ListGroupItem>Sitter Name: {sitterDate.sitter.firstName}</ListGroupItem>
                <ListGroupItem>Sitter Last name: {sitterDate.sitter.lastName}</ListGroupItem>
                <ListGroupItem>Sitter Start Time: {sitterDate.availability.startTime}</ListGroupItem>
                <ListGroupItem>Sitter End Time: {sitterDate.availability.endTime}</ListGroupItem>
                <ListGroupItem>Sitter Start Date: {sitterDate.availability.startDate}</ListGroupItem>
                <ListGroupItem>Sitter End Date: {sitterDate.availability.endDate}</ListGroupItem>
            </ListGroupItem>
            <Link to={'/bookingDetail'}>
            <Button onClick={() => {
                this.props.invite(sitterDate.sitter.principal, this.props.booking.id);
            }}>Invite Sitter</Button>
            </Link>
            </div>
        ))}
            </div>
        );
    }
}

AvailableSitter = connect(
    state =>({
        booking: Users.State.getActiveBooking(state)
    }),
    dispatch => ({
        getAvailableSitters: bookingID => dispatch(Users.Actions.getAvailableSitters(bookingID)),
        invite: (sitter, bookingId) => dispatch(Users.Actions.inviteSitter(sitter, bookingId))
    })
)(AvailableSitter);

export {AvailableSitter};

