import {
	SHOW_MODAL,
	HIDE_MODAL,
	PASS_DATE,
	PASS_WEATHER,
	PASS_FIRST,
	PASS_INVI,
	PASS_INVITED,
	SHOW_LOGIN,
	HIDE_LOGIN,
	SHOW_REG,
	HIDE_REG,
	CURRENT_INV,
	CURRENT_INV_ID,
	PASS_FRESH_LIST,
	CHECK_INVITE,
	DASH_POST,
	DASH_EDIT,
	DASH_DELETE,
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case SHOW_MODAL:
			return {
				...state,
				show: true,
			};
		case HIDE_MODAL:
			return {
				...state,
				show: false,
			};
		case SHOW_LOGIN:
			return {
				...state,
				showlogin: true,
			};
		case HIDE_LOGIN:
			return {
				...state,
				showlogin: false,
			};
		case SHOW_REG:
			return {
				...state,
				showreg: true,
			};
		case HIDE_REG:
			return {
				...state,
				showreg: false,
			};
		case PASS_DATE:
			return {
				...state,
				fecha: action.payload,
			};
		case PASS_WEATHER:
			return {
				...state,
				weather: action.payload,
			};
		case PASS_FIRST:
			return {
				...state,
				primer: action.payload,
			};
		case PASS_INVI:
			return {
				...state,
				invi: action.payload,
			};
		case PASS_INVITED:
			return {
				...state,
				invited: action.payload,
			};
		case CURRENT_INV:
			return {
				...state,
				currentinv: action.payload,
			};
		case CURRENT_INV_ID:
			return {
				...state,
				currentinvid: action.payload,
			};
		case PASS_FRESH_LIST:
			return {
				...state,
				freshlist: action.payload,
			};
		case CHECK_INVITE:
			return {
				...state,
				checkinvite: action.payload,
			};
		case DASH_POST:
			return {
				...state,
			};
		case DASH_EDIT:
			return {
				...state,
			};
		case DASH_DELETE:
			return {
				...state,
			};
		default:
			return state;
	}
};
