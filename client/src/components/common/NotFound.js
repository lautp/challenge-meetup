import React from 'react';
import cmnotfound from '../../img/cm-notfound.png';

const NotFound = () => {
	return (
		<div className="container mt-5">
			<div className="row ">
				<div className="card d-inline bg-light notbox">
					<h2 className="text-center mt-4">Esta pagina no existe!</h2>
					<div className="d-flex justify-content-center">
						<img src={cmnotfound} alt="cookie munstah" className="img-not" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
