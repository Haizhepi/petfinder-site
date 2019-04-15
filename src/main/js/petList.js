import React, {Component} from 'react';
import * as Users from 'js/users';
import {connect} from 'react-redux';
import {EditProfileForm} from 'js/login';
import * as Bessemer from 'js/alloy/bessemer/components';
import {Redirect} from 'react-router-dom';

import * as Validation from 'js/alloy/utils/validation';
import * as ReduxForm from 'redux-form';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardLink
} from 'reactstrap';

import {Container, Row, Col} from 'reactstrap';
import {SidebarComponent} from 'js/mySidebar';
import {NavBar} from 'js/navBar';


export class PetEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {hasSubmitSucceeded: false};
    }

    onSubmit = pet => {
        let newPet = this.props.pet;
        newPet.name = pet.name;
        newPet.type = pet.type;
        newPet.preference = pet.preference;
        this.props.editPet(newPet).then(this.setState({hasSubmitSucceeded: true}));
    };

    render() {

        let {handleSubmit, submitting} = this.props;

        if (!this.props.pet) {
            return (<h1>Select a pet</h1>);
        }

        if (this.state.hasSubmitSucceeded) {
            //alert('success');
            return <Redirect to={'/page-3'}/>;
        }

        console.log(this.props.initialValues);
        return (
            <section className="webWrapper">
                <SidebarComponent/>
                <NavBar/>
                <div className="container padded middleWrapperNotAlign">
                    <div className="row">
                        <div className="col-6 offset-md-3" id="p">
                            <h2>Edit Pet: {this.props.pet.name}</h2>
                            <form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
                                <Bessemer.Field name="name" friendlyName="Pet Name" value="????"
                                                className="form-control"/>

                                <Bessemer.Field name="type" friendlyName="Pet Type"
                                                field={<Bessemer.Select options={[{value: 'dog', label: 'Dog'},
                                                    {value: 'cat', label: 'Cat'}, {
                                                        value: 'guinea pig',
                                                        label: 'Guinea pig'
                                                    },
                                                    {value: 'hamster', label: 'Hamster'}, {
                                                        value: 'mouse',
                                                        label: 'Mouse'
                                                    },
                                                    {value: 'rat', label: 'Rat'}, {value: 'gerbil', label: 'Gerbil'},
                                                    {value: 'turtle', label: 'Turtle'},
                                                    {value: 'frog', label: 'Frog'}, {value: 'lizard', label: 'Lizard'},
                                                    {value: 'snake', label: 'Snake'}, {value: 'bird', label: 'Bird'},
                                                    {value: 'ferret', label: 'Ferret'}, {
                                                        value: 'rabbit',
                                                        label: 'Rabbit'
                                                    },
                                                    {value: 'hedgehog', label: 'Hedgehog'}, {
                                                        value: 'fish',
                                                        label: 'Fish'
                                                    },
                                                    {value: 'other', label: 'Other'},]}/>}
                                />
                                <Bessemer.Field name="preference" friendlyName="Preference" value="???"
                                                className="form-control"/>
                                                {/*// field={<input className="form-control" type="name"/>}/>*/}
                                <div className="wrapper">
                                    <Bessemer.Button className="buttonType1" loading={submitting}>
                                        Save Changes
                                    </Bessemer.Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

PetEdit = ReduxForm.reduxForm({form: 'petEdit'})(PetEdit);


PetEdit = connect(
    state => ({
        initialValues: {
            name: Users.State.getActivePet(state).name,
            type: Users.State.getActivePet(state).type,
            preference: Users.State.getActivePet(state).preference
        },
        pet: Users.State.getActivePet(state)
    }),
    dispatch => ({
        editPet: pet => dispatch(Users.Actions.editPet(pet))
    })
)(PetEdit);


export class PetList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pets: [{
                name: 'no name'
            }],
            deleted: false
        };
    }

    handleClick = pet => {
        let newPet = this.props.pet;
        newPet.name = pet.name;
        newPet.type = pet.type;
        newPet.preference = pet.preference;
        this.setState({deleted: true});
    };

    //set state as array of user's pets
    componentWillMount() {
        Users.Actions.getPets().then(response => {
            this.setState({pets: response});
            console.log('size ' + this.state.pets.length);
        });
    }

    render() {
        let {handleSubmit, submitting} = this.props;

        if (this.state.deleted) {
            //alert('success');
            return <Redirect to={'/page-3'}/>;
        }

        return (
            <div className="petTable">
                <table className="actualPetTable">
                    <div className="petTableBody">
                        <tbody>
                        {this.state.pets.map(pet => (
                            <div className="petCard" key={pet.id} onClick={() => this.props.selectPet(pet)}>

                                <Card style={{
                                    width: '150px',
                                    height: '150px',
                                    margin: '5px 0 5px 0',
                                    border: 'none'
                                }}>
                                    <div className="cardBody">
                                        <CardBody>
                                            <CardTitle>{' ' + pet.name + ' '}</CardTitle>
                                            <CardSubtitle>{' ' + pet.type + ' '}</CardSubtitle>
                                            <CardText> {' '} </CardText>
                                            <CardLink className="cardLinkLeft" href={'#/editPet'}>Edit</CardLink>
                                            <CardLink className="cardLinkRight" href={'#/page-3'}>Delete</CardLink>
                                        </CardBody>
                                    </div>
                                </Card>
                            </div>
                        ))}
                        </tbody>
                    </div>
                </table>
            </div>
        );
    }
}

PetList = connect(
    state => ({}),
    dispatch => ({
        selectPet: pet => dispatch(Users.Actions.selectPet(pet))
    })
)(PetList);




