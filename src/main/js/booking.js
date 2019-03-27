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
import {PetEdit, PetList} from 'js/petList';
import {Button, ListGroup, ListGroupItem} from 'reactstrap';
import 'styles/stylesheets/datepicker.scss';
import DatePicker from 'react-datepicker';


class BookingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pets: [{
                name: 'no name'
            }],
            startDate: new Date(),
            endDate: new Date(),
            startTime: new Date(),
            endTime: new Date()
        };

        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange4 = this.handleChange4.bind(this);

    }
    handleChange1(date) {
        console.log('+');
        console.log(date);
        this.setState({
            startTime: date,
        });
    }
    handleChange2(date) {
        this.setState({
            endTime: date,
        });
    }
    handleChange3(date) {
        this.setState({
            startDate: date,
        });
    }
    handleChange4(date) {
        this.setState({
            endDate: date,
        });
    }
    //set state as array of user's pets
    componentWillMount() {
        Users.Actions.getPets().then(response => {
            this.setState({pets: response});
        });
    }

    onSubmit = booking => {
        booking.owner = this.props.user.principal;
        booking.petId = this.props.pet.id;
        booking.startTime = this.state.startTime;
        booking.endTime = this.state.endTime;
        booking.startDate = this.state.startDate;
        booking.endDate = this.state.endDate;
        console.log('???');
        console.log(booking);
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
            <div>
                <div id="p" className="col-6 offset-md-3">
                    <h1> Pet Profile </h1>
                    <table>
                        <thead>
                        <tr>
                            <th>Pet Name</th>
                            <th>Pet Type</th>
                            <th>Pet Preference</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.pets.map(pet => (
                            <tr key={pet.id} className="pet" onClick={() => this.props.selectPet(pet)}>
                                <td>{pet.name}</td>
                                <td>{pet.type}</td>
                                <td>{pet.preference}</td>
                            </tr>

                        ))}
                        </tbody>
                    </table>
                    <hr></hr>
                    <h1> Select the Pet to be take care of: </h1>
                    <h2>Pet: {this.props.pet.name}</h2>
                    <form className="regf" name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
                        <DatePicker
                            selected={this.state.startTime}
                            onChange={this.handleChange1}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            dateFormat="h:mm aa"
                            timeCaption="Time"
                        />
                        <DatePicker
                            selected={this.state.endTime}
                            onChange={this.handleChange2}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            dateFormat="h:mm aa"
                            timeCaption="Time"
                        />
                        <DatePicker
                            selected={this.state.startDate}
                            selectsStart
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={this.handleChange3}
                        />
                        <DatePicker
                            selected={this.state.endDate}
                            selectsEnd
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={this.handleChange4}
                        />
                        <Bessemer.Field name="time" friendlyName="time"/>
                        <Bessemer.Field name="description" friendlyName="description"/>
                        <Bessemer.Button className="buttonType1" loading={submitting}>Confirm</Bessemer.Button>
                    </form>
                </div>

            </div>
            );
    }
}

BookingForm = ReduxForm.reduxForm({form: 'booking'})(BookingForm);

BookingForm = connect(
    state => ({
        user: Users.State.getUser(state),
        pet: Users.State.getActivePet(state)
    }),
    dispatch => ({
        selectPet: pet => dispatch(Users.Actions.selectPet(pet)),
        makeBooking : booking => dispatch(Users.Actions.makeBooking(booking))
    })
)(BookingForm);

export {BookingForm};

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
                    <h1>This is Ur Booking</h1>
                    {this.state.booking.map(booking =>(
                        <ListGroup>
                            <ListGroupItem>
                            <div onClick={()=> this.props.selectBooking(booking)} >
                            <Link to="/bookingDetail">
                            Owner: {booking.owner}
                            </Link>
                            </div>
                            </ListGroupItem>
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

class AvailableBooking extends React.Component {
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
        Users.Actions.getAvailableBookings().then(response => {
            this.setState({booking: response});
        });
    }

    render() {
        return (
            <div>
                <div id="p" className="col-6 offset-md-3">
                    <h1>Available booking</h1>
                    {this.state.booking.map(booking =>(
                        <ListGroup>
                            <ListGroupItem>
                                <div onClick={()=> this.props.selectBooking(booking)} >
                                    <Link to="/bookingDetail">
                                    Owner: {booking.owner}
                                    </Link>
                                    </div></ListGroupItem>

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

AvailableBooking = connect(
    state =>({

    }),
    dispatch => ({
        selectBooking: booking => dispatch(Users.Actions.selectBooking(booking))
    })
)(AvailableBooking);

export {AvailableBooking};

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
        else {
            return (
                <div>
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
