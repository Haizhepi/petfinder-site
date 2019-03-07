import _ from 'lodash';
import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as Users from 'js/users';
import * as Login from 'js/login';
import * as Pets from 'js/petInfo';
import * as PetList from 'js/petList';
import * as Avail from 'js/schedule';
import {Actions} from 'js/users';

import {
    Alert,
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import 'styles/main.scss';

/*
import Background from 'styles/bg3.png';

let sectionStyle = {
    width: '100%',
    height: '100%',
    backgroundImage: `url(${Background})`,
    backgroundSize: '1500px',
    backgroundPosition: 'center',
};

*/

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

    render() {
        return (
            <section className="webWrapper">
                <div className="container padded">
                    {_.isDefined(this.props.user) && <div>
                        <Navbar light expand="md" className="navBar">
                            <NavbarBrand href="/">Welcome, {this.props.user.firstName}</NavbarBrand>
                            <NavbarToggler onClick={this.toggle}/>
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink href="#/page-1" className="navText">Page1</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#/homepage" className="navText">Profile</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#/page-3" className="navText">Pet List</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#/pet" className="navText">Add a Pet</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#/schedule" className="navText">Schedule</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#/viewSitter" className="navText">View Sitter Info</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#/logout" className="navText">Logout</NavLink>
                                    </NavItem>
                                    <UncontrolledDropdown nav inNavbar  className="navText">
                                        <DropdownToggle nav caret>
                                            Options
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>
                                                Option 1
                                            </DropdownItem>
                                            <DropdownItem>
                                                Option 2
                                            </DropdownItem>
                                            <DropdownItem divider/>
                                            <DropdownItem>
                                                Reset
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </div>
                    }
                    {this.props.user == null &&
                    <div>
                        <Navbar light expand="md" className="navBar" >
                            <NavbarBrand href="/">Home Page</NavbarBrand>
                            <NavbarToggler onClick={this.toggle}/>
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink href="#/login" className="navText">Login</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#/register" className="navText">Register</NavLink>
                                    </NavItem>
                                    <UncontrolledDropdown nav inNavbar  className="navText">
                                        <DropdownToggle nav caret>
                                            Options
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>
                                                Option 1
                                            </DropdownItem>
                                            <DropdownItem>
                                                Option 2
                                            </DropdownItem>
                                            <DropdownItem divider/>
                                            <DropdownItem>
                                                Reset
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>
                            </Collapse>
                        </Navbar>

                    </div>
                    }
                </div>
            </section>
        );
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
            <section className="webWrapper">
                <div className="container padded">
                    <div className="row">
                        <div className="col-6 offset-md-3" id="p">
                            <div className="title">Sign up</div>
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
            <section className="webWrapper">
                <div className="container padded">
                    <div className="row">
                        <div className="col-6 offset-md-3" id="p">
                            <div className="title">Login</div>
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
                <div className="container padded">
                    <div className="row">
                        <div className="col-6 offset-md-3" id="p">
                            <div className="title">Edit the profile</div>
                            <hr/>
                            <Login.EditProfileForm/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


class Page1 extends React.Component {
    render() {
        return (
            <section className="webWrapper">
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

class Page2 extends React.Component {
    render() {
        return (
            <section className="webWrapper">
                <div className="container padded">
                    <h1>Owner Profile Page</h1>
                    <Pets.PetForm/>
                </div>
            </section>
        );
    }
}

Page2 = connect(
    state => ({
        authentication: Users.State.getAuthentication(state),
        user: Users.State.getUser(state),
        pet: Users.State.getPet(state)
    })
)(Page2);

export {Page2};

class Page3 extends React.Component {


    render() {
        return (
            <section className="webWrapper">
                <div className="container padded">

                    <h1>Pets</h1>
                    <PetList.PetList/>
                </div>
            </section>
        );
    }
}

Page3 = connect(
    state => ({
        authentication: Users.State.getAuthentication(state),
        user: Users.State.getUser(state),
        pet: Users.State.getPet(state)
    })
)(Page3);
export {Page3};


export class Homepage extends React.Component {
    render() {


        return (
            <section className="webWrapper">
                <div className="container padded">
                    <h1>Home Page</h1>
                    {_.isDefined(this.props.authentication) &&
                    <div><h1>This is Ur User Profile</h1>
                        <ul>
                            <li>{this.props.user.firstName}</li>
                            <li>{this.props.user.lastName}</li>
                            <li>{this.props.user.gender}</li>
                            <li>{this.props.user.zipcode}</li>
                        </ul>
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
                <div className="container padded">
                    <h1>Set your availability</h1>
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
            }]
        };
    }

    componentWillMount() {
        Users.Actions.getSitter(this.props.user.principal).then(response => {
            console.log('?????');
            console.log(response);
            this.setState({sitter: response});
        });
    }

    render() {
        return (
            <section className="webWrapper">
                <div>
                    <h1>The Availability: </h1>
                    <h1>{this.state.sitter.availability}</h1>
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
    })
)(ViewSitter);