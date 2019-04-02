
import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import * as Pages from 'js/pages';
import * as Users from 'js/users';
import {connect} from 'react-redux';
import _ from 'lodash';
import {PetList} from 'js/petList';


export default class Index extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		let defaultPage = 0;
		let home = 	<Route exact path="/" component={Pages.Home}/>;
		let register = <Route exact path="/register" component={Pages.RegisterPage}/>;
		let login = <Route exact path="/login" component={Pages.LoginPage}/>;
		let userInfo = <Route exact path="/page-1" component={Pages.Page1}/>;
		let addpet = <Route exact path="/pet" component={Pages.Page2}/>;
		let page3 = <Route exact path="/page-3" component={Pages.Page3}/>;
		let homepath = <Route exact path="/homepage" component={Pages.Homepage}/>;
		let logout = <Route exact path="/logout" component={Pages.Logout}/>;
		let editProfile = <Route exact path="/edit_profile" component={Pages.EditProfilePage}/>;
		let schedule = <Route exact path="/schedule" component={Pages.Availability}/>;
		let viewSitter = <Route exact path="/viewSitter" component={Pages.ViewSitter}/>;
		let addBooking = <Route exact path="/addBooking" component={Pages.AddBooking}/>;
		let myBooking = <Route exact path="/myBooking" component={Pages.MyBooking}/>;
		let availableBooking = <Route exact path="/availableBooking" component={Pages.AvailableBooking}/>;
		let bookingDetail = <Route exact path="/bookingDetail" component={Pages.BookingDetailPage}/>;
		let notification = <Route exact path="/notification" component={Pages.Notifications}/>;
		let availableSitters = <Route exact path="/availableSitters" component={Pages.AvailableSittersPage}/>;
		let googleMap = <Route exact path="/googleMap" component={Pages.GoogleMap}/>;
		let addRating = <Route exact path="/addRating" component={Pages.AddRating}/>;
		//alert(this.props.authentication);
		return (
			<HashRouter>
				<div>
					{home}
					{register}
					{login}
					{userInfo}
					{addpet}
					{page3}
					{homepath}
					{logout}
					{editProfile}
					{schedule}
					{viewSitter}
					{addBooking}
					{myBooking}
					{availableBooking}
					{bookingDetail}
					{notification}
					{availableSitters}
					{googleMap}
					{addRating}
				</div>
			</HashRouter>
		);

	}
}




