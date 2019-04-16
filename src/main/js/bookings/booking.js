import React from 'react';
import * as ReduxForm from 'redux-form';

import {connect} from 'react-redux';
import * as Bessemer from '../alloy/bessemer/components';
import {Link, Redirect} from 'react-router-dom';
import * as Users from '../users';


import '../../styles/main.scss';

import {Animated} from 'react-animated-css';
import {Card, CardBody, CardLink, CardSubtitle, CardText, CardTitle, ListGroup, ListGroupItem} from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {MyBookings} from 'js/bookings/MyBookings';
import {BookingDetail} from 'js/bookings/BookingDetails';
import {SidebarComponent} from 'js/mySidebar';
import {NavBar} from 'js/navBar';

import {ScrollArea} from 'react-scrollbar';

export class BookingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pets: [{
                name: 'no name'
            }],
        };
    }

    //set state as array of user's pets
    componentWillMount() {
        Users.Actions.getPets().then(response => {
            this.setState({pets: response});
        });
    }

    render() {
        let {handleSubmit, submitting} = this.props;

        if (submitting) {
            this.forceUpdate();
            // return <Redirect to={'/'}/>;
        }
        return (
            <div className="petTable">
                {this.state.pets.map(pet => (
                    <div className="petCard" key={pet.id} onClick={() => this.props.selectPet(pet)}>

                        <Card style={{
                            width: '150px',
                            height: '150px',
                            margin: '5px 0 5px 0',
                            border: 'none'
                        }}>
                            <div className="cardBody">
                                <CardBody>
                                    <CardTitle>{' ' + pet.name + ' '}</CardTitle>
                                    <CardSubtitle>{' ' + pet.type + ' '}</CardSubtitle>
                                    <CardText> {' '} </CardText>
                                    <CardLink className="cardLinkMiddle"
                                              href={'#/confirmBooking'}>Select</CardLink>
                                </CardBody>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        );
    }
}


BookingForm = connect(
    state => ({}),
    dispatch => ({
        selectPet: pet => dispatch(Users.Actions.selectPet(pet))
    })
)(BookingForm);


export class BookingFormConfirm extends React.Component {
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
            <section className="webWrapper">
                <SidebarComponent/>
                <NavBar/>
                <div className="container padded middleWrapper3">
                    <div className="row">
                        <div className="col-6 offset-md-3" id="p">
                            <div className="title">Confirm Booking</div>
                            <div className="petTable petCardMarginBottom">
                                <div className="petCard">
                                    <Card style={{
                                        width: '150px',
                                        height: '150px',
                                        margin: '5px 0 5px 0',
                                        border: 'none'
                                    }}>
                                        <div className="cardBody">
                                            <CardBody>
                                                <CardTitle>{' ' + this.props.pet.name + ' '}</CardTitle>
                                                <CardSubtitle>{' ' + this.props.pet.type + ' '}</CardSubtitle>
                                                <CardText> {' '} </CardText>
                                                <CardLink className="cardLinkMiddle2"
                                                          href={'#/addBooking'}>Change</CardLink>
                                            </CardBody>
                                        </div>
                                    </Card>
                                </div>
                            </div>

                            <form className="regf" name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
                                <div className="dateTagWrapper">
                                    <div className="fromTime">From
                                        <DatePicker className="dpBoxLeft"
                                                    selected={this.state.startDate}
                                                    selectsStart
                                                    startDate={this.state.startDate}
                                                    endDate={this.state.endDate}
                                                    onChange={this.handleChange3}
                                                    dateFormat="MM-dd-yyyy"
                                                    placeholderText={'Start Date...'}

                                        />
                                        <DatePicker className="dpBox"
                                                    selected={this.state.startTime}
                                                    onChange={this.handleChange1}
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    timeIntervals={15}
                                                    dateFormat="h:mm aa"
                                                    timeCaption="Time"
                                                    placeholderText={'Start Time...'}
                                        />
                                    </div>
                                    <div className="toTime">To
                                        <DatePicker className="dpBoxLeft2"
                                                    selected={this.state.endDate}
                                                    selectsEnd
                                                    startDate={this.state.startDate}
                                                    endDate={this.state.endDate}
                                                    onChange={this.handleChange4}
                                                    dateFormat="MM-dd-yyyy"
                                                    placeholderText={'End Date...'}
                                        />
                                        <DatePicker className="dpBox"
                                                    selected={this.state.endTime}
                                                    onChange={this.handleChange2}
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    timeIntervals={15}
                                                    dateFormat="h:mm aa"
                                                    timeCaption="Time"
                                                    placeholderText={'End Time...'}
                                        />
                                    </div>
                                </div>
                                <Bessemer.Field name="time" friendlyName="Title"/>
                                <Bessemer.Field name="description" friendlyName="Description"/>
                                <Bessemer.Button className="buttonType1" loading={submitting}>Confirm</Bessemer.Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

BookingFormConfirm = ReduxForm.reduxForm({form: 'booking'})(BookingFormConfirm);

BookingFormConfirm = connect(
    state => ({
        user: Users.State.getUser(state),
        pet: Users.State.getActivePet(state)
    }),
    dispatch => ({
        selectPet: pet => dispatch(Users.Actions.selectPet(pet)),
        makeBooking: booking => dispatch(Users.Actions.makeBooking(booking))
    })
)(BookingFormConfirm);


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
                    <div className="title">Available Bookings</div>
                    {this.state.booking.map(booking => (
                        <ListGroup>

                            <Card style={{
                                width: '500px',
                                height: '300px',
                                margin: '80px 0 80px 0',
                                border: 'none'
                            }}>
                                <div className="cardBody2">
                                    <CardBody>
                                        <CardTitle>
                                            <div className="bookingDetailTitle">
                                                {booking.owner}
                                            </div>
                                        </CardTitle>
                                        <CardSubtitle className="bookingSub">Status: {booking.status}</CardSubtitle>
                                        <CardSubtitle className="bookingSub">Pet: {booking.petId}</CardSubtitle>
                                        {/*<CardSubtitle className="bookingSub">Time: {booking.time}</CardSubtitle>*/}
                                        <CardSubtitle
                                            className="bookingSub">Description: {booking.description}</CardSubtitle>
                                        <CardSubtitle
                                            className="bookingSub">From: {booking.startTime + '   ' + booking.startDate}</CardSubtitle>
                                        <CardSubtitle
                                            className="bookingSub">To: {booking.endTime + '   ' + booking.endDate}</CardSubtitle>
                                        {/*<CardSubtitle className="bookingSub">Start Date: {booking.startDate}</CardSubtitle>*/}
                                        {/*<CardSubtitle className="bookingSub">End Date: {booking.endDate}</CardSubtitle>*/}

                                        <div onClick={() => this.props.selectBooking(booking)}>

                                            <a href={'#/bookingDetail'} className="btnModal2">Booking Detail</a>
                                        </div>

                                    </CardBody>
                                </div>
                            </Card>

                        </ListGroup>
                    ))}

                </div>

                {/*<div>*/}
                {/*<div id="p" className="col-6 offset-md-3">*/
                }
                {/*<h1>Available booking</h1>*/
                }
                {/*{this.state.booking.map(booking => (*/
                }
                {/*<ListGroup>*/
                }
                {/*<ListGroupItem>*/
                }
                {/*<div onClick={() => this.props.selectBooking(booking)}>*/
                }
                {/*<Link to="/bookingDetail">*/
                }
                {/*Owner: {booking.owner}*/
                }
                {/*</Link>*/
                }
                {/*</div>*/
                }
                {/*</ListGroupItem>*/
                }

                {/*<ListGroupItem>Pet: {booking.petId}</ListGroupItem>*/
                }
                {/*<ListGroupItem>Time: {booking.time}</ListGroupItem>*/
                }
                {/*<ListGroupItem>Des: {booking.description}</ListGroupItem>*/
                }
                {/*<ListGroupItem>Start Time: {booking.startTime}</ListGroupItem>*/
                }
                {/*<ListGroupItem>End Time: {booking.endTime}</ListGroupItem>*/
                }
                {/*<ListGroupItem>Start Date: {booking.startDate}</ListGroupItem>*/
                }
                {/*<ListGroupItem>End Date: {booking.endDate}</ListGroupItem>*/
                }
                {/*</ListGroup>*/
                }
                {/*))}*/
                }


                {/*</div>*/
                }
                {/*</div>*/
                }
            </div>
        );
    }

}

AvailableBooking = connect(
    state => ({}),
    dispatch => ({
        selectBooking: booking => dispatch(Users.Actions.selectBooking(booking))
    })
)(AvailableBooking);

export {AvailableBooking};



