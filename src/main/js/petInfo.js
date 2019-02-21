import React, {Component} from 'react';
import * as ReduxForm from 'redux-form';
import { connect } from 'react-redux';
import * as Bessemer from 'js/alloy/bessemer/components';

import * as Users from 'js/users';

class PetForm extends React.Component {
	onSubmit = pet => {
		return this.props.addPet(pet);
	};

	render() {
		let { handleSubmit, submitting } = this.props;

		return (
			<form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
				<Bessemer.Field name="petName" friendlyName="Pet Name"
					field={<input className="form-control" type="petName"/>}/>
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
		);
	}
}


PetForm = ReduxForm.reduxForm({form: 'addPet'})(PetForm);

PetForm = connect(
	state => ({
	}),
	dispatch => ({
		savePet: pet => dispatch(Users.Actions.savePet(pet))
	})
)(PetForm);

export { PetForm };