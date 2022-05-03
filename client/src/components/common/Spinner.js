import React from 'react';

const Spinner = () => {
	return (
		<div className="container">
			<div className="row justify-content-center mt-5 pt-5">
				<div className="spinner-border text-light mt-5" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>
		</div>
	);
};

export default Spinner;
