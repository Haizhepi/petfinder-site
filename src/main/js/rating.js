import React from 'react';
import * as Users from 'js/users';
import {connect} from 'react-redux';



class LeaveRating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {sitters: [{
                name: 'no name'
            }]};
    }

}

LeaveRating = connect(
    state =>({
        booking: Users.State.getActiveBooking(state)
    }),
    dispatch => ({
        addRating: (booking, content) => dispatch(Users.Actions.addRating(booking, content))
    })
)(LeaveRating);

export {LeaveRating};