import React, { useReducer } from 'react';
import MainContext from './mainContext';
import mainReducer from './mainReducer';
import {
	SHOW_LOGIN,
	HIDE_LOGIN,
	SHOW_MODAL,
	HIDE_MODAL,
	PASS_DATE,
	PASS_WEATHER,
	SHOW_REG,
	HIDE_REG,
	PASS_FIRST,
	PASS_INVI,
	PASS_INVITED,
	CURRENT_INV,
	CURRENT_INV_ID,
	PASS_FRESH_LIST,
	CHECK_INVITE,
} from '../types';
import { postMeetup } from '../../service/meetupService';

const MainState = props => {
	const initialState = {
		show: false,
		showlogin: false,
		showreg: false,
		fecha: '',
		weather: [],
		primer: true,
		invi: [''],
		invited: [],
		currentinv: [],
		currentinvid: '',
		freshlist: [],
		checkinvite: false,
		error: null,
	};

	const [state, dispatch] = useReducer(mainReducer, initialState);

	const showModal = () => {
		dispatch({ type: SHOW_MODAL });
	};

	const hideModal = () => {
		dispatch({ type: HIDE_MODAL });
	};

	const showLogin = () => {
		dispatch({ type: SHOW_LOGIN });
	};

	const hideLogin = () => {
		dispatch({ type: HIDE_LOGIN });
	};

	const showReg = () => {
		dispatch({ type: SHOW_REG });
	};

	const hideReg = () => {
		dispatch({ type: HIDE_REG });
	};

	const passDate = date => {
		dispatch({ type: PASS_DATE, payload: date });
	};

	const passWeather = weather => {
		dispatch({ type: PASS_WEATHER, payload: weather });
	};

	const changePrimer = first => {
		dispatch({ type: PASS_FIRST, payload: first });
	};

	const getInvi = invi => {
		dispatch({ type: PASS_INVI, payload: invi });
	};

	const getInvited = invited => {
		dispatch({ type: PASS_INVITED, payload: invited });
	};

	const getCurrentInv = inv => {
		dispatch({ type: CURRENT_INV, payload: inv });
	};

	const getCurrentInvId = id => {
		dispatch({ type: CURRENT_INV_ID, payload: id });
	};

	const getFreshList = list => {
		dispatch({ type: PASS_FRESH_LIST, payload: list });
	};

	const checkInvite = check => {
		dispatch({ type: CHECK_INVITE, payload: check });
	};

	const postMeet = ({ invited, day }) => {
		try {
			postMeetup({ invited, day });
		} catch (err) {}
	};

	const editMeet = () => {};

	const deleteMeet = () => {};

	return (
		<MainContext.Provider
			value={{
				show: state.show,
				showlogin: state.showlogin,
				showreg: state.showreg,
				fecha: state.fecha,
				primer: state.primer,
				invi: state.invi,
				invited: state.invited,
				currentinv: state.currentinv,
				currentinvid: state.currentinvid,
				freshlist: state.freshlist,
				checkinvite: state.checkinvite,
				error: state.error,
				showModal,
				hideModal,
				showLogin,
				hideLogin,
				showReg,
				hideReg,
				passDate,
				passWeather,
				changePrimer,
				getInvi,
				getInvited,
				getCurrentInv,
				getCurrentInvId,
				getFreshList,
				checkInvite,
				postMeet,
				editMeet,
				deleteMeet,
			}}>
			{props.children}
		</MainContext.Provider>
	);
};

export default MainState;
