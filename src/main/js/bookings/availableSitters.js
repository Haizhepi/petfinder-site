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
import {AvailableBooking} from 'js/bookings/booking';
import {Button, Card, CardBody, CardLink, CardSubtitle, CardText, CardTitle, ListGroupItem} from 'reactstrap';

class AvailableSitter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sitters: null
        };
    }


    componentWillMount() {
        this.props.getAvailableSitters(this.props.booking.id).then(response => {
            console.log(response);
            this.setState({sitters: response});
        });

    }


    render() {
        console.log('xxxx');
        if (!this.state.sitters) {
            return (
                <div><h2>Pet finder could not find any matching sitters</h2></div>
            );
        }
        return (
            <div>
                <div className="title">Available Sitters</div>
                <div className="petTable petCardMarginBottom">
                    {this.state.sitters.map(sitterDate => (
                        <div className="invCard">
                            <Card style={{
                                minWidth: '300px',
                                width: '300px',
                                height: '150px',
                                margin: '5px 0 5px 0',
                                border: 'none'
                            }}>
                                <div className="cardBody">
                                    <CardBody>
                                        <CardTitle>{sitterDate.sitter.firstName + ' ' + sitterDate.sitter.lastName}</CardTitle>
                                        <CardSubtitle>{sitterDate.distance.toFixed(1) + ' miles away from you'}</CardSubtitle>
                                        <CardText> {sitterDate.sitter.firstName + ' is available between'} </CardText>
                                        <CardText> {sitterDate.availability.startDate + ' ' + sitterDate.availability.startTime + ' to ' + sitterDate.availability.endDate + ' ' + sitterDate.availability.endTime} </CardText>

                                        <div onClick={() => {
                                            this.props.invite(sitterDate.sitter.principal, this.props.booking.id);
                                        }}>
                                            <CardLink className="clm"
                                                      href={'#/bookingDetail'}>Invite
                                            </CardLink>
                                        </div>
                                    </CardBody>
                                </div>
                            </Card>

                        </div>
                    ))}
                </div>

            </div>
        );
    }
}

AvailableSitter = connect(
    state => ({
        booking: Users.State.getActiveBooking(state)
    }),
    dispatch => ({
        getAvailableSitters: bookingID => dispatch(Users.Actions.getAvailableSitters(bookingID)),
        invite: (sitter, bookingId) => dispatch(Users.Actions.inviteSitter(sitter, bookingId))
    })
)(AvailableSitter);

export {AvailableSitter};

