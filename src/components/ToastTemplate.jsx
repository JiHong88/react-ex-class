import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toast } from 'react-bootstrap';
import './ToastTemplate.css';
import { CheckCircleOutline, ErrorOutline, Close } from '@mui/icons-material';
import { setToast } from '@/reducers/actions/toast';

class ToastTemplate extends Component {
	timer = null;

	constructor(props) {
		super(props);
		this.state = {
			show: false,
		};
	}

	close() {
		this.props.dispatchToast({ show: false });
	}

	getIcon() {
		switch (this.props.toasts?.type) {
			case 'success':
				return <CheckCircleOutline className={'success mr-1'} />;
			case 'warning':
				return <ErrorOutline className={'warning mr-1'} />;
			case 'danger':
				return <Close className={'danger mr-1'} />;
			default:
				return null;
		}
	}

	static getDerivedStateFromProps(props, state) {
		const { show } = props.toasts;
		if (show === state.show) return null;
		return { show };
	}

	componentDidUpdate(_prevProps, prevState) {
		if (prevState.show === this.state.show) return;

		this.setState({ show: this.state.show });

		if (this.timer) this.timer = clearTimeout(this.timer);
		if (this.state.show) {
			this.timer = setTimeout(() => {
				this.timer = null;
				this.close();
			}, 1500);
		}
	}

	render() {
		return (
			<Toast className={`toast-template toast-type-${this.props.toasts.type}`} show={this.state.show} onClose={this.close.bind(this)}>
				<Toast.Header>
					{this.getIcon()}
					<strong className={'mr-auto'}>{this.props.toasts.header}</strong>
				</Toast.Header>
				<Toast.Body>{this.props.toasts.body}</Toast.Body>
			</Toast>
		);
	}
}

export default connect(
	(state) => ({
		toasts: state.toast.toasts,
	}),
	(dispatch) => ({
		dispatchToast: (amount) => dispatch(setToast(amount)),
	}),
)(ToastTemplate);
