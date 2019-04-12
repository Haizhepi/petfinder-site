import React from 'react';
import Sidebar from 'react-sidebar';
import * as Users from 'js/users';
import {connect} from 'react-redux';
import Avatar from 'react-avatar';


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

                            <div className="sidebarTopWrapper">
                                <a className="sidebarAvatar" href={'#/edit_profile'}>
                                    <Avatar
                                        name={this.props.user.firstName + ' ' + this.props.user.lastName}
                                        size={60} round={true}
                                    />
                                </a>
                                <a className="sidebarTitle">
                                    {this.props.user.firstName + ' ' + this.props.user.lastName}
                                </a>
                            </div>
                            <div className="sbTextContainer">
                                <a className="sidebarText" href={'#/'}>
                                    <i className="far fa-home-lg-alt sbIconSmall"> </i>
                                    Home
                                </a>
                            </div>
                            <div className="sbTextContainer">
                                <a className="sidebarText" href={'#/'}>
                                    <i className="far fa-cog sbIconSmall"> </i>
                                    Settings
                                </a>
                            </div>
                            <div className="sbTextContainer">
                                <a className="sidebarText" href={'/'}>
                                    <i className="far fa-sign-out sbIconSmall"> </i>
                                    Logout
                                </a>
                            </div>

                        </div>
                    }
                    open={this.state.sidebarOpen}
                    onSetOpen={this.onSetSidebarOpen}
                    styles={{sidebar: {background: 'whitesmoke'}}}
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