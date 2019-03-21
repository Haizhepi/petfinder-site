import React from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {connect} from 'react-redux';
import * as Users from 'js/users';


export class MyModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
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
                    <section>
                        <a onClick={this.toggle} className="btn btn1">Start as Pet Sitter</a>

                        <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-dialog-centered">
                            <div className="mtitle">
                                <ModalHeader toggle={this.toggle}>What would you like to do?</ModalHeader>
                            </div>

                            <ModalBody className="mbody">

                                <a href={'#/notification'} onClick={this.toggle} className="btnModal">Notifications</a>
                                <a href={'#/availableBooking'} onClick={this.toggle} className="btnModal">View Booking</a>

                            </ModalBody>
                        </Modal>
                    </section>
                );

            } else if (this.props.user.type === 'OWNER') {
                return (
                    <section>
                        <a onClick={this.toggle} className="btn btn1">Start as Pet Owner</a>


                        <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-dialog-centered">
                            <div className="mtitle">
                                <ModalHeader toggle={this.toggle}>What would you like to do?</ModalHeader>
                            </div>

                            <ModalBody className="mbody">
                                <a href={'#/addBooking'} onClick={this.toggle} className="btnModal">Add Booking</a>
                                <a href={'#/myBooking'} onClick={this.toggle} className="btnModal">My Booking</a>
                                <a href={'#/notification'} onClick={this.toggle} className="btnModal">Notifications</a>
                            </ModalBody>
                        </Modal>
                    </section>
                );

            } else {
                return (
                    <section>
                        <a onClick={this.toggle} className="btn btn1">   Start   </a>

                        <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-dialog-centered">
                            <div className="mtitle">
                                <ModalHeader toggle={this.toggle}>What would you like to do?</ModalHeader>
                            </div>

                            <ModalBody className="mbody">

                                <a href={'#/addBooking'} onClick={this.toggle} className="btnModal">Add Booking</a>
                                <a href={'#/myBooking'} onClick={this.toggle} className="btnModal">My Booking</a>
                                <a href={'#/notification'} onClick={this.toggle} className="btnModal">Notifications</a>
                                <a href={'#/availableBooking'} onClick={this.toggle} className="btnModal">View Booking</a>

                            </ModalBody>
                        </Modal>
                    </section>
                );

            }

        } else {
            return (
                <section>
                    <a onClick={this.toggle} className="btn btn1"> What is PetFinder? </a>
                    <a onClick={this.toggle} className="btn btn1"> Why PetFinder? </a>

                    <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-dialog-centered">
                        <div className="mtitle">
                            <ModalHeader toggle={this.toggle}>Begin Your Experience Today</ModalHeader>
                        </div>

                            <ModalBody className="mbody">
                                <div>
                                    PetFinder matches pet owners with sitters who request for pet sitting through our
                                    website,
                                    and owners pay through the website.
                                </div>
                                <div className="space">

                                </div>
                                <div>
                                    Sitters make more money
                                </div>

                                <div className="space">

                                </div>
                                <div>
                                    Owners have more free time
                                </div>

                        </ModalBody>
                    </Modal>
                </section>
            );
        }
    }
}

MyModal = connect(
    state => ({
        authentication: Users.State.getAuthentication(state),
        user: Users.State.getUser(state)
    }),
    dispatch => ({
        register: user => dispatch(Users.Actions.register(user))
    })
)(MyModal);