import React, {Component} from 'react';
import * as Users from 'js/users';

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
                console.log(response);
                this.setState({pets: response});
            });
    }

    render() {
        return (
        <div>
            <p> this is a test </p>
            {this.state.pets.map(pet => (
              <div key = {pet.name} className="pet">
                  <p>{pet.name}</p>
              </div>
            ))}
        </div>
        );
      }
}

export { PetList };
