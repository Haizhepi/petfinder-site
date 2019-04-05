import React from 'react';
import {
    Collapse, DropdownItem, DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    UncontrolledDropdown
} from 'reactstrap';

import {connect} from 'react-redux';
import * as Users from 'js/users';
import _ from 'lodash';

export class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            isOpen: false,
            seconds: 0
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillMount() {
        clearInterval(this.interval);
        if (this.props.user) {
            if (this.props.user.type === 'SITTER') {
                this.setState({sitter: 'SITTER'});
            }
        }
    }

    tick() {
        this.setState(prevState => ({
            seconds: prevState.seconds + 1
        }));
    }

    render() {
        if (this.props.user) {
            if (this.state.seconds % 10 === 0) {
                Users.Actions.getNotifications(this.props.user).then(response => {
                    this.props.getNotis(response);
                });

                if (this.props.noti){
                    console.log('check');
                    console.log(this.props.noti);
                }
                this.tick();


            }
            if (this.props.user.type === 'SITTER') {
                return (
                    <Navbar light expand="md" className="navBar">
                        <h1 className="animated 1 fadeInLeft">
                            <NavbarBrand  className="fas fa-home navTitle" href="/"> Welcome, {this.props.user.firstName} </NavbarBrand>
                        </h1>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="#/homepage" className="navText">Profile</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#/edit_profile" className="navText">Edit Profile</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#/schedule" className="navText">Schedule</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#/viewSitter" className="navText">Sitter Information</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#/logout" className="navText">Logout</NavLink>
                                </NavItem>
                                <UncontrolledDropdown nav inNavbar className="navText">
                                    <DropdownToggle nav caret>
                                        More
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <NavItem>
                                            <NavLink href="#/signedBooking" className="navText">Signed Booking</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#/availableBooking" className="navText">View Booking</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#/notification" className="navText">Notification</NavLink>
                                        </NavItem>
                                        <DropdownItem divider/>
                                        <DropdownItem>
                                            Reset
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </Navbar>
                );
            } else if (this.props.user.type === 'OWNER') {
                return (
                    <Navbar light expand="md" className="navBar">
                        <h1 className="animated 1 fadeInLeft">
                            <NavbarBrand  className="fas fa-home navTitle" href="/">  Welcome, {this.props.user.firstName} </NavbarBrand>
                        </h1>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="#/homepage" className="navText">Profile</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#/page-3" className="navText">My Pets</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#/pet" className="navText">Add a Pet</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#/edit_profile" className="navText">Edit Profile</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#/logout" className="navText">Logout</NavLink>
                                </NavItem>
                                <UncontrolledDropdown nav inNavbar className="navText">
                                    <DropdownToggle nav caret>
                                        More
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <NavItem>
                                            <NavLink href="#/addBooking" className="navText">Add Booking</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#/myBooking" className="navText">My Booking</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#/notification" className="navText">Notification</NavLink>
                                        </NavItem>
                                        <DropdownItem divider/>
                                        <DropdownItem>
                                            Reset
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </Navbar>
                );
            } else {
                return (
                    <Navbar light expand="md" className="navBar">
                        <h1 className="animated 1 fadeInLeft">
                            <NavbarBrand  className="fas fa-home navTitle" href="/">  Welcome, {this.props.user.firstName} </NavbarBrand>
                        </h1>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="#/homepage" className="navText">Profile</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#/page-3" className="navText">My Pets</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#/pet" className="navText">Add a Pet</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#/schedule" className="navText">Schedule</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#/edit_profile" className="navText">Edit Profile</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#/viewSitter" className="navText">Sitter Information</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#/logout" className="navText">Logout</NavLink>
                                </NavItem>
                                <UncontrolledDropdown nav inNavbar className="navText">
                                    <DropdownToggle nav caret>
                                        More
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <NavItem>
                                            <NavLink href="#/addBooking" className="navText">Add Booking</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#/myBooking" className="navText">My Booking</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#/availableBooking" className="navText">View Booking</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#/notification" className="navText">Notification</NavLink>
                                        </NavItem>
                                        <DropdownItem divider/>
                                        <DropdownItem>
                                            Reset
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </Navbar>
                );
            }
        } else {

            return (

                <Navbar light expand="md" className="navBar">
                    <h1 className="animated 1 fadeInLeft">
                        <NavbarBrand className="navTitle" href="/">Welcome to PetFinder{_.isDefined(this.state.seconds)}</NavbarBrand>
                    </h1>

                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="#/login" className="navText">LOG IN</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/register" className="navText">SIGN UP</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar className="navText">
                                <DropdownToggle nav caret>MORE</DropdownToggle>
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
            );
        }
    }
}

NavBar = connect(
    state => ({
        authentication: Users.State.getAuthentication(state),
        user: Users.State.getUser(state),
        noti: Users.State.getNewNoti(state)
    }),
    dispatch => ({
        register: user => dispatch(Users.Actions.register(user)),
        getNotis: (noti) => dispatch(Users.Actions.newNotis(noti))
    })
)(NavBar);