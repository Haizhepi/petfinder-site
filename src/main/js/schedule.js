import React from 'react';
import {Redirect} from 'react-router-dom';
import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as ReduxForm from 'redux-form';
import {connect} from 'react-redux';
import * as Users from 'js/users';
import 'styles/main.scss';


class AvailabilityForm extends React.Component {

    //Defines the on submit behavior
    onSubmit = (form) => {
        let avail = {
            principal: this.props.user.principal,
            availability: form.availability
        };
        alert('here');
        console.log('here');
        console.log(avail);
        return this.props.addAvail(avail);
    };

    render() {
        let {handleSubmit, submitting} = this.props;

        if (submitting) {
            if (this.props.authentication != null) {
                this.forceUpdate();
                return <Redirect to={'/'}/>;
            }
        }

        return (
            <form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
                <Bessemer.Field name="availability" friendlyName="Enter availability"/>
                <div className="wrapper">
                    <Bessemer.Button className="buttonType1" loading={submitting}>Sign In</Bessemer.Button>
                </div>
            </form>
        );
    }
}

AvailabilityForm = ReduxForm.reduxForm({form: 'availability'})(AvailabilityForm);

AvailabilityForm = connect(
    state => ({
        initialValues: {principal: '', password: ''},
        authentication: Users.State.getAuthentication(state),
        user: Users.State.getUser(state)

    }),
    dispatch => ({
        addAvail: (avail) => dispatch(Users.Actions.addAvail(avail))
    })
)(AvailabilityForm);

export {AvailabilityForm};

