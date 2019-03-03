import React, {Component} from 'react';
import * as Users from 'js/users';
import {connect} from 'react-redux';
import {EditProfileForm} from 'js/login';

class PetEdit extends React.Component {

    render() {
        if (!this.props.pet) {
            return (<h1>select a pet</h1>);
        }
        return (
            <div>
                <h2>NAME: {this.props.pet.name}</h2>
            </div>
        );
    }

}

PetEdit = connect(
    state => ({
        pet: Users.State.getActivePet(state)
    }),
    dispatch => ({})
)(PetEdit);

export { PetEdit };

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
                  <tr key = {pet.id} className="pet" onClick={() => this.props.selectPet(pet)}>
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
    state => ({

    }),
    dispatch => ({
        selectPet: pet => dispatch(Users.Actions.selectPet(pet))
    })

)(PetList);

export { PetList };



