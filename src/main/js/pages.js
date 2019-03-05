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
    DropdownItem } from 'reactstrap';
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

    componentWillMount() {
        if (this.props.user) {
            if (this.props.user.type === 'SITTER') {
                this.setState({sitter: 'SITTER'});
            }
        }
    }
    render() {

        if (!(this.props.user)){
            return (
                <div className="container padded">
                    <div>
                        <Navbar color="light" light expand="md">
                            <NavbarBrand href="#/">Home Page</NavbarBrand>
                            <NavbarToggler onClick={this.toggle}/>
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink href="#/login">Login</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#/register">Register</NavLink>
                                    </NavItem>
                                    <UncontrolledDropdown nav inNavbar>
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
                </div>
            );
        }
        else {
            if (this.props.user.type === 'SITTER') {
                return (
                   <div>
                            <Navbar color="light" light expand="md">
                                <NavbarBrand href="#/">Welcome {this.props.user.firstName}</NavbarBrand>
                                <NavbarToggler onClick={this.toggle}/>
                                <Collapse isOpen={this.state.isOpen} navbar>
                                    <Nav className="ml-auto" navbar>
                                        <NavItem>
                                            <NavLink href="#/page-1">Page1</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#/homepage">Profile</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#/schedule">schedule</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#/viewSitter">view sitter info</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#/logout">Logout</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#/edit_profile">ChangeMyProfile</NavLink>
                                        </NavItem>
                                        <UncontrolledDropdown nav inNavbar>
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
                );
            }
            else if (this.props.user.type === 'OWNER') {
                return (
                    <div>
                        <Navbar color="light" light expand="md">
                            <NavbarBrand href="#/">Welcome {this.props.user.firstName}</NavbarBrand>
                            <NavbarToggler onClick={this.toggle}/>
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink href="#/page-1">Page1</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#/homepage">Profile</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#/page-3">Pet List</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#/pet">Add a pet</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#/logout">Logout</NavLink>
                                    </NavItem>
                                    <UncontrolledDropdown nav inNavbar>
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
                );
            }
            else {
                return (
                    <div>
                        <Navbar color="light" light expand="md">
                            <NavbarBrand href="#/">Welcome BOTH{this.props.user.firstName}</NavbarBrand>
                            <NavbarToggler onClick={this.toggle}/>
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink href="#/page-1">Page1</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#/homepage">Profile</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#/page-3">Pet List</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#/pet">Add a pet</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#/logout">Logout</NavLink>
                                    </NavItem>
                                    <UncontrolledDropdown nav inNavbar>
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
                );
            }
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
                            <h2>Edit the profile</h2>
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
            <div className="container padded">
                <h1>This is page 1</h1>
                <h2><Link to="/">home</Link></h2>

                {_.isDefined(this.props.authentication) &&
                <div>{this.props.authentication['access_token']}</div>
                }

                {_.isDefined(this.props.user) &&
                <div>Welcome, {this.props.user.principal}!</div>
                }
            </div>
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
            <div className="container padded">
                <h1>Owner Profile Page</h1>
                <Pets.PetForm/>
            </div>
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
            <div className="container padded">

                <h1>Pets</h1>
                <PetList.PetList/>
            </div>
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
            <div className="container padded">
                <div>
                    <Alert color="dark">You have been logged out.</Alert>
                    <Link to="/">
                        <Button color="danger">Return Home!</Button>
                    </Link>
                </div>
            </div>
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
            <div className="container padded">

                <h1>Set your availability</h1>
                <Avail.AvailabilityForm/>
            </div>
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
            <div>
                <h1>The Availability: </h1>
                <h1>{this.state.sitter.availability}</h1>
            </div>
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