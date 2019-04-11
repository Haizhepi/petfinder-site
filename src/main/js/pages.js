import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as Users from 'js/users';
import * as Login from 'js/login';
import * as Pets from 'js/petInfo';
import * as Rating from 'js/rating';
import * as PetList from 'js/petList';
import * as Avail from 'js/schedule';
import * as Booking from 'js/bookings/booking';

import * as Notification from 'js/notification';
import {NavBar} from 'js/navBar';

import {Alert, Button, ListGroup, ListGroupItem, Navbar} from 'reactstrap';

import 'styles/main.scss';
import {MyBookings} from 'js/bookings/MyBookings';
import {AvailableSitter} from 'js/bookings/availableSitters';
import {MyModal} from 'js/modal';
import 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {BookingDetail} from 'js/bookings/BookingDetails';
import {SignedBooking} from 'js/bookings/SignedBooking';
import {GoogleMapAPI} from 'js/googleMapAPI';
import {LocationSearchInput} from 'js/autoComplete';
import {WebHome} from 'js/webHome';
import {SidebarComponent} from 'js/mySidebar';
import {MyCard} from 'js/card';


export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentWillMount() {
        if (this.props.user) {
            if (this.props.user.type === 'SITTER') {
                this.setState({sitter: 'SITTER'});
            }
        }
    }

    render() {
        if (this.props.user) {
            if (this.props.user.type === 'SITTER') {
                return (
                    <section className="webWrapper">
                        <div className="barWrapper">
                            <SidebarComponent/>
                            <NavBar/>
                        </div>
                        <div className="middle">
                            <MyModal/>
                        </div>
                    </section>
                );
            } else if (this.props.user.type === 'OWNER') {
                return (
                    <section className="webWrapper">
                        <div className="barWrapper">
                            <SidebarComponent/>
                            <NavBar/>
                        </div>
                        <div className="middle">
                            <MyModal/>
                        </div>
                    </section>
                );
            } else {
                return (
                    <section className="webWrapper">
                        <div className="barWrapper">
                            <SidebarComponent/>
                            <NavBar/>
                        </div>
                        <div className="middle">
                            <MyModal/>
                            <MyCard/>
                        </div>
                    </section>
                );
            }
        } else {
            return (
                <section className="homepageWrapper">
                    <div className="barWrapper">
                        <SidebarComponent/>
                        <NavBar/>
                    </div>

                    <div className="middle">
                        <MyModal/>
                    </div>
                </section>
            );
        }
    }
}

Home = connect(
    state => ({
        authentication: Users.State.getAuthentication(state),
        user: Users.State.getUser(state)
    }),
    dispatch => ({
        register: user => dispatch(Users.Actions.register(user))
    })
)(Home);

let imgUrl = 'styles/bg1.jpg';

let styles = {
    backgroundImage: 'url(' + imgUrl + ')',
    backgroundSize: 'cover',
    overflow: 'hidden'
};


export class RegisterPage extends React.Component {

    render() {
        return (
            <section className="homepageWrapper">
                <SidebarComponent/>
                <NavBar/>
                <div className="container padded">
                    <div className="row">
                        <div className="col-6 offset-md-3" id="p">
                            <div className="title">Create Account</div>
                            <hr/>
                            <Login.RegistrationForm/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export class LoginPage extends React.Component {
    render() {
        return (
            <section className="homepageWrapper">
                <SidebarComponent/>
                <NavBar/>
                <div className="container padded">
                    <div className="row">
                        <div className="col-6 offset-md-3" id="p">
                            <div className="title">Sign In</div>
                            <hr/>
                            <Login.LoginForm/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export class EditProfilePage extends React.Component {
    render() {
        return (
            <section className="webWrapper">
                <SidebarComponent/>
                <NavBar/>
                <div className="container padded">
                    <div className="row">
                        <div className="col-6 offset-md-3" id="p">
                            <div className="title">Edit Your Profile</div>
                            <hr/>
                            <Login.EditProfileForm/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export class AddRating extends React.Component {
    render() {
        return (
            <section className="webWrapper">
                <SidebarComponent/>
                <NavBar/>
                <div className="container padded">
                    <div className="row">
                        <div className="col-6 offset-md-3" id="p">
                            <div className="title">Add a Rating</div>
                            <hr/>
                            <Rating.LeaveRating/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export class GoogleMap extends React.Component {
    render() {
        return (
            <section className="webWrapper">
                <SidebarComponent/>
                <NavBar/>
                <GoogleMapAPI/>
            </section>
        );
    }
}

export class SearchBox extends React.Component {
    render() {
        return (
            <section className="webWrapper">
                <SidebarComponent/>
                <NavBar/>
                <LocationSearchInput/>
            </section>
        );
    }
}

class Page1 extends React.Component {
    render() {
        return (
            <section className="webWrapper">
                <SidebarComponent/>
                <NavBar/>
                <div className="container padded">
                    <h1>This is page 1</h1>
                    <h2><Link to="/">home</Link></h2>

                    {_.isDefined(this.props.authentication) &&
                    <div>{this.props.authentication['access_token']}</div>
                    }

                    {_.isDefined(this.props.user) &&
                    <div>Welcome,{this.props.user.principal}!</div>
                    }
                </div>
            </section>
        );
    }
}

Page1 = connect(
    state => ({
        authentication: Users.State.getAuthentication(state),
        user: Users.State.getUser(state)
    })
)(Page1);

export {Page1};

class PetForm extends React.Component {
    render() {
        return (
            <section className="webWrapper">
                <SidebarComponent/>
                <NavBar/>
                <div className="container padded">
                    <div className="row">
                        <div className="col-6 offset-md-3" id="p">
                            <div className="title">Add a New Pet</div>
                            <Pets.PetForm/>
                        </div>
                    </div>

                </div>
            </section>
        );
    }
}

PetForm = connect(
    state => ({
        authentication: Users.State.getAuthentication(state),
        user: Users.State.getUser(state),
        pet: Users.State.getPet(state)
    })
)(PetForm);

export {PetForm};

class PetListing extends React.Component {

    render() {
        return (
            <section className="webWrapper">
                <SidebarComponent/>
                <NavBar/>
                <div className="container padded">
                    <div className="row">
                        <div className="col-6 offset-md-3" id="p">
                            <div className="title">Pets</div>
                            <hr/>
                            <PetList.PetList/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

PetListing = connect(
    state => ({
        authentication: Users.State.getAuthentication(state),
        user: Users.State.getUser(state),
        pet: Users.State.getPet(state)
    })
)(PetListing);
export {PetListing};

class AddBooking extends React.Component {

    render() {
        return (
            <section className="webWrapper">
                <SidebarComponent/>
                <NavBar/>
                <div className="container padded">
                    <Booking.BookingForm/>
                </div>
            </section>
        );
    }
}

AddBooking = connect(
    state => ({
        authentication: Users.State.getAuthentication(state),
        user: Users.State.getUser(state),
        pet: Users.State.getPet(state)
    })
)(AddBooking);
export {AddBooking};


export class Homepage extends React.Component {
    render() {
        return (
            <section className="webWrapper">
                <SidebarComponent/>
                <NavBar/>
                <div className="container padded">
                    <h1>Home Page</h1>
                    {_.isDefined(this.props.authentication) &&
                    <div>
                        <h1>This is Ur User Profile</h1>
                        <ListGroup>
                            <ListGroupItem>FirstName: {this.props.user.firstName}</ListGroupItem>
                            <ListGroupItem>Last Name: {this.props.user.lastName}</ListGroupItem>
                            <ListGroupItem>Gender: {this.props.user.gender}</ListGroupItem>
                            <ListGroupItem>Zip Code: {this.props.user.zipcode}</ListGroupItem>
                        </ListGroup>
                    </div>
                    }
                </div>
            </section>
        );
    }
}

Homepage = connect(
    state => ({
        authentication: Users.State.getAuthentication(state),
        user: Users.State.getUser(state),
        pet: Users.State.getPet(state)
    })
)(Homepage);


export class MyBooking extends React.Component {
    render() {

        return (
            <section className="webWrapper">
                <SidebarComponent/>
                <NavBar/>
                <div className="container padded">
                    <MyBookings/>
                </div>
            </section>
        );
    }
}

MyBooking = connect(
    state => ({})
)(MyBooking);

export class AvailableBooking extends React.Component {
    render() {

        return (
            <section className="webWrapper">
                <SidebarComponent/>
                <NavBar/>
                <div className="container padded">
                    <Booking.AvailableBooking/>
                </div>
            </section>
        );
    }
}

export class SitterBooking extends React.Component {
    render() {

        return (
            <section className="webWrapper">
                <SidebarComponent/>
                <NavBar/>
                <div className="container padded">
                    <SignedBooking/>
                </div>
            </section>
        );
    }
}

export class AvailableSittersPage extends React.Component {
    render() {

        return (
            <section className="webWrapper">
                <SidebarComponent/>
                <NavBar/>
                <div className="container padded">
                    <AvailableSitter/>
                </div>
            </section>
        );
    }
}

export class BookingDetailPage extends React.Component {
    render() {

        return (
            <section className="webWrapper">
                <SidebarComponent/>
                <NavBar/>
                <div className="container padded">
                    <BookingDetail/>
                </div>
            </section>
        );
    }
}

export class Notifications extends React.Component {
    render() {
        return (
            <section className="webWrapper">
                <SidebarComponent/>
                <NavBar/>
                <div className="container padded">
                    <Notification.NotificationCenter/>
                </div>
            </section>
        );
    }
}

export class Logout extends React.Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        if (this.props.user != null) {
            this.props.logout();
        }
    }

    render() {
        return (
            <section className="webWrapper">
                <SidebarComponent/>
                <NavBar/>
                <div className="container padded">
                    <div>
                        <Alert color="dark">You have been logged out.</Alert>
                        <Link to="/">
                            <Button color="danger">Return Home!</Button>
                        </Link>
                    </div>
                </div>
            </section>
        );
    }
}

Logout = connect(
    state => ({
        authentication: Users.State.getAuthentication(state),
        user: Users.State.getUser(state),
        pet: Users.State.getPet(state)
    }),
    dispatch => ({
        logout: () => dispatch(Users.Actions.logout())
    })
)(Logout);

export class Availability extends React.Component {
    render() {
        return (
            <section className="webWrapper">
                <SidebarComponent/>
                <NavBar/>
                <div className="container padded">
                    <Avail.AvailabilityForm/>
                </div>
            </section>
        );
    }
}

Availability = connect(
    state => ({
        authentication: Users.State.getAuthentication(state),
        user: Users.State.getUser(state)
    })
)(Availability);

export class ViewSitter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sitter: [{
                availability: 'no name'
            }],
            invitation: []
        };
    }

    componentWillMount() {
        Users.Actions.getSitter(this.props.user.principal).then(response => {
            console.log(response);
            this.setState({sitter: response});
        });
        this.props.getInvitation().then(response => {
            console.log('invi');
            console.log(response);
            this.setState({invitation: response});

        });
    }

    render() {

        return (
            <section className="webWrapper">
                <SidebarComponent/>
                <NavBar/>
                <div className="container padded">
                    <h1>The Availability: </h1>
                    <h1>{this.state.sitter.startDate}</h1>
                    <h1>{this.state.sitter.endDate}</h1>
                    <h1>{this.state.sitter.startTime}</h1>
                    <h1>{this.state.sitter.endTime}</h1>
                    <h1>{this.state.sitter.availability}</h1>
                    <h1>Invitations</h1>
                    {this.state.invitation.map(booking => (
                        <div>
                            <ListGroup>
                                <ListGroupItem>Invitation {booking.owner}</ListGroupItem>
                            </ListGroup>

                            <Link to={'/'}>
                                <Button onClick={() => {
                                    this.props.confirm(booking);
                                }}>Confirm</Button>
                            </Link>
                        </div>
                    ))}

                </div>
            </section>
        );
    }
}

ViewSitter = connect(
    state => ({
        authentication: Users.State.getAuthentication(state),
        user: Users.State.getUser(state)
    }),
    dispatch => ({
        //getSitter: (user) => dispatch(Users.Actions.getSitter(user))
        getInvitation: () => dispatch(Users.Actions.getInvitation()),
        confirm: (booking) => dispatch(Users.Actions.confirm(booking))
    })
)(ViewSitter);

