import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainContext from '../../context/main/mainContext';
import AuthContext from '../../context/auth/authContext';

const Dashboard = () => {
	const mainContext = useContext(MainContext);
	const { changePrimer } = mainContext;
	const authContext = useContext(AuthContext);
	const { clearErrors } = authContext;
	const navigate = useNavigate();

	useEffect(() => {
		clearErrors();
	}, []);

	const handleMeetup = () => {
		navigate('/meetup');
	};

	const handleUsuarios = () => {
		navigate('/user');
	};

	const handleBirra = () => {
		navigate('/birra');
	};

	const handleHome = () => {
		changePrimer(true);
		navigate('/');
	};

	return (
		<div className="container mt-5">
			<div className="row ">
				<div className="card d-inline bg-light bigbox">
					<div
						className="card d-inline-flex py-5 offset-1 col-4 align-items-center justify-content-center bigb"
						onClick={handleMeetup}>
						<h3 className="dash-title anul-point">Meetups</h3>
						<p className="text-center dash-p anul-point">
							Crea, edita o borra meetups
						</p>
					</div>
					<div
						className="card d-inline-flex py-5 offset-2 col-4 align-items-center justify-content-center bigb"
						onClick={handleUsuarios}>
						<h3 className="dash-title anul-point">Usuarios</h3>
						<p className="text-center dash-p anul-point">
							Crea o borra usuarios
						</p>
					</div>
					<div
						className="card d-inline-flex py-5 offset-1 col-4 align-items-center justify-content-center bigb"
						onClick={handleBirra}>
						<h3 className="dash-title anul-point">Birra!</h3>
						<p className="text-center dash-p anul-point">
							Crea, edita o borra pedidos
						</p>
					</div>

					<div
						className="card d-inline-flex py-5 offset-2 col-4 align-items-center justify-content-center bigb home-button"
						onClick={handleHome}>
						<h3 className="dash-title anul-point">Home</h3>
						<p className="text-center dash-p anul-point">Regresar al home</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
