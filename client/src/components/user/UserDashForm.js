import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import { useNavigate } from 'react-router-dom';
import { getUsuarios } from '../../service/meetupService';
import { deleteUsuario } from '../../service/userService';

let successmsg = '';

const UserDashForm = () => {
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
		role: 0,
	});
	const [usuarios, setUsuarios] = useState([]);
	const [edit, setEdit] = useState(false);
	const [editId, setEditId] = useState('');
	const [done, setDone] = useState(true);
	const [showSuccess, setShowSuccess] = useState(false);

	const load = async () => {
		await getUsuarios().then(res => setUsuarios(res.data));
	};

	useEffect(() => {
		load();
	}, []);

	const navigate = useNavigate();
	const authContext = useContext(AuthContext);

	const { admRegister, error, clearErrors } = authContext;

	const handleChange = e => {
		clearErrors();
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleChange2 = e => {
		setDone(false);
		clearErrors();
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const { name, email, password, password2, role } = user;

	const handleSubmit = e => {
		e.preventDefault();
		if (edit === false) {
			if (password !== password2) {
				setDone(true);
			} else {
				try {
					admRegister({
						name,
						email,
						password,
						role,
					});
					if (
						name !== '' &&
						email !== '' &&
						role !== '' &&
						password !== '' &&
						password2 !== ''
					) {
						successmsg = `Se le creo el perfil a ${name}`;
						setShowSuccess(true);
						setTimeout(() => load(), 300);
						setTimeout(() => {
							setShowSuccess(false);
						}, 2500);
					}
					setUser({
						...user,
						name: '',
						email: '',
						role: '',
						password: '',
						password2: '',
					});
					document.querySelector('.role-select').value = 0;
					document.querySelector('.profile-select').value = 0;
				} catch (err) {
					console.log('err');
				}
			}
		}
	};

	const handleClose = e => {
		e.preventDefault();
		navigate('/dashboard');
	};

	const handleDelete = () => {
		deleteUsuario(editId);
		successmsg = `Se borro el perfil de ${name}`;
		setShowSuccess(true);
		setTimeout(() => load(), 300);
		setTimeout(() => {
			setShowSuccess(false);
		}, 2500);
		setUser({
			...user,
			name: '',
			email: '',
			role: '',
			password: '',
			password2: '',
		});
		document.querySelector('.role-select').value = 0;
		document.querySelector('.profile-select').value = 0;
		setEdit(false);
	};

	const handleCancelar = () => {
		setUser({
			...user,
			name: '',
			email: '',
			role: '',
			password: '',
			password2: '',
		});
		document.querySelector('.role-select').value = 0;
		document.querySelector('.profile-select').value = 0;
		setEdit(false);
	};

	const handleUsuarios = e => {
		usuarios.map(usr => {
			if (usr.name === e.target.value) {
				setUser({
					...user,
					name: usr.name,
					email: usr.email,
					role: usr.role,
					password: usr.password,
				});
				if (usr.role === 1) {
					document.querySelector('.role-select').value = 1;
				}
				if (usr.role === 2) {
					document.querySelector('.role-select').value = 2;
				}
				setEdit(true);
				setEditId(usr._id);
			}
		});

		if (e.target.value === '0') {
			setUser({
				...user,
				name: '',
				email: '',
				role: '',
				password: '',
				password2: '',
			});
			document.querySelector('.role-select').value = 0;
			document.querySelector('.profile-select').value = 0;
			setEdit(false);
		}
	};

	return (
		<>
			<div className="container card bg-light col-10 col-sm-6 col-lg-4 mt-5 pb-3">
				<h3 className="d-flex justify-content-center mt-3">
					{edit ? 'Borrar' : 'Crear'} Perfil
				</h3>
				<form onSubmit={handleSubmit}>
					{done &&
						password2 !== '' &&
						password !== password2 &&
						edit === false && (
							<div className="alert alert-danger">
								Los password no coinciden, intenta de vuelta
							</div>
						)}
					{error && error !== 'Exito' && (
						<div className="alert alert-danger">{error}</div>
					)}
					<label className="h6 mt-3" htmlFor="Nombre">
						Nombre
					</label>
					<input
						type="text"
						name="name"
						className={`${edit && 'anul-point'} form-control`}
						onChange={handleChange}
						value={name}
					/>
					<label className="h6 mt-3" htmlFor="email">
						Email
					</label>
					<input
						type="email"
						name="email"
						className={`${edit && 'anul-point'} form-control`}
						onChange={handleChange}
						value={email}
					/>
					{edit === false ? (
						<>
							<label className="h6 mt-3" htmlFor="password">
								Password
							</label>
							<input
								type="password"
								name="password"
								className="form-control"
								onChange={handleChange}
								value={password}
							/>
							<label className="h6 mt-3" htmlFor="password2">
								Confirmar Password
							</label>
							<input
								type="password"
								name="password2"
								className="form-control"
								onChange={handleChange2}
								value={password2}
							/>
						</>
					) : null}
					<label className="h6 mt-3" htmlFor="rol">
						Rol
					</label>
					<select
						name="role"
						className={`${edit && 'anul-point'} form-control role-select`}
						onChange={handleChange}>
						<option value={0}>Seleccionar rol</option>
						<option value={1}>Admin</option>
						<option value={2}>Usuario</option>
					</select>
					<label htmlFor="lista" className="h6 mt-3">
						Lista de perfiles
					</label>
					<select
						name="lista"
						className="form-control profile-select"
						onChange={handleUsuarios}>
						<option value="0">
							{usuarios.length >= 1
								? `${edit ? 'cancelar' : 'Seleccionar perfil'}`
								: 'Lista vacia'}
						</option>
						{usuarios.length >= 1
							? usuarios.map((usr, id) => {
									return (
										<option key={id} value={usr.name}>
											{usr.name}
										</option>
									);
							  })
							: null}
					</select>
					<div className="d-flex justify-content-end">
						{edit ? (
							<>
								<button
									onClick={handleCancelar}
									className="btn btn-sm btn-light btn-crear text-black me-2 mt-3">
									Cancelar
								</button>
								<button
									onClick={handleDelete}
									className="btn btn-sm btn-light bg-danger text-black mt-3">
									Borrar Usuario
								</button>
							</>
						) : null}

						{!edit ? (
							<>
								<button
									className="btn btn-sm btn-light btn-cerrar text-black mt-3"
									onClick={handleClose}>
									Volver
								</button>
								<button
									type="submit"
									className="btn btn-sm btn-light btn-crear text-black ms-2 mt-3">
									Confirmar
								</button>
							</>
						) : null}
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

export default UserDashForm;
