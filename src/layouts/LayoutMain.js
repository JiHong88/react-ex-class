import React, { Component } from 'react';

class LayoutMain extends Component {
	render() {
		return (
			<div className='layout-wrapper layout-1 layout-without-sidenav dp'>
				<div className='layout-inner'>
					<div className='layout-container'>
						<div className='layout-content'>
							<div className='container-fluid flex-grow-1 container-p-y'>{this.props.children}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default LayoutMain;
