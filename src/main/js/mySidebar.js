import React from 'react';
import Sidebar from 'react-sidebar';
import * as Users from 'js/users';
import {connect} from 'react-redux';

export class SidebarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false,
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    onSetSidebarOpen(open) {
        this.setState({sidebarOpen: open});
    }

    componentWillMount() {
        if (this.props.user) {
            if (this.props.user.type === 'SITTER') {
                this.setState({sitter: 'SITTER'});
            }
        }
    }

    render() {
        if (this.props.user) {
            return (
                <Sidebar
                    sidebar={
                        <div className="sidebarPane">
                            <div>
                                <a className="sidebarTitle">
                                    {this.props.user.firstName}
                                </a>
                            </div>
                            <div className="sbTextContainer">
                                <a className="sidebarText" href={'#/logout'}>
                                    <i className="far fa-sign-out sbIconSmall"> </i>
                                    Logout
                                </a>
                            </div>
                            <div className="sbTextContainer">
                                <a className="sidebarText" href={'#/'}>
                                    <i className="far fa-cog sbIconSmall"> </i>
                                    Settings
                                </a>
                            </div>

                        </div>
                    }
                    open={this.state.sidebarOpen}
                    onSetOpen={this.onSetSidebarOpen}
                    styles={{sidebar: {background: 'white'}}}
                >
                    <button className="sbButton" onClick={() => this.onSetSidebarOpen(true)}>
                        <i className="far fa-align-justify fa-lg sbButtonIcon"> </i>
                    </button>
                </Sidebar>
            );
        } else {
            return (
                <Sidebar
                    sidebar={
                        <div className="sidebarPane">
                            <div>
                                <a className="sidebarTitle">
                                    Welcome
                                </a>
                            </div>
                            <div className="sbTextContainer">
                                <a className="sidebarText" href={'#/login'}>
                                    <i className="far fa-sign-in sbIconSmall"> </i>
                                    Login
                                </a>
                            </div>
                            <div className="sbTextContainer">
                                <a className="sidebarText" href={'#/register'}>
                                    <i className="far fa-user-plus sbIcon"> </i>
                                    Register
                                </a>
                            </div>
                            <div className="sbTextContainer">
                                <a className="sidebarText" href={'#/'}>
                                    <i className="far fa-cog sbIconSmall"> </i>
                                    Settings
                                </a>
                            </div>
                        </div>
                    }
                    open={this.state.sidebarOpen}
                    onSetOpen={this.onSetSidebarOpen}
                    styles={{sidebar: {background: 'white'}}}
                >
                    <button className="sbButton" onClick={() => this.onSetSidebarOpen(true)}>
                        <i className="far fa-align-justify fa-lg sbButtonIcon"> </i>
                    </button>
                </Sidebar>
            );
        }
    }
}


SidebarComponent = connect(
    state => ({
        authentication: Users.State.getAuthentication(state),
        user: Users.State.getUser(state),
        noti: Users.State.getNewNoti(state)
    }),
    dispatch => ({
        register: user => dispatch(Users.Actions.register(user)),
        getNotis: (noti) => dispatch(Users.Actions.newNotis(noti))
    })
)(SidebarComponent);