import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getInvites } from '../../service/inviteService';
import MainContext from '../../context/main/mainContext';
import AuthContext from '../../context/auth/authContext';

import { postInvite, editInvite } from '../../service/inviteService';

const ModalCalendar = () => {
	const mainContext = useContext(MainContext);
	const {
		show,
		fecha,
		hideModal,
		invi,
		currentinv,
		getCurrentInv,
		invited,
		currentinvid,
		getCurrentInvId,
		checkinvite,
		checkInvite,
		getInvited,
		passDate,
	} = mainContext;
	const authContext = useContext(AuthContext);
	const { user } = authContext;

	const handleClose = async () => {
		getCurrentInv([]);
		getCurrentInvId('');
		passDate('');
		await getInvites().then(res => {
			getInvited(res.data);
		});
		hideModal();
		setTimeout(() => checkInvite(false), 300);
	};

	const handleSubmit = () => {
		if (invited.length === 0) {
			postInvite({ invi: currentinv, day: fecha });
			handleClose();
		}
		invited.map(nv => {
			if (nv.day === fecha && nv.invi.length > 0) {
				editInvite({ invi: currentinv, day: fecha }, currentinvid);
				handleClose();
			} else {
				postInvite({ invi: currentinv, day: fecha });
				handleClose();
			}
		});
	};

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Body>
					<Modal.Title className="mb-3">{fecha}</Modal.Title>

					{user && !invi.includes(user.name) && !checkinvite ? (
						<div>
							<p>
								Queres sumarte a tomar unas birras <b>{user && user.name}</b>?
							</p>
							<h6>{invi[0] !== undefined && <b>Van a venir:</b>}</h6>
							<div className="col-6">
								{user &&
									invi &&
									invi.map((inv, id) => {
										return (
											<p key={id} className="m-1 p-0 d-inline">
												{inv}
											</p>
										);
									})}
							</div>
						</div>
					) : (
						<h4>
							{checkinvite
								? 'Ya te inscribiste, estamos esperando que te confirmen'
								: 'Invitacion confirmada!'}
						</h4>
					)}
					<div className="d-flex justify-content-end">
						<Button
							variant="light"
							className="btn btn-sm btn-cerrar text-black mt-3"
							onClick={handleClose}>
							Cerrar
						</Button>

						{user && !invi.includes(user.name) && !checkinvite && (
							<Button
								variant="light"
								className="btn btn-sm btn-crear text-black ms-2 mt-3 d-flex justify-content-center align-items-center"
								onClick={handleSubmit}>
								Unirse
							</Button>
						)}
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default ModalCalendar;
