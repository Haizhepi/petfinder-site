import React from 'react';
import * as ReduxForm from 'redux-form';

import {connect} from 'react-redux';

import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';
import {Redirect} from 'react-router-dom';
import * as Users from 'js/users';
import classNames from 'classnames';

import * as Apps from 'js/app.js';


import 'styles/main.scss';

import {Animated} from 'react-animated-css';
import {PetEdit, PetList} from 'js/petList';

class BookingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pets: [{
                name: 'no name'
            }]
        };
    }

    //set state as array of user's pets
    componentWillMount() {
        Users.Actions.getPets().then(response => {
            this.setState({pets: response});
        });
    }

    onSubmit = booking => {
        booking.owner = this.props.user.principal;
        booking.petId = this.props.pet.petId;
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