import React from 'react';
import * as Users from 'js/users';
import {ListGroup, ListGroupItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class MyBookings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            booking: [{
                name: 'no name'
            }]
        };
    }

    //set state as array of user's pets
    componentWillMount() {
        Users.Actions.getBookings(this.props.user).then(response => {
            this.setState({booking: response});
        });
    }

    render() {
        return (
            <div>
                <div id="p" className="col-6 offset-md-3">
                    <div className="title">All Bookings</div>
                    {this.state.booking.map(booking => (
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
MyBookings = connect(
    state =>({
        user: Users.State.getUser(state)
    }),
    dispatch =>({
        selectBooking: booking => dispatch(Users.Actions.selectBooking(booking))
    })
)(MyBookings);

export {MyBookings};