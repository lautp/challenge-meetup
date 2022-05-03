import React, { useState, useEffect, useContext } from 'react';
import {
	postOrder,
	getOrders,
	editOrder,
	deleteOrder,
} from '../../service/birraService';
import { getWeather } from '../../service/calendarService';
import { getMeetup } from '../../service/meetupService';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

let successmsg = '';

const BirraForm = () => {
	const [cantidad, setCantidad] = useState(0);
	const [weather, setWeather] = useState([]);
	const [fecha, setFecha] = useState('');
	const [meet, setMeet] = useState([]);
	const [temp, setTemp] = useState(0);
	const [personas, setPersonas] = useState([]);
	const [orders, setOrders] = useState([]);
	const [edit, setEdit] = useState(false);
	const [editId, setEditId] = useState();
	const [showAlert, setShowAlert] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [operando, setOperando] = useState(false);

	const authContext = useContext(AuthContext);
	const { error, clearErrors } = authContext;

	const navigate = useNavigate();

	const pgCargada = async () => {
		await getMeetup().then(res => {
			setMeet(res.data);
		});
		await getWeather().then(res => {
			setWeather(res.data);
		});
		await getOrders().then(res => {
			setOrders(res.data);
		});
	};

	useEffect(() => {
		pgCargada();
	}, []);

	const handleClose = e => {
		e.preventDefault();
		setFecha('');
		clearErrors();
		setOperando(false);
		setShowAlert(false);
		navigate('/dashboard');
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (cantidad === 0) {
			setShowAlert(true);
			return;
		}
		if (edit !== true) {
			try {
				postOrder({ quantity: cantidad, day: fecha });
				successmsg = `Pedido realizado con exito`;
				setTimeout(() => pgCargada(), 300);
				setShowSuccess(true);
				setTimeout(() => {
					setShowSuccess(false);
				}, 2500);
				setOperando(false);
				document.querySelector('.order-value').value = 0;
				document.querySelector('.meetup-value').value = '';
			} catch (err) {
				console.error(err);
			}
		}
		if (edit === true) {
			try {
				editOrder({ quantity: cantidad, day: fecha }, editId);
				successmsg = `Pedido editado con exito`;
				setTimeout(() => pgCargada(), 300);
				setShowSuccess(true);
				setTimeout(() => {
					setShowSuccess(false);
				}, 2500);
				setOperando(false);
				document.querySelector('.order-value').value = 0;
				document.querySelector('.meetup-value').value = '';
			} catch (err) {
				console.error(err);
			}
		}
	};

	const handleCantidad = e => {
		setShowAlert(false);
		setCantidad(parseInt(e.target.value));
	};

	const handleFecha = e => {
		setOperando(true);
		clearErrors();
		setFecha(e.target.value);

		if (e.target.value === '') {
			setOperando(false);
		}

		weather.map(wt => {
			if (
				e.target.value.slice(7, 9) === wt.datetime.slice(8, 10) &&
				e.target.value.slice(10, 12) === wt.datetime.slice(5, 7)
			) {
				setTemp(wt.temp);
			}
		});
		meet.map(mt => {
			if (mt.day === e.target.value) {
				setPersonas(mt.invited);
			}
		});
		orders.map(order => {
			if (order.day === e.target.value) {
				setEdit(true);
				setEditId(order._id);
				setTimeout(() => {
					document.querySelector('.order-value').value = order.quantity;
				}, 20);
			} else {
				setEdit(false);
			}
		});
	};

	const handleDelete = e => {
		e.preventDefault();
		try {
			deleteOrder(editId);
			successmsg = `Pedido borrado con exito`;
			setTimeout(() => pgCargada(), 300);
			setShowSuccess(true);
			setTimeout(() => {
				setShowSuccess(false);
			}, 2500);
			document.querySelector('.order-value').value = 0;
			document.querySelector('.meetup-value').value = '';
			setOperando(false);
			setEdit(false);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<div className="container card bg-light col-10 col-sm-6 col-lg-4 mt-5 pb-3">
				<h3 className="d-flex justify-content-center mt-3">
					{edit ? 'Editar Pedido' : 'Pedir Birra!'}
				</h3>
				<form onSubmit={handleSubmit}>
					{showAlert && (
						<div className="alert alert-danger">Elegi una cantidad</div>
					)}
					{error && error !== 'Exito' && (
						<div className="alert alert-danger">{error}</div>
					)}
					<label htmlFor="meetup" className="h6">
						Seleccionar Meetup
					</label>
					<select
						name="meetup"
						id=""
						className="form-control meetup-value"
						onChange={handleFecha}>
						<option value="" key={0}>
							Elegir dia
						</option>
						{meet.map((mt, id) => {
							return (
								<option key={id} value={mt.day}>
									{mt.day}
								</option>
							);
						})}
					</select>
					{operando === true && (
						<>
							<h6 className="mt-3">
								Van asistir {personas.length || 'X'} personas
							</h6>
							<p className="ms-1">
								Se recomienda pedir{' '}
								{temp < 20 ? Math.ceil((personas.length * 0.75) / 6) : null}{' '}
								{temp >= 20 && temp <= 24
									? Math.ceil(personas.length / 6)
									: null}{' '}
								{temp > 24 ? Math.ceil((personas.length * 3) / 6) : null}{' '}
								caja(s) de birra
							</p>

							<label htmlFor="cajas" className="h6">
								Seleccionar Cantidad
							</label>
							<select
								name="cajas"
								id=""
								className="form-control order-value"
								onChange={handleCantidad}>
								<option value={0}>Elegir cantidad de cajas</option>
								<option value={1}>1</option>
								<option value={2}>2</option>
								<option value={3}>3</option>
								<option value={4}>4</option>
								<option value={5}>5</option>
								<option value={6}>6</option>
								<option value={7}>7</option>
								<option value={8}>8</option>
								<option value={9}>9</option>
								<option value={10}>10</option>
								<option value={11}>11</option>
								<option value={12}>12</option>
								<option value={13}>13</option>
							</select>
						</>
					)}
					<div className="d-flex justify-content-end">
						<button
							onClick={handleClose}
							className="btn btn-sm btn-light btn-cerrar text-black mt-3 me-2">
							Volver
						</button>
						{edit ? (
							<button
								onClick={handleDelete}
								className="btn btn-sm btn-light bg-danger text-black mt-3 me-2">
								Borrar Pedido
							</button>
						) : null}
						{operando === true && (
							<button
								type="submit"
								className="btn btn-sm btn-light btn-crear text-black mt-3">
								{edit ? 'Editar' : 'Pedir'}
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

export default BirraForm;
