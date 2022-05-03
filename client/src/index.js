import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import MainState from './context/main/MainState';
import AuthState from './context/auth/AuthState';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<AuthState>
			<MainState>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</MainState>
		</AuthState>
	</React.StrictMode>
);
