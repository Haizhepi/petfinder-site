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
            <h1> Pet Profile </h1>
            <table style="width:80%">
                <thead>
                    <tr>
                        <th>Pet Name</th>
                        <th>Pet Type</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.pets.map(pet => (
                  <tr key = {pet.name} className="pet">
                      <td>{pet.name}</td>
                      <td>{pet.type}</td>
                  </tr>
                ))}
                </tbody>
            </table>

        </div>
        );
      }
}

export { PetList };
