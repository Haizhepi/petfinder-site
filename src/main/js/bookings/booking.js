import React from 'react';
import * as ReduxForm from 'redux-form';

import {connect} from 'react-redux';
import * as Bessemer from '../alloy/bessemer/components';
import {Link, Redirect} from 'react-router-dom';
import * as Users from '../users';


import '../../styles/main.scss';

import {Animated} from 'react-animated-css';
import {ListGroup, ListGroupItem} from 'reactstrap';
import 'styles/stylesheets/datepicker.scss';
import DatePicker from 'react-datepicker';
import {MyBookings} from 'js/bookings/MyBookings';
import {BookingDetail} from 'js/bookings/BookingDetails';


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


