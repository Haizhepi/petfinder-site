import React, {Component} from 'react';
import * as ReduxForm from 'redux-form';
import { connect } from 'react-redux';
import * as Bessemer from 'js/alloy/bessemer/components';

import * as Users from 'js/users';

class PetForm extends React.Component {

	onSubmit = pet => {
	    Users.Actions.savePet(pet);
        //console.log('settings');
        //alert(this.props.user.principal);
		return Users.Actions.savePet(pet,this.props.user);
	};

	render() {
		let { handleSubmit, submitting } = this.props;

		return (
            <div id="parent">
                <div id="div1">
                    <form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>

                        <Bessemer.Field name="name" friendlyName="Pet Name"
                            field={<input className="form-control" type="name"/>}/>
                        <Bessemer.Field name="type" friendlyName="Pet Type"
                            field={<Bessemer.Select options={[{value: 'dog', label: 'Dog'},
                                {value: 'cat', label: 'Cat'}, {value: 'guinea pig', label: 'Guinea pig'},
                                {value: 'hamster', label: 'Hamster'},{value: 'mouse', label: 'Mouse'},
                                {value: 'rat', label: 'Rat'},{value: 'gerbil', label: 'Gerbil'},
                                {value: 'turtle', label: 'Turtle'},
                                {value: 'frog', label: 'Frog'},{value: 'lizard', label: 'Lizard'},
                                {value: 'snake', label: 'Snake'},{value: 'bird', label: 'Bird'},
                                {value: 'ferret', label: 'Ferret'},{value: 'rabbit', label: 'Rabbit'},
                                {value: 'hedgehog', label: 'Hedgehog'},{value: 'fish', label: 'Fish'},
                                {value: 'other', label: 'Other'},]}/>}/>


                        <Bessemer.Button loading={submitting}>Add Pet</Bessemer.Button>

                    </form>
                </div>
            </div>
		);
	}
}


PetForm = ReduxForm.reduxForm({form: 'savePet'})(PetForm);

PetForm = connect(
	state => ({
        authentication: Users.State.getAuthentication(state),
        user: Users.State.getUser(state)
	}),
	dispatch => ({
        savePet: pet => dispatch(Users.Actions.savePet(pet, this.props.user)),
        //addPetUser: pet => dispatch(Users.Actions.addPetUser(pet, this.props.user))
	})
)(PetForm);

export { PetForm };