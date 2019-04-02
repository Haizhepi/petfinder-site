import React from 'react';
import * as Users from 'js/users';
import {ListGroup, ListGroupItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class SignedBooking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signedBooking: [{
                name: 'no name'
            }]
        };
    }

    componentWillMount() {
        this.props.getSitterBookings().then(response => {
            this.setState({signedBooking: response});
        });
    }

    render() {
        return (
            <div>
                <div id="p" className="col-6 offset-md-3">
                    <h1>This is Ur Booking</h1>
                    {this.state.signedBooking.map(booking => (
                        <ListGroup key={booking.id}>
                            <ListGroupItem>
                                <div onClick={() => this.props.selectBooking(booking)}>
                                    <Link to="/bookingDetail">
                                        Owner: {booking.owner}
                                    </Link>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem>Status: {booking.status}</ListGroupItem>
                            <ListGroupItem>Pet: {booking.petId}</ListGroupItem>
                            <ListGroupItem>Time: {booking.time}</ListGroupItem>
                            <ListGroupItem>Des: {booking.description}</ListGroupItem>
                            <ListGroupItem>Start Time: {booking.startTime}</ListGroupItem>
                            <ListGroupItem>End Time: {booking.endTime}</ListGroupItem>
                            <ListGroupItem>Start Date: {booking.startDate}</ListGroupItem>
                            <ListGroupItem>End Date: {booking.endDate}</ListGroupItem>
                        </ListGroup>
                    ))}


                </div>
            </div>
        );
    }


}
SignedBooking = connect(
    state =>({
        user: Users.State.getUser(state)
    }),
    dispatch =>({
        selectBooking: booking => dispatch(Users.Actions.selectBooking(booking)),
        getSitterBookings: () => dispatch(Users.Actions.getSitterBookings())
    })
)(SignedBooking);

export {SignedBooking};