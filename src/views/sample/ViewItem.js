import React, { Component } from 'react';
import { connect } from 'react-redux';
import SweetAlert from '../../components/SweetAlert';
import { setToast } from '../../reducers/actions/toast';
import apiInst from '../../apis';

class ViewItem extends Component {
	urlParams = new URLSearchParams(window.location.search);
	id = this.urlParams.get('id') || '';

	constructor(props) {
		super(props);
		this.state = {
			title: '',
			content: '',
		};
	}

	async componentDidMount() {
		await this.getPost();
	}

	async getPost() {
		this.setState({
			title: '제목',
			content: `<p>내용</p>`,
		});
		// await apiInst
		// 	.get(`/forum/post/${this.id}`)
		// 	.then(({ data }) => {
		// 		this.setState({
		// 			title: data.title,
		// 			content: data.content
		// 		});
		// 	})
		// 	.catch((err) => {
		// 		SweetAlert.fire({
		// 			title: '에러',
		// 			html: err,
		// 			icon: 'error',
		// 			showCancelButton: false,
		// 			allowOutsideClick: true,
		// 			confirmButtonText: '확인'
		// 		});
		// 	});
	}

	render() {
		return (
			<div className={`wrap`}>
				<div className={`vField ${this.state.title ? ' error' : ''}`}>
					<input
						type='text'
						className='title-edit'
						value={this.state.title}
						onChange={(event) => {
							this.setState({ title: event.target.value });
						}}
						placeholder='제목'
					/>
				</div>

				<div className='editor-input'>
					<div className='sun-editor-editable' dangerouslySetInnerHTML={{ __html: this.state.content }}></div>
				</div>

				<div className='post-button-group float-right'>
					<button className='btn btn-primary' onClick={() => this.save()}>
						<span>저장</span>
					</button>
				</div>
			</div>
		);
	}
}

export default connect(null, (dispatch) => ({
	dispatchToast: (amount) => dispatch(setToast(amount)),
}))(ViewItem);
