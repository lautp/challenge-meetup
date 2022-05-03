import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateOutlet = () => {
	useEffect(() => {
		loadUser();
	}, []);

	const authContext = useContext(AuthContext);

	const { isAuthenticated, user, loadUser } = authContext;

	return isAuthenticated && user.role === 1 ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateOutlet;
