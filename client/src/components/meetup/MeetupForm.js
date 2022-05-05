import React, { useState, useEffect, useContext } from 'react';

import personPlus from '../../../node_modules/bootstrap-icons/icons/person-plus.svg';
import { useNavigate } from 'react-router-dom';
import {
	postMeetup,
	editMeetup,
	getMeetup,
	deleteMeetup,
	getUsuarios,
} from '../../service/meetupService';
import {
	editInvite,
	deleteInvite,
	getInvites,
} from '../../service/inviteService';
import { getWeather } from '../../service/calendarService';
import MainContext from '../../context/main/mainContext';

let successmsg = '';

const MeetupForm = () => {
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

	let checkname = [];

	const [tiempo, setTiempo] = useState(['']);
	const [people, setPeople] = useState(['']);
	const [invite, setInvite] = useState('');
	const [fecha, setFecha] = useState('');
	const [inviteds, setInviteds] = useState([]);
	const [meet, setMeet] = useState([]);
	const [del, setDel] = useState(false);
	const [delSel, setDelSel] = useState('');
	const [showAlert, setShowAlert] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [asked, setAsked] = useState([]);
	const [selUser, setSeluser] = useState({});
	const [users, setUsers] = useState([]);

	const mainContext = useContext(MainContext);
	const { invited, getInvited, getCurrentInvId, currentinvid } = mainContext;

	const navigate = useNavigate();

	const pgCargada = async () => {
		await getWeather().then(res => setTiempo(res.data));
		await getUsuarios().then(res => setPeople(res.data));
		await getMeetup().then(res => {
			res.data.map(mt => {
				setMeet([...meet, mt]);
			});
		});
		await getInvites().then(res => {
			getInvited(res.data);
		});
	};

	const resetAll = () => {
		document.querySelector('.invite-value').value = 0;
		document.querySelector('.invited-value').value = 0;
		document.querySelector('.dia-value').value = 0;
	};

	const reset = () => {
		document.querySelector('.invite-value').value = 0;
		document.querySelector('.invited-value').value = 0;
	};

	const getId = e => {
		invited.map(inv => {
			if (inv.day === e.target.value) {
				getCurrentInvId(inv._id);
			}
		});
	};

	useEffect(() => {
		pgCargada();
	}, []);

	const checkInvited = e => {
		invited.map(invs => {
			if (invs.day === e.target.value) {
				const names = invs.invi.map(nv => {
					return nv.name;
				});
				setAsked(names);
			}
		});
	};

	const gettingMeetup = e => {
		meet.map(mt => {
			if (mt.day === e.target.value) {
				checkDelete(e);
				setInviteds(mt.invited);
			}
		});
	};

	const checkDelete = (e, data) => {
		meet.map(mt => {
			if (mt.day === e.target.value || mt.day === data) {
				setDel(true);
			} else {
				setDel(false);
			}
		});
	};

	const delSelect = e => {
		setDelSel(e.target.value);
	};

	const handleQuitar = e => {
		e.preventDefault();
		successmsg = `Se quito a ${delSel} de la meetup`;
		setShowSuccess(true);
		const result = inviteds.filter(sel => sel !== delSel);
		setInviteds(result);
		editInvite({ invi: result, day: fecha }, currentinvid);
		reset();
		setTimeout(() => {
			setShowSuccess(false);
		}, 2500);
	};

	const inviteValue = e => {
		setInvite(e.target.value);
	};

	const onInvite = e => {
		e.preventDefault();
		setInviteds([...inviteds, invite]);
		checkDelete(e, fecha);
		successmsg = `Se agrego a ${invite} a la meetup`;
		setShowSuccess(true);
		setTimeout(() => {
			setShowSuccess(false);
		}, 2500);
		reset();
	};

	const handleFecha = e => {
		getId(e);
		setInviteds([]);
		setAsked([]);
		reset();
		checkDelete(e);
		setShowAlert(false);
		setFecha(e.target.value);
		gettingMeetup(e);
		checkInvited(e);
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (fecha === '') {
			setShowAlert(true);
			return;
		}
		if (meet[0] === undefined && fecha !== '') {
			postMeetup({ invited: inviteds, day: fecha });
			successmsg = `Meetup creada con exito`;
			setShowSuccess(true);
			setDel(false);
			setTimeout(() => {
				setShowSuccess(false);
			}, 2500);
			resetAll();
			setTimeout(() => pgCargada(), 300);
		} else {
			meet.map(mt => {
				if (!mt.day || mt.day !== fecha) {
					postMeetup({ invited: inviteds, day: fecha });
					successmsg = `Meetup creada con exito`;
					setShowSuccess(true);
					setDel(false);
					setTimeout(() => {
						setShowSuccess(false);
					}, 2500);
					resetAll();
					setTimeout(() => pgCargada(), 300);
				} else {
					editMeetup({ invited: inviteds, day: fecha }, mt._id);
					successmsg = `Meetup editada con exito`;
					setShowSuccess(true);
					setDel(false);
					setTimeout(() => {
						setShowSuccess(false);
					}, 2500);
					resetAll();
					setTimeout(() => pgCargada(), 300);
				}
			});
		}
		e.preventDefault();
	};

	const handleDelete = e => {
		e.preventDefault();
		meet.map(async mt => {
			if (mt.day === fecha) {
				deleteMeetup(mt._id);
				setMeet([]);
				await getMeetup().then(res => {
					res.data.map(mt => {
						setMeet([...meet, mt]);
					});
				});
				deleteInvite(currentinvid);
				successmsg = `Se borro la meetup con exito`;
				setShowSuccess(true);
				getCurrentInvId('');
				setTimeout(() => {
					setShowSuccess(false);
				}, 2500);
				resetAll();
				setDel(false);
				setTimeout(() => pgCargada(), 300);
			}
		});
	};

	const handleClose = e => {
		setMeet([]);
		getCurrentInvId('');
		setFecha('');
		e.preventDefault();
		setShowAlert(false);
		navigate('/dashboard');
	};

	return (
		<>
			<div className="container card col-10 col-sm-6 col-lg-4 mt-5 bg-light">
				<h3 className="d-flex justify-content-center mt-3">
					{del ? 'Editando ' : 'Creando '}Meetup!
				</h3>
				<form onSubmit={handleSubmit} className="mb-3">
					{showAlert && <div className="alert alert-danger">Elegi un dia</div>}
					<label htmlFor="select-dia" className="h6">
						Dia
					</label>
					<select
						name="select-dia"
						id=""
						className="form-control dia-value"
						onChange={handleFecha}>
						<option value={0}>Elegir dia</option>
						{tiempo.map((day, id) => {
							if (id === 0) {
								return null;
							}
							dia = new Date(day.datetime).getDay();
							const result = `${dias[dia]} ${day.datetime.slice(
								8,
								10
							)}/${day.datetime.slice(5, 7)}`;

							return (
								<option key={id} value={result}>
									{result}
								</option>
							);
						})}
					</select>
					<div>
						<label htmlFor="select-gente" className="h6 mt-3">
							Invitar gente
						</label>
						<select
							name="select-gente"
							id=""
							className="form-control invite-value"
							onChange={inviteValue}>
							<option value={0}>Elegir gente</option>
							{people.map((gente, id) => {
								checkname = inviteds.filter(nv => nv === gente.name);
								if (checkname[0] === gente.name) {
									return;
								}
								return (
									<option key={id} value={`${gente.name}`}>
										{gente.name}
										{'    '}
										{asked.map((a, id) => {
											if (a === gente.name) {
												return '+';
											}
										})}
									</option>
								);
							})}
						</select>
						<button
							className="btn btn-sm border border-secondary text-dark mt-2"
							onClick={onInvite}>
							Invitar
						</button>
					</div>

					<div>
						<label htmlFor="select-gente" className="h6 mt-3">
							Gente invitada
						</label>
						<select
							name="select-gente"
							id=""
							className="form-control invited-value"
							onChange={delSelect}>
							<option value={0}>
								{inviteds.length >= 1 ? 'Editar lista' : 'Lista vacia'}
							</option>
							{inviteds.map((invi, id) => {
								return (
									<option key={id} value={invi}>
										{invi}
									</option>
								);
							})}
						</select>
						<button
							onClick={handleQuitar}
							className="btn btn-sm border border-secondary text-dark mt-2">
							Quitar
						</button>
					</div>

					<div className="d-flex justify-content-end">
						<button
							onClick={handleClose}
							className="btn btn-sm btn-light btn-cerrar text-black mt-3 me-2">
							Volver
						</button>
						{del !== false ? (
							<button
								onClick={handleDelete}
								className="btn btn-sm btn-light bg-danger text-black mt-3 me-2 ">
								Borrar Meetup
							</button>
						) : null}
						{del !== false ? (
							<button
								type="submit"
								className="btn btn-sm btn-light btn-crear text-black mt-3">
								Editar Meetup
							</button>
						) : (
							<button
								type="submit"
								className="btn btn-sm btn-light btn-crear text-black mt-3">
								Crear Meetup
							</button>
						)}
					</div>
				</form>
			</div>
			{showSuccess && (
				<div className="alert alert-success  offset-4 col-4 mt-3">
					{successmsg}
				</div>
			)}
		</>
	);
};

export default MeetupForm;
