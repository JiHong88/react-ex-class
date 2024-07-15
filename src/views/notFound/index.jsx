import React from 'react';
import './error.css';

function NotFound() {
	return (
		<div className='message-container'>
			<div className='message-wrap'>
				<h2 className='title'>Page Not Found</h2>
				<div className='card'>
					<div className='icon'>
						<svg style={{ width: '6rem', height: '6rem', color: '#d9534f' }} viewBox='0 0 24 24'>
							<path fill='currentColor' d='M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16' />
						</svg>
					</div>

					<div className='desc'>404</div>
				</div>
			</div>
		</div>
	);
}

export default NotFound;
