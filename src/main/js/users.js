import axios from 'axios';
import React, {Component} from 'react';
import * as ReduxForm from 'redux-form';
import { connect } from 'react-redux';

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

//post pet to PetEndpoint
export function savePet(pet) {
    return axios.post('/api/pets', pet);
}

//post pet &user to UserEndpoint
export function addPetUser(petUser) {
	alert('posting to backend');
    return axios.post('/api/user/pet', petUser);
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

State.getPet = state => {
    return state.pet;
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
        alert(pet.name);
        return savePet(pet);
    };
};

// save the relation of pet and user
Actions.addPetUser = (pet, user) => {
	return (dispatch) => {
		alert(pet.type);
		return Actions.savePet(pet).then(() => {
		    alert(pet.name);
		    return addPetUser(petUser);
		});
	};
};


//get list of pets belonging to current user
Actions.getPetsFromUser = pets => {
    return (dispatch) => {
        return getPets();
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
