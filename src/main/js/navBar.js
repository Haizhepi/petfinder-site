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

export class NavBar extends React.Component {
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
                    <Navbar light expand="md" className="navBar">
                        <h1 className="animated 1 fadeInLeft">
                            <NavbarBrand href="/">Welcome, {this.props.user.firstName}</NavbarBrand>
                        </h1>
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
                                    <NavLink href="#/edit_profile" className="navText">Edit Profile</NavLink>
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
                                <UncontrolledDropdown nav inNavbar className="navText">
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
                );
            } else if (this.props.user.type === 'OWNER') {
                return (
                    <Navbar light expand="md" className="navBar">
                        <h1 className="animated 1 fadeInLeft">
                            <NavbarBrand href="/">Welcome, {this.props.user.firstName}</NavbarBrand>
                        </h1>
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
                                    <NavLink href="#/edit_profile" className="navText">Edit Profile</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#/logout" className="navText">Logout</NavLink>
                                </NavItem>
                                <UncontrolledDropdown nav inNavbar className="navText">
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
                );
            } else {
                return (
                    <Navbar light expand="md" className="navBar">
                        <h1 className="animated 1 fadeInLeft">
                            <NavbarBrand href="/">Welcome, {this.props.user.firstName}</NavbarBrand>
                        </h1>
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
                                    <NavLink href="#/edit_profile" className="navText">Edit Profile</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#/viewSitter" className="navText">View Sitter Info</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="#/logout" className="navText">Logout</NavLink>
                                </NavItem>
                                <UncontrolledDropdown nav inNavbar className="navText">
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
                );
            }
        } else {
            return (
                <Navbar light expand="md" className="navBar">
                    <h1 className="animated 1 fadeInLeft delay-1s">
                        <NavbarBrand href="/">Welcome to PetFinder</NavbarBrand>
                    </h1>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="#/login" className="navText">Login</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#/register" className="navText">Register</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar className="navText">
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
            );
        }
    }
}

NavBar = connect(
    state => ({
        authentication: Users.State.getAuthentication(state),
        user: Users.State.getUser(state)
    }),
    dispatch => ({
        register: user => dispatch(Users.Actions.register(user))
    })
)(NavBar);