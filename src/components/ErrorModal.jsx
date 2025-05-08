import React from 'react';

const ErrorModal = ({isModalOpen, closeModal, textError}) => {
	return (
		<div
			className={
				isModalOpen
					? "fixed z-50 inset-0 overflow-y-auto"
					: "opacity-0 pointer-events-none"
			}
		>
			<div
				className={
					isModalOpen
						? "flex items-center justify-center min-h-screen"
						: "hidden"
				}
			>
				<div className="fixed inset-0 bg-gray-500 opacity-75"></div>
				<div
					className="z-50 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
					<div className="bg-gray-100 p-4">
						<h3 className="text-lg font-medium text-gray-900">Xatolik!</h3>
					</div>
					<div className="p-4">
						<p className="text-gray-700">
							{textError}
						</p>
					</div>
					<div className="bg-gray-100 p-4 flex gap-5 justify-center">
						<button className="btn btn-primary" onClick={closeModal}>
							OK
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ErrorModal;