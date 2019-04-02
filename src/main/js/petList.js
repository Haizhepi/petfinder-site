import React, {Component} from 'react';
import * as Users from 'js/users';
import {connect} from 'react-redux';
import {EditProfileForm} from 'js/login';
import * as Bessemer from 'js/alloy/bessemer/components';

import * as Validation from 'js/alloy/utils/validation';
import * as ReduxForm from 'redux-form';

class PetEdit extends React.Component {

    onSubmit = pet => {
        let newPet = this.props.pet;
        newPet.name = pet.name;
        newPet.type = pet.type;
        newPet.preference = pet.preference;
        this.props.editPet(newPet);
    };

    render() {
        let {handleSubmit, submitting} = this.props;
        if (!this.props.pet) {
            return (<h1>select a pet</h1>);
        }
        console.log(this.props.initialValues);
        return (
            <div>
                <h2>Pet: {this.props.pet.name}</h2>
                <form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
                    <Bessemer.Field name="name" friendlyName="Pet Name" value="????" className="form-control"/>

                    <Bessemer.Field name="type" friendlyName="Pet Type" className="form-control"/>
                    <div className="wrapper">
                        <Bessemer.Button className="buttonType1" loading={submitting}>Save Changes</Bessemer.Button>
                    </div>
                </form>
            </div>
        );
    }
}

PetEdit = ReduxForm.reduxForm({form: 'petEdit'})(PetEdit);


PetEdit = connect(
    state => ({
        initialValues: {
            name: Users.State.getActivePet(state).name,
            type: Users.State.getActivePet(state).type
        },
        pet: Users.State.getActivePet(state)
    }),
    dispatch => ({
        editPet: pet => dispatch(Users.Actions.editPet(pet))
    })
)(PetEdit);

export {PetEdit};

class PetList extends React.Component {
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

    render() {
        return (
            <div>
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
                <h1> Pet detail </h1>
                <PetEdit/>
            </div>
        );
    }
}

PetList = connect(
    state => ({}),
    dispatch => ({
        selectPet: pet => dispatch(Users.Actions.selectPet(pet))
    })
)(PetList);

export {PetList};



