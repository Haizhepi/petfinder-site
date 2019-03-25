import React from 'react';
import {Redirect} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as ReduxForm from 'redux-form';
import {connect} from 'react-redux';
import * as Users from 'js/users';
import 'styles/main.scss';
import 'react-datepicker/src/stylesheets/datepicker.scss';


class AvailabilityForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            startTime: new Date(),
            endTime: new Date()

        };

        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange4 = this.handleChange4.bind(this);

    }

    handleChange1(date) {
        console.log('+');
        console.log(date);
        this.setState({
            startTime: date,
        });
    }
    handleChange2(date) {
        this.setState({
            endTime: date,
        });
    }
    handleChange3(date) {
        this.setState({
            startDate: date,
        });
    }
    handleChange4(date) {
        this.setState({
            endDate: date,
        });
    }
    //Defines the on submit behavior
    onSubmit = (form) => {
        let avail = {
            principal: this.props.user.principal,
            availability: form.availability
        };
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
            <div>

            <form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
                <Bessemer.Field name="availability" friendlyName="Enter availability"/>
                <div className="wrapper">
                    <DatePicker
                        selected={this.state.startTime}
                        onChange={this.handleChange1}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        dateFormat="h:mm aa"
                        timeCaption="Time"
                    />
                    <DatePicker
                        selected={this.state.endTime}
                        onChange={this.handleChange2}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        dateFormat="h:mm aa"
                        timeCaption="Time"
                    />
                    <DatePicker
                        selected={this.state.startDate}
                        selectsStart
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onChange={this.handleChange3}
                    />
                    <DatePicker
                        selected={this.state.endDate}
                        selectsEnd
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onChange={this.handleChange4}
                    />
                    <Bessemer.Button className="buttonType1" loading={submitting}>Confirm</Bessemer.Button>
                </div>
            </form>
            </div>
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



