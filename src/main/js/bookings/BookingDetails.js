import React from 'react';
import * as Users from 'js/users';
import {
    Button,
    ListGroup,
    ListGroupItem,
    ButtonGroup,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    CardBody, CardTitle, CardSubtitle, Card, CardText, CardLink
} from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import _ from 'lodash';


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
        if (this.props.booking.status === 'UNSIGHED') {
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
        } else {
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
                        <Button color="danger" onClick={() => this.props.sitterCancel(this.props.booking)}>Cancel
                            this</Button>
                    </Link>
                </div>
            );
        }
    }
}

SitterDetails = connect(
    state => ({
        booking: Users.State.getActiveBooking(state),
        user: Users.State.getUser(state)
    }),
    dispatch => ({
        signUp: booking => dispatch(Users.Actions.signUpBooking(booking)),
        sitterCancel: booking => dispatch(Users.Actions.sitterCancel(booking))

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
            recommend: 'no name',
            applicant: [{name: 'you dont have any applicant yet'}],
            modal: false,
            sitters: []

        };
        this.toggle = this.toggle.bind(this);
        if (this.props.booking.waitingSitter) {
            for (let sitterId of this.props.booking.waitingSitter) {
                Users.Actions.getSitterInfo(sitterId).then(response => {
                    this.state.sitters.push(response);
                });
            }
            console.log('all sitters');

            console.log(this.state.sitters);
        }

    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    componentWillMount() {

        Users.Actions.getPetById(this.props.booking.petId).then(response => {
            this.setState({pet: response});
        });
    }

    render() {
        return (
            <div>
                <div id="p" className="col-6 offset-md-3">
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
                                        {this.props.booking.owner}
                                    </div>
                                </CardTitle>
                                <CardSubtitle className="bookingSub">
                                    <div className="petTable petCardMarginBottomSm">
                                        <div className="petCard">
                                            <Card style={{
                                                width: '150px',
                                                height: '80px',
                                                margin: '5px 0 5px 0',
                                                border: 'none',
                                            }}>
                                                <div className="cardBody">
                                                    <CardBody>
                                                        <CardTitle>{' ' + this.state.pet.name + ' '}</CardTitle>
                                                        <CardSubtitle>{' ' + this.state.pet.type + ' '}</CardSubtitle>
                                                        <CardText> {' '} </CardText>
                                                    </CardBody>
                                                </div>
                                            </Card>
                                        </div>
                                    </div>
                                </CardSubtitle>
                                {/*<CardSubtitle className="bookingSub">Status: {this.props.booking.status}</CardSubtitle>*/}
                                <CardSubtitle
                                    className="bookingSub">Description: {this.props.booking.description}</CardSubtitle>
                                <CardSubtitle
                                    className="bookingSub">From: {this.props.booking.startTime + '   ' + this.props.booking.startDate}</CardSubtitle>
                                <CardSubtitle
                                    className="bookingSub">To: {this.props.booking.endTime + '   ' + this.props.booking.endDate}</CardSubtitle>
                                <div>

                                    <div onClick={() => this.props.cancel(this.props.booking).then(response => {
                                        // alert('deleting');
                                    })}>
                                        <a href={'#/myBooking'} className="btnModal2">Cancel</a>
                                    </div>

                                    <div>
                                        <a href={'#/availableSitters'} className="btnModal2">Sitters Available</a>
                                    </div>

                                    <div onClick={() => this.props.finish(this.props.booking)}>
                                        <a href={'#/addRating'} className="btnModal2">Finish Booking</a>
                                    </div>


                                    {/*<Link to={'/myBooking'}>*/}
                                        {/*<Button className="buttonType2" onClick={() => this.props.cancel(this.props.booking).then(response => {*/}
                                            {/*// alert('deleting');*/}
                                        {/*})}>Cancel</Button>*/}
                                    {/*</Link>*/}
                                    {/*<Link to={'/availableSitters'}>*/}
                                        {/*<Button>View Sitters</Button>*/}
                                    {/*</Link>*/}
                                    {/*<Link to={'/addRating'}>*/}
                                        {/*<Button onClick={() => this.props.finish(this.props.booking)}>Finish Booking</Button>*/}
                                    {/*</Link>*/}
                                </div>
                            </CardBody>

                        </div>

                    </Card>

                    {/*<ListGroup>*/}
                    {/*<ListGroupItem>Owner: {this.props.booking.owner}</ListGroupItem>*/}
                    {/*<ListGroupItem>Pet: {this.props.booking.petId}</ListGroupItem>*/}
                    {/*<ListGroupItem>Time: {this.props.booking.time}</ListGroupItem>*/}
                    {/*<ListGroupItem>Des: {this.props.booking.description}</ListGroupItem>*/}
                    {/*<ListGroupItem>Start Time: {this.props.booking.startTime}</ListGroupItem>*/}
                    {/*<ListGroupItem>End Time: {this.props.booking.endTime}</ListGroupItem>*/}
                    {/*<ListGroupItem>Start Date: {this.props.booking.startDate}</ListGroupItem>*/}
                    {/*<ListGroupItem>End Date: {this.props.booking.endDate}</ListGroupItem>*/}
                    {/*</ListGroup>*/}


                    {
                        this.state.sitters.map(sitter => (
                            <div key={sitter.principal}>
                                <h2>{sitter.principal}</h2>
                                <ButtonGroup>
                                    <Button onClick={this.toggle}>{this.props.buttonLabel}>View Sitter Info</Button>
                                    <Modal isOpen={this.state.modal} toggle={this.toggle}
                                           className={this.props.className}>
                                        <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                                        <ModalBody>
                                            <ListGroup>
                                                <ListGroupItem>Sitter FirstName: {sitter.firstName}</ListGroupItem>
                                            </ListGroup>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                        </ModalFooter>
                                    </Modal>
                                    <Button onClick={() => {
                                        alert('approve sitter');
                                        this.props.approve(sitter, this.props.booking);
                                    }}>Approve</Button>
                                </ButtonGroup>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

OwnerDetails = connect(
    state => ({
        booking: Users.State.getActiveBooking(state),
        user: Users.State.getUser(state)
    }),
    dispatch => ({
        signUp: booking => dispatch(Users.Actions.signUpBooking(booking)),
        cancel: booking => dispatch(Users.Actions.cancelBooking(booking)),
        approve: (sitter, booking) => dispatch(Users.Actions.approveBooking(sitter, booking)),
        finish: booking => dispatch(Users.Actions.finish(booking))


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
            recommend: 'no name',
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
    state => ({
        booking: Users.State.getActiveBooking(state),
        user: Users.State.getUser(state)
    }),
    dispatch => ({
        signUp: booking => dispatch(Users.Actions.signUpBooking(booking))

    })
)(BookingDetail);

export {BookingDetail};


