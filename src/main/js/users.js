import axios from 'axios';
import React, {Component} from 'react';

class PetForm extends React.Component {
	/*onSubmit = user => {
		return this.props.addPet(pet);
	};
*/
	render() {
		let { handleSubmit, submitting } = this.props;

		return (
			<form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
				<Bessemer.Field name="petName" friendlyName="Pet Name"
								field={<input className="form-control" type="petName"/>}/>
				<Bessemer.Field name="type" friendlyName="Pet Type"
								field={<Bessemer.Select options={[{value: 'dog', label: 'Dog'},
											{value: 'cat', label: 'Cat'}, {value: 'guinea pig', label: 'Guinea pig'},
											{value: 'hamster', label: 'Hamster'},{value: 'Mouse', label: 'mouse'},
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

PetForm = ReduxForm.reduxForm({form: 'savePet'})(PetForm);

PetForm = connect(
	state => ({
	}),
	dispatch => ({
		savePet: pet => dispatch(Users.Actions.savePet(pet))
	})
)(PetForm);

export { PetForm };

export function register(user) {
	user.myNewField = 'Hello World!';
	return axios.post('/api/user/register', user);
}

export function authenticate(username, password) {
	return axios(
		{
			method: 'post',
			url: '/oauth/token',
			params: {
				'grant_type': 'password',
				username,
				password
			},
			auth: {
				username: 'petfinder-app',
				password: 'petfinder-app-secret'
			}
		}
	);
}

//post pet to user (UserEndpoint)
export function addPet(pet) {
    return axios.post('/api/user/pet', pet);
}

//get pets assigned to user (UserEndpoint)
export function getPets() {
    return axios.get('/api/user/pet');
}

export function getUserDetails() {
	return axios.get('/api/user');
}


let State = {};

State.getAuthentication = state => {
	return state.authentication;
};

State.getUser = state => {
	return state.user;
};

export { State };

let Actions = {};

Actions.Types = {
	SET_AUTHENTICATION: 'SET_AUTHENTICATION',
	SET_USER: 'SET_USER',
	SET_PET: 'SET_PET',
};

//save pet
Actions.savePet = pet => {
    return (dispatch) => {
        return savePet(pet).then(() => {
            return getPets().then(pet => {
            					dispatch(Actions.addPet(pet));
            				});
        )};

    };
};

Actions.register = user => {
	return (dispatch) => {
		return register(user).then(() => {
			return dispatch(Actions.authenticate(user.principal, user.password));
		});
	};
};

Actions.authenticate = (username, password) => {
	return (dispatch) => {
		return authenticate(username, password).then(
			authentication => {
				dispatch(Actions.setAuthentication(authentication));

				return getUserDetails().then(user => {
					dispatch(Actions.setUser(user));
				});
			}
		);
	};
};

Actions.logout = () => {
	return (dispatch) => {
		dispatch(Actions.setAuthentication(null));
		dispatch(Actions.setUser(null));
	};
};

Actions.setPet = pet => {
	return {type: Actions.Types.SET_PET, pet};
};

Actions.setAuthentication = authentication => {
	return {type: Actions.Types.SET_AUTHENTICATION, authentication};
};

Actions.setUser = user => {
	return {type: Actions.Types.SET_USER, user};
};

export { Actions };

let Reducers = {};

Reducers.authentication = (authentication = null, action) => {
	switch (action.type) {
		case Actions.Types.SET_AUTHENTICATION: {
			return action.authentication;
		}
		default: {
			return authentication;
		}
	}
};

Reducers.user = (user = null, action) => {
	switch (action.type) {
		case Actions.Types.SET_USER: {
			return action.user;
		}
		default: {
			return user;
		}
	}
};

Reducers.pet = (pet = null, action) => {
	switch (action.type) {
		case Actions.Types.SET_PET: {
			return action.pet;
		}
		default: {
			return pet;
		}
	}
};

export { Reducers };

