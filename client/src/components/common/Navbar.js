import React, { useContext } from 'react';
import gear from '../../../node_modules/bootstrap-icons/icons/gear.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import MainContext from '../../context/main/mainContext';
import AuthContext from '../../context/auth/authContext';
import ModaLogin from '../login/ModaLogin';
import UserModalForm from '../user/UserModalForm';

const Navbar = () => {
	const mainContext = useContext(MainContext);
	const { showLogin, showReg, changePrimer, checkInvite } = mainContext;
	const authContext = useContext(AuthContext);
	const { isAuthenticated, logout, user } = authContext;

	let cuatro = false;

	const navigate = useNavigate();
	const location = useLocation();

	const handleClick = e => {
		e.preventDefault();
		showLogin();
	};

	const handleClick2 = e => {
		e.preventDefault();
		showReg();
	};

	const handleClick3 = e => {
		e.preventDefault();
		navigate('/dashboard');
		changePrimer(true);
	};

	const handleClick4 = e => {
		e.preventDefault();
		navigate('/dashboard');
		changePrimer(true);
	};

	const handleLogout = e => {
		e.preventDefault();
		checkInvite(false);
		logout();
	};

	if (
		location.path !== '/' &&
		location.path !== '/birra' &&
		location.path !== '/dashboard' &&
		location.path !== '/user' &&
		location.path !== '/meetup'
	) {
		cuatro = true;
	} else {
		cuatro = false;
	}

	return (
		<>
			<div className="container-fluid ">
				<div className="row navbar-nav barra">
					<div className="d-flex justify-content-center">
						<h2 className="logo-barra anul-point">Meetup Birras!</h2>
					</div>
					<div className="d-flex justify-content-end">
						{user !== null && user.role === 1 && location.pathname === '/' ? (
							<>
								<a
									href="#!"
									className="log-in text-black"
									onClick={handleClick3}>
									<img src={gear} alt="dashboard" className="mb-1" />
								</a>
							</>
						) : null}

						{!isAuthenticated ? (
							<>
								<a
									href="#!"
									className="log-in text-black"
									onClick={handleClick2}>
									Registrarse
								</a>
								<a
									href="#!"
									className="log-in text-black ms-3"
									onClick={handleClick}>
									Iniciar Sesion
								</a>
							</>
						) : (
							<a
								href="#!"
								className="log-in text-black ms-3"
								onClick={handleLogout}>
								Cerrar sesion
							</a>
						)}
					</div>
				</div>
			</div>

			<ModaLogin />
			<UserModalForm />
		</>
	);
};

export default Navbar;
