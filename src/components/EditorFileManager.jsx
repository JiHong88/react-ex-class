import React, { Component } from 'react';
import { FolderOpen } from '@mui/icons-material';

class EditorFileManager extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			selectedList: [],
			size: '0KB',
			title: this.props.type === 'image' ? '이미지 추가' : '파일 추가',
		};
	}

	findIndex(arr, index) {
		let idx = -1;

		arr.some(function (a, i) {
			if ((typeof a === 'number' ? a : a.index) === index) {
				idx = i;
				return true;
			}
			return false;
		});

		return idx;
	}

	uploadAction({ index, state, info, remainingFilesCount }) {
		console.log('uploadAction', index, state, info, remainingFilesCount);
		if (state === 'delete') {
			const list = [...this.state.list];
			list.splice(this.findIndex(list, index), 1);
			this.setState({ list: list });
		} else if (state === 'create') {
			const list = [...this.state.list, info];
			this.setState({ list: list });
		} else {
			// 업데이트
		}

		if (remainingFilesCount === 0) {
			this.setList();
		}
	}

	setList() {
		const list = this.state.list;
		let size = 0;
		for (let i = 0; i < list.length; i++) {
			size += Number((list[i].size / 1000).toFixed(1));
		}

		// @ts-ignore
		this.setState({
			size: size.toFixed(1) + 'KB',
		});
	}

	selectFile(evt, methodName, index) {
		evt.preventDefault();
		evt.stopPropagation();
		this.state.list[this.findIndex(this.state.list, index)][methodName]();
	}

	checkFile(index) {
		const selectedList = this.state.selectedList;
		const currentImageIdx = this.findIndex(selectedList, index);

		if (currentImageIdx > -1) {
			selectedList.splice(currentImageIdx, 1);
		} else {
			selectedList.push(index);
		}

		this.setState({
			selectedList: selectedList,
		});
	}

	deleteCheckedFiles() {
		const iamgesInfo = this.props.editor.plugins[this.props.type].fileManager.infoList;

		for (let i = 0; i < iamgesInfo.length; i++) {
			if (this.state.selectedList.indexOf(iamgesInfo[i].index) > -1) {
				iamgesInfo[i].delete();
				i--;
			}
		}

		this.setState({
			selectedList: [],
		});
	}

	fileUploadToEditor(e) {
		if (e.target.files) {
			this.props.editor.plugins[this.props.type].submitFile(e.target.files);
			e.target.value = '';
		}
	}

	render() {
		return (
			<div className='component-list'>
				<div className='file-list-info'>
					<span className='xefu-btn'>
						<span className='files-text'>{this.state.title}</span>
					</span>
					<input type='file' accept={this.props.accept || '*'} multiple={!!this.props.multiple} className='files-text files-input' onChange={(e) => this.fileUploadToEditor(e)} />
					<span className='total-size text-small-2'>{this.state.size}</span>
					<button className='btn btn-md btn-danger' disabled={this.state.selectedList.length === 0} onClick={() => this.deleteCheckedFiles()}>
						삭제
					</button>
				</div>
				{this.state.list.length > 0 && (
					<div className='file-list'>
						<ul>
							{this.state.list.map((v, i) => {
								return (
									<li key={i} onClick={() => this.checkFile(v.index)} className={this.state.selectedList.includes(v.index) ? 'checked' : ''}>
										<div>
											<div className={this.props.type === 'image' ? 'image-wrapper' : 'file-wrapper'}>
												{this.props.type === 'image' ? (
													<img src={v.src} alt='' />
												) : (
													<span>
														<FolderOpen className='gray' />
														{v.name}
													</span>
												)}
											</div>
										</div>
										<button onClick={(evt) => this.selectFile(evt, 'select', v.index)} className='image-size' style={{ cursor: 'pointer', textDecoration: 'underline', background: 'none', border: 'none', color: 'blue' }}>
											{(v.size / 1000).toFixed(1)}KB
										</button>
										<div className='image-check'>
											<svg aria-hidden='true' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' data-fa-i2svg=''>
												<path
													fill='currentColor'
													d='M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z'
												></path>
											</svg>
										</div>
									</li>
								);
							})}
						</ul>
					</div>
				)}
			</div>
		);
	}
}

export default EditorFileManager;
