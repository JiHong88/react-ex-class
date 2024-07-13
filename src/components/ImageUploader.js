import React, { Component, Fragment } from 'react';
import IconSlot from './IconSlot';
import { Button } from 'react-bootstrap';
import './ImageUploader.scss';

class ImageUploader extends Component {
	fileEl;
	fileType = '';
	fileName = '';
	multi = false;
	multiFileLength = 0;
	multiFiles = [];

	constructor(props) {
		super(props);

		this.state = {
			src: props.imageSrc,
			w: this.props.uploadSize?.w || 40,
			h: this.props.uploadSize?.h || 40
		};

		this.multi = props.type !== 'button' ? false : !!props.multi;
	}

	componentDidUpdate(prevProps) {
		if (prevProps.imageSrc !== this.props.imageSrc) {
			this.setState({
				src: this.props.imageSrc
			});
		}
		if (prevProps.uploadSize?.w !== this.props.uploadSize?.w || prevProps.uploadSize?.h !== this.props.uploadSize?.h) {
			this.setState({
				src: this.props.imageSrc
			});
		}
	}

	onChangeImage(event) {
		const files = event.target.files;

		if (files) {
			this.multiFileLength = files.length;
			for (let i = 0; i < files.length; i++) {
				this.resizeImage(files[i]);
			}
		} else {
			this.props.fileHandler(undefined);
			this.setState({
				src: ''
			});
		}
	}

	// 이미지 크기 조정
	resizeImage(file) {
		const max_size = Infinity;
		const img = document.createElement('img');
		const canvas = document.createElement('canvas');
		const reader = new FileReader();
		const inst = this;
		this.fileType = file.type;
		this.fileName = file.name;

		reader.onload = function (e) {
			img.src = e.target.result;
			img.onload = function () {
				let width = img.width;
				let height = img.height;
				const MAX_WIDTH = (inst.props.uploadSize?.w || Infinity) * (inst.props.quality || 1);
				const MAX_HEIGHT = (inst.props.uploadSize?.h || Infinity) * (inst.props.quality || 1);

				if (width > height) {
					if (width > MAX_WIDTH) {
						height *= MAX_WIDTH / width;
						// if (!inst.props.quality) height = height <= MAX_HEIGHT ? height : MAX_HEIGHT;
						width = MAX_WIDTH;
					}
				} else {
					if (height > MAX_HEIGHT) {
						width *= MAX_HEIGHT / height;
						// if (!inst.props.quality) width = width <= MAX_WIDTH ? width : MAX_WIDTH;
						height = MAX_HEIGHT;
					}
				}

				const ratio = inst.props.ratio && Math.abs(Math.abs(MAX_WIDTH - MAX_HEIGHT) - Math.abs(width - height)) > width / 10;
				canvas.width = width;
				canvas.height = height;
				const ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0, width, height);

				canvas.toBlob(
					(blob) => {
						const uploadImg = [new File([blob], file.name)][0];
						// if (blob.size > size) {
						//     inst.resizeImage(uploadImg, max_size / blob.size);
						//     return;
						// }

						let init = false;

						if (!inst.multi) {
							inst.imageFileReader(uploadImg, !!ratio);
							if (!ratio) inst.props.fileHandler(uploadImg, canvas);
							init = true;
						} else {
							inst.multiFiles.push(uploadImg);
							if (inst.multiFileLength === inst.multiFiles.length) {
								inst.props.fileHandler(inst.multiFiles, canvas);
								init = true;
							}
						}

						if (init) {
							inst.multiFiles = [];
							inst.multiFileLength = 0;
							// 버튼일 경우 file input 초기화
							if (inst.props.type === 'button') inst.fileEl.value = '';
						}
					},
					file.type,
					file.size > max_size ? Math.floor((max_size / file.size) * 10) / 10 : 1
				);
			};
		};

		reader.readAsDataURL(file);
	}

	imageFileReader(file, crop) {
		const reader = new FileReader();
		reader.onload = function (reader) {
			this.createImage(reader.result, crop);
		}.bind(this, reader);
		reader.readAsDataURL(file);
	}

	cropImg(src) {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		const inst = this;

		const img = new Image();
		img.src = src;
		img.onload = () => {
			const rw = (inst.props.uploadSize?.w || 1) * (inst.props.quality || 1);
			const rh = (inst.props.uploadSize?.h || 1) * (inst.props.quality || 1);
			let w = img.width;
			let h = img.height;

			let x = 0,
				y = 0,
				r = 0;
			if (h > rh) {
				y = (h - rh) / 2;
				h = rh;
			} else if (w > rw) {
				x = (w - rw) / 2;
				w = rw;
			} else {
				// 이미지가 작을떼 비율대로 자르기
				if (w > h) {
					r = w / (w / h);
					x = (w - r) / 2;
					w = r;
				} else {
					r = h / (h / w);
					y = (h - r) / 2;
					h = r;
				}
			}

			canvas.width = w;
			canvas.height = h;
			ctx.drawImage(img, x, y, w, h, 0, 0, w, h);

			canvas.toBlob(
				(blob) => {
					const uploadImg = [new File([blob], this.fileName)][0];
					inst.imageFileReader(uploadImg, false);
					inst.props.fileHandler(uploadImg, canvas);
				},
				this.fileType,
				1
			);
		};
	}

	createImage(src, crop) {
		if (crop) {
			this.cropImg(src);
		} else {
			this.setState({ src: src });
		}
	}

	render() {
		let area;
		const w = this.state.w + 'px';
		const h = this.state.h + 'px';

		if (this.props.type === 'icon') {
			area = (
				<Fragment>
					<IconSlot style={{ margin: '1px auto' }} src={this.state.src || `${process.env.PUBLIC_URL}/img/upload.png`} size={{ w: w, h: h }} square={this.props.iconSquare || !this.state.src}></IconSlot>
					<div className='desc'>
						가로:세로 = 1:1 비율의 이미지를 설정 합니다. <br />
						실제 보여지는 Size는 가로 <span>{w}</span>, 세로 <span>{h}</span> 입니다. <br />
					</div>
				</Fragment>
			);
		} else if (this.props.type === 'image') {
			area = <img src={this.state.src} alt='' className='uploaded-image' style={{ width: '100%', height: '100%' }}></img>;
		} else if (this.props.type === 'logo') {
			area = (
				<Fragment>
					<IconSlot
						style={{ margin: '1px auto' }}
						src={this.state.src || `${process.env.PUBLIC_URL}/img/upload_logo.png`}
						square={this.props.iconSquare || !this.state.src}
						size={{ w: this.state.src ? 'auto' : '180px', h: '40px' }}
						maxWidth={'150px'}
					></IconSlot>
					<div className='desc'>
						실제 보여지는 Size는 가로 <span>auto</span>, 세로 <span>40px</span> 입니다. <br />* 로고의 최대 사이즈는 150px 입니다.
					</div>
				</Fragment>
			);
		} else if (this.props.type === 'avatar') {
			area = <IconSlot style={{ margin: '1px auto' }} src={this.state.src || `${process.env.PUBLIC_URL}/img/upload.png`} size={{ w: w, h: h }} square={this.props.iconSquare || !this.state.src}></IconSlot>;
		} else {
			// button
			area = (
				<Button className='btn-md font-weight-bold my-2' variant='dark-primary'>
					파일 올리기
				</Button>
			);
		}

		return (
			<div className={`file-area ${this.props.type === 'button' ? 'img-btn' : ''}`}>
				<div className={'file-upload' + (this.props.type === 'avatar' ? ' file-avatar' : '')}>{area}</div>
				<input type='file' accept='.jpg, .jpeg, .png, .ico, .tif, .tiff, .gif, .bmp, .raw' multiple={this.multi} className={'file-input'} ref={(elem) => (this.fileEl = elem)} onChange={(event) => this.onChangeImage(event)} />
			</div>
		);
	}
}

export default ImageUploader;
