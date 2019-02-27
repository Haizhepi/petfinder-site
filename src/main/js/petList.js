import React, {Component} from 'react';
import * as ReduxForm from 'redux-form';
import { connect } from 'react-redux';

import * as Users from 'js/users';

class PetList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pets: [] };
    }

    //set state as array of user's pets
    componentDidMount() {
            Users.Actions.getPets().then(response => {
                console.log(response);
                this.setState({pets: response});
            });
    }

    render() {
        return (
          <table>
          <tbody>{this.state.pets.map(function(pet, key) {

                   return (
                      <tr key = {key}>
                          <td>{pet.name}</td>
                          <td>{pet.type}</td>
                      </tr>
                    );
                 })}</tbody>
           </table>
        );
      }
}

export { PetList };
