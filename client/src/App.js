import { useContext } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Calendar from './components/calendar/Calendar';
import Navbar from './components/common/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import MeetupForm from './components/meetup/MeetupForm';
import UserDashForm from './components/user/UserDashForm';
import BirraForm from './components/birra/BirraForm';
import PrivateOutlet from './components/routing/PrivateOutlet';
import AuthContext from './context/auth/authContext';

let first = true;

function App() {
	const authContext = useContext(AuthContext);

	const { loadUser } = authContext;

	if (localStorage.token && first === true) {
		loadUser();
		first = false;
	}

	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route path="/" element={<Calendar />} />
				<Route path="/" element={<PrivateOutlet />}>
					<Route path="/birra" element={<BirraForm />} />
					<Route path="/meetup" element={<MeetupForm />} />
					<Route path="/user" element={<UserDashForm />} />
					<Route path="/dashboard" element={<Dashboard />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
