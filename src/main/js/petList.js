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
    componentWillMount() {
            Users.Actions.getPets().then(response => {
                console.log(response);
                this.setState({pets: response});
            });
    }

    render() {
        return (
        <div>
            <p> this is a test </p>
          <div>{this.state.pets.map(function(pet) {
               return (
                  <div key = {pet.name} className="pet">
                      <p>{pet.name}</p>
                  </div>
                );
             })}
          </div>
        </div>
        );
      }
}

export { PetList };
