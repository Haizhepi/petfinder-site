import React from 'react';
import * as Users from 'js/users';
import {Button, ListGroup, ListGroupItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


class SitterDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pet: [{
                name: 'no name'
            }],
            booking: [{
                name: 'no name'
            }],
            recommend: 'no name'
        };
    }

    //set state as array of user's pets
    componentWillMount() {
        console.log('?');
        console.log(this.props.booking);
        Users.Actions.getPetById(this.props.booking.petId).then(response => {
            console.log('?');
            console.log(response);
            this.setState({pet: response});
        });
    }

    render() {
        return (
            <div>
                <h2>SITTER: {this.state.pet.name}</h2>
                <ListGroup>
                    <ListGroupItem>Owner: {this.props.booking.owner}</ListGroupItem>
                    <ListGroupItem>Pet: {this.props.booking.petId}</ListGroupItem>
                    <ListGroupItem>Time: {this.props.booking.time}</ListGroupItem>
                    <ListGroupItem>Des: {this.props.booking.description}</ListGroupItem>
                    <ListGroupItem>Start Time: {this.props.booking.startTime}</ListGroupItem>
                    <ListGroupItem>End Time: {this.props.booking.endTime}</ListGroupItem>
                    <ListGroupItem>Start Date: {this.props.booking.startDate}</ListGroupItem>
                    <ListGroupItem>End Date: {this.props.booking.endDate}</ListGroupItem>
                </ListGroup>
                <Link to="/">
                    <Button color="danger" onClick={() => this.props.signUp(this.props.booking)}>Sign Up for
                        this</Button>
                </Link>
            </div>
        );
    }
}

SitterDetails = connect(
    state =>({
        booking: Users.State.getActiveBooking(state),
        user: Users.State.getUser(state)
    }),
    dispatch => ({
        signUp: booking => dispatch(Users.Actions.signUpBooking(booking))

    })
)(SitterDetails);
export {SitterDetails};

class OwnerDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pet: [{
                name: 'no name'
            }],
            booking: [{
                name: 'no name'
            }],
            recommend: 'no name'
        };
    }

    //set state as array of user's pets
    componentWillMount() {
        console.log('?');
        console.log(this.props.booking);
        Users.Actions.getPetById(this.props.booking.petId).then(response => {
            console.log('?');
            console.log(response);
            this.setState({pet: response});
        });
    }

    render() {
        return (
            <div>
                <h1>Owner</h1>
                <h2>Pet: {this.state.pet.name}</h2>
                <ListGroup>
                    <ListGroupItem>Owner: {this.props.booking.owner}</ListGroupItem>
                    <ListGroupItem>Pet: {this.props.booking.petId}</ListGroupItem>
                    <ListGroupItem>Time: {this.props.booking.time}</ListGroupItem>
                    <ListGroupItem>Des: {this.props.booking.description}</ListGroupItem>
                    <ListGroupItem>Start Time: {this.props.booking.startTime}</ListGroupItem>
                    <ListGroupItem>End Time: {this.props.booking.endTime}</ListGroupItem>
                    <ListGroupItem>Start Date: {this.props.booking.startDate}</ListGroupItem>
                    <ListGroupItem>End Date: {this.props.booking.endDate}</ListGroupItem>
                </ListGroup>
                <ListGroup>
                    <ListGroupItem>Owner: {this.props.booking.owner}</ListGroupItem>
                    <ListGroupItem>Pet: {this.props.booking.petId}</ListGroupItem>
                    <ListGroupItem>Time: {this.props.booking.time}</ListGroupItem>
                    <ListGroupItem>Des: {this.props.booking.description}</ListGroupItem>
                    <ListGroupItem>Start Time: {this.props.booking.startTime}</ListGroupItem>
                    <ListGroupItem>End Time: {this.props.booking.endTime}</ListGroupItem>
                    <ListGroupItem>Start Date: {this.props.booking.startDate}</ListGroupItem>
                    <ListGroupItem>End Date: {this.props.booking.endDate}</ListGroupItem>
                </ListGroup>
            </div>
        );
    }
}
OwnerDetails = connect(
    state =>({
        booking: Users.State.getActiveBooking(state),
        user: Users.State.getUser(state)
    }),
    dispatch => ({
        signUp: booking => dispatch(Users.Actions.signUpBooking(booking))

    })
)(OwnerDetails);
export {OwnerDetails};


class BookingDetail extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            pet: [{
                name: 'no name'
            }],
            booking: [{
                name: 'no name'
            }],
            recommend: 'no name'
        };
    }

    //set state as array of user's pets
    componentWillMount() {
        console.log('?');
        console.log(this.props.booking);
        Users.Actions.getPetById(this.props.booking.petId).then(response => {
            console.log('?');
            console.log(response);
            this.setState({pet: response});
        });
        if (this.props.user.type !== 'SITTER') {
            Users.Actions.getRecommend(this.props.booking.id).then(response => {
                console.log('?????');
                console.log(response);
                this.setState({recommend: response});
            });
        }
    }

    render() {
        if (!this.props.booking) {
            return (<h1>hmmmmmm</h1>);
        }
        if (this.props.user.type === 'SITTER') {
            console.log('go to sitter');
            return (
                <SitterDetails/>
            );
        } else {
            console.log('go to owner');

            return (
                <OwnerDetails/>
            );
        }
    }
}

BookingDetail = connect(
    state =>({
        booking: Users.State.getActiveBooking(state),
        user: Users.State.getUser(state)
    }),
    dispatch => ({
        signUp: booking => dispatch(Users.Actions.signUpBooking(booking))

    })
)(BookingDetail);

export {BookingDetail};


