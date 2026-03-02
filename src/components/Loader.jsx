import React from 'react';

const Loader = ({ size = 'h-8 w-8', color = 'border-blue-600' }) => {
	return (
		<div className="flex justify-center items-center h-full">
			<div
				className={`
          animate-spin rounded-full border-2 border-t-transparent
          ${size} ${color}
        `}
			></div>
		</div>
	);
};

export default Loader;