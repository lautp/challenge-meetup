import React, { useContext, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import MainContext from '../../context/main/mainContext';
import AuthContext from '../../context/auth/authContext';

const ModaLogin = () => {
	const authContext = useContext(AuthContext);
	const { login, error, clearErrors } = authContext;
	const mainContext = useContext(MainContext);
	const { showlogin, hideLogin } = mainContext;

	const [user, setUser] = useState({
		email: '',
		password: '',
	});
	const [on, setOn] = useState(false);

	const handleChange = e => {
		if (on === false) {
			setOn(true);
		}
		clearErrors();
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleClose = () => {
		clearErrors();
		setUser({
			email: '',
			password: '',
		});
		setOn(false);
		hideLogin();
	};

	const handleSubmit = () => {
		login(user);
	};
	if (error === 'Exito' && on === true) {
		clearErrors();
		setUser({
			email: '',
			password: '',
		});
		setOn(false);
		hideLogin();
	}

	return (
		<>
			<Modal show={showlogin} onHide={handleClose} backdrop="static">
				<Modal.Header closeButton>
					<Modal.Title>Iniciar Sesion</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form action="">
						{error && error !== 'Exito' && (
							<div className="alert alert-danger">{error}</div>
						)}
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
							onChange={handleChange}
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
							Iniciar
						</Button>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default ModaLogin;
