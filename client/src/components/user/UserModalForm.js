import React, { useContext, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import MainContext from '../../context/main/mainContext';
import AuthContext from '../../context/auth/authContext';

const UserModalForm = () => {
	const mainContext = useContext(MainContext);
	const { showreg, hideReg } = mainContext;
	const authContext = useContext(AuthContext);
	const { register, error, clearErrors } = authContext;

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});
	const [done, setDone] = useState(true);

	const { name, email, password, password2 } = user;

	const handleChange = e => {
		clearErrors();
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleChange2 = e => {
		setDone(false);

		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (password !== password2) {
			setDone(true);
		} else {
			register({
				name,
				email,
				password,
			});
		}
	};

	if (error === 'Exito') {
		hideReg();
	}

	const handleClose = () => {
		clearErrors();
		setUser({ name: '', email: '', password: '', password2: '' });
		hideReg();
	};

	return (
		<>
			<Modal show={showreg} onHide={handleClose} backdrop="static">
				<Modal.Header closeButton>
					<Modal.Title>Crear Usuario</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						{done && password !== password2 && (
							<div className="alert alert-danger">
								Los password no coinciden, intenta de vuelta
							</div>
						)}
						{error && error !== 'Exito' && (
							<div className="alert alert-danger">{error}</div>
						)}
						<label htmlFor="name" className="mt-3 h6">
							Nombre
						</label>
						<input
							type="text"
							className="form-control"
							name="name"
							onChange={handleChange}
						/>
						<label htmlFor="email" className="mt-3 h6">
							Email
						</label>
						<input
							type="email"
							className="form-control"
							name="email"
							onChange={handleChange}
						/>
						<label htmlFor="password" className="mt-3 h6">
							Password
						</label>
						<input
							type="password"
							className="form-control"
							name="password"
							onChange={handleChange2}
						/>
						<label htmlFor="password2" className="mt-3 h6">
							Confirmar Password
						</label>
						<input
							type="password"
							className="form-control"
							name="password2"
							onChange={handleChange2}
						/>
					</form>
					<div className="d-flex justify-content-end">
						<Button
							variant="light"
							className="btn btn-sm btn-cerrar text-black mt-3"
							onClick={handleClose}>
							Cerrar
						</Button>
						<Button
							variant="light"
							className="btn btn-sm btn-crear text-black ms-2 mt-3"
							onClick={handleSubmit}>
							Crear
						</Button>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default UserModalForm;
