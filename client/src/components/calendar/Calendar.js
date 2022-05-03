import React, { useState, useEffect, useContext } from 'react';
import MainContext from '../../context/main/mainContext';
import AuthContext from '../../context/auth/authContext';
import { getWeather } from '../../service/calendarService';
import { getMeetup } from '../../service/meetupService';
import { getInvites } from '../../service/inviteService';
import Spinner from '../common/Spinner';
import ModalCalendar from './ModalCalendar';

const Calendar = () => {
	let dia;
	const dias = [
		'Domingo',
		'Lunes',
		'Martes',
		'Miercoles',
		'Jueves',
		'Viernes',
		'Sabado',
	];
	const [tiempo, setTiempo] = useState(['']);
	const [meets, getMeets] = useState(['']);

	const mainContext = useContext(MainContext);
	const {
		showModal,
		passDate,
		changePrimer,
		primer,
		getInvi,
		getInvited,
		invited,
		invi,
		getCurrentInv,
		getCurrentInvId,
		getFreshList,
		checkInvite,
		showreg,
		showlogin,
	} = mainContext;
	const authContext = useContext(AuthContext);
	const { isAuthenticated, clearErrors, user } = authContext;

	useEffect(() => {
		const pgCargada = async () => {
			await getWeather().then(res => setTiempo(res.data));
			await getMeetup().then(res => {
				if (res.data.length !== 0) {
					getMeets(res.data);
				}
			});
			await getInvites().then(res => {
				getInvited(res.data);
			});
		};

		if (primer === true) {
			pgCargada();

			changePrimer(false);
		}
	}, []);

	useEffect(() => {
		setTimeout(() => clearErrors(), 1000);
	}, [showreg, showlogin]);

	const handleClick = e => {
		e.preventDefault();
		passDate(e.target.name);

		meets.map(meet => {
			if (meet.day === e.target.name) {
				getInvi(meet.invited);
			} else {
				getInvi(['']);
			}
		});

		if (invited.length > 0) {
			invited.map(inv => {
				if (inv.day === e.target.name) {
					getCurrentInv([...inv.invi, user]);
					getCurrentInvId(inv._id);
					getFreshList(inv.invi);
					inv.invi.map(nv => {
						if (nv.name === user.name && !invi.includes(user.name)) {
							checkInvite(true);
						}
					});
				}
			});
		} else {
			getCurrentInv([user]);
		}

		showModal();
	};

	return (
		<>
			{primer === true || meets === [''] ? (
				<Spinner />
			) : (
				<div className="container card mt-5 col-11 col-8-sm calendario ">
					<div className="row d-flex justify-content-around">
						{tiempo.map((day, id) => {
							if (id === 0) {
								return null;
							}
							dia = new Date(day.datetime).getDay();

							return (
								<div
									className={`container col-3 mx-4 my-3 rounded d-flex flex-column justify-content-around p-4 calendar-card ${
										meets[0] === '' && ' bg-light'
									} ${meets.map((meet, id) => {
										if (
											meet.day !==
												`${dias[dia]} ${day.datetime.slice(
													8,
													10
												)}/${day.datetime.slice(5, 7)}` ||
											meet.day === undefined
										) {
											return ' bg-light';
										} else {
											return ' bg-calendar';
										}
									})}`}
									key={id}>
									<div className="row">
										<div
											className={`col-12 d-flex justify-content-around ${meets.map(
												(meet, id) => {
													if (
														meet.day ===
														`${dias[dia]} ${day.datetime.slice(
															8,
															10
														)}/${day.datetime.slice(5, 7)}`
													) {
														return ' mt-3';
													} else {
														return ' mb-4';
													}
												}
											)}`}>
											<h5 className="anul-point">
												{`${dias[dia]} ${day.datetime.slice(
													8,
													10
												)}/${day.datetime.slice(5, 7)}`}
											</h5>
											<h5 className="anul-point">{Math.ceil(day.temp)}°</h5>
											<img
												className="w-icon"
												src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png `}
											/>
										</div>
									</div>

									<div className="row">
										<div className="d-flex justify-content-around">
											{meets.map((meet, id) => {
												if (
													meet.day ===
													`${dias[dia]} ${day.datetime.slice(
														8,
														10
													)}/${day.datetime.slice(5, 7)}`
												) {
													const personas = `Van a venir ${meet.invited.length} personas`;
													return <p key={id}>{personas}</p>;
												}
											})}

											{user &&
												isAuthenticated &&
												meets.map((meet, id) => {
													if (
														meet.day ===
														`${dias[dia]} ${day.datetime.slice(
															8,
															10
														)}/${day.datetime.slice(5, 7)}`
													) {
														return (
															<a
																key={id}
																href=""
																className="ms-xs-2 ms-sm-3 no-deco"
																onClick={handleClick}
																name={`${dias[dia]} ${day.datetime.slice(
																	8,
																	10
																)}/${day.datetime.slice(5, 7)}`}>
																Revisar
															</a>
														);
													}
												})}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			)}

			<ModalCalendar />
		</>
	);
};

export default Calendar;
