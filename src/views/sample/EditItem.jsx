import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import Editor from '@/components/Editor';
import SweetAlert from '@/components/SweetAlert';
import { setToast } from '@/reducers/actions/toast';
import apiInst from '@/apis';

class EditItem extends Component {
	urlParams = new URLSearchParams(window.location.search);
	editorRef = createRef();
	titleInput = createRef();
	id = this.urlParams.get('id') || '';

	constructor(props) {
		super(props);
		this.state = {
			title: '',
			content: ''
		};
	}

	async componentDidMount() {
		if (this.id) {
			await this.getPost();
		}
	}

	async getPost() {
		await apiInst
			.get(`/forum/post/${this.id}`)
			.then(({ data }) => {
				this.setState({
					title: data.title,
					content: data.content
				});
			})
			.catch((err) => {
				SweetAlert.fire({
					title: '에러',
					html: err,
					icon: 'error',
					showCancelButton: false,
					allowOutsideClick: true,
					confirmButtonText: '확인'
				});
			});
	}

	save() {
		const title = this.state.title;
		const contents = this.editorRef.current.editor.html.get();

		if (!title.trim() || !contents) {
			SweetAlert.fire({
				title: '에러',
				html: '제목은 필수 입력사항 입니다.',
				icon: 'warning',
				showCancelButton: false,
				allowOutsideClick: true,
				confirmButtonText: '확인'
			});
			return false;
		}

		// save
		console.log('contents', contents);

		this.props.dispatchToast({
			show: true,
			header: '저장',
			body: '저장 완료',
			type: 'success'
		});
	}

	render() {
		return (
			<div className={`wrap`}>
				<div className={`vField ${this.titleInput.value ? ' error' : ''}`}>
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
					<Editor ref={this.editorRef} contents={this.state.content} onSave={this.save.bind(this)} />
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
	dispatchToast: (amount) => dispatch(setToast(amount))
}))(EditItem);
