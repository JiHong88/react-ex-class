import React, { Component, createRef } from 'react';
import suneditor from 'suneditor';
import langs, { ko } from 'suneditor/src/langs';
import plugins from 'suneditor/src/plugins';
import { EditorView, basicSetup, minimalSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import 'suneditor/dist/suneditor.min.css';
import './Editor.css';
import EditorFileManager from './EditorFileManager';

class Editor extends Component {
	txtArea;
	editor;
	imageManager = createRef();
	fileManager = createRef();

	constructor(props) {
		super(props);
		this.txtArea = createRef();
		this.state = {
			editor: null,
		};
	}

	componentDidMount() {
		this.editor = suneditor.create(this.txtArea.current, {
			plugins: plugins,
			excludedPlugins: ['exportPdf', 'layout', 'template', 'mention', 'list', 'math', 'layout', 'video', 'audio', 'fileUpload', 'imageGallery'],
			componentAutoSelect: false,
			lang: {
				...ko,
				asInline: '인라인 스타일',
			},
			stickyToolbar: 0,
			width: '100%',
			height: 'auto',
			minHeight: '200px',
			value: this.props.contents,
			placeholder: '내용을 입력해주세요.',
			image: {
				uploadUrl: 'http://localhost:3000/editor/upload',
				allowMultiple: true,
			},
			fontSize: {
				showIncDecControls: false,
				disableInput: false,
				sizeUnit: 'px',
				showDefaultSizeLabel: true,
			},
			externalLibs: {
				codeMirror: {
					EditorView: EditorView,
					extensions: [
						basicSetup,
						html({
							matchClosingTags: true,
							autoCloseTags: true,
						}),
						javascript(),
					],
					minimalSetup: minimalSetup,
				},
			},
			events: {
				onSave: (contents) => this.props.onSave(contents),
				onBlur: () => {
					if (typeof this.props.onBlur === 'function') this.props.onBlur();
				},
				onImageAction: (data) => this.imageManager.current.uploadAction(data),
				onFileAction: (data) => this.fileManager.current.uploadAction(data),
			},
			buttonList: [
				// default
				['newDocument', 'selectAll', 'undo', 'redo'],
				'|',
				['font', 'fontSize', 'formatBlock'],
				'|',
				['blockquote'],
				'|',
				['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
				'|',
				['fontColor', 'backgroundColor', '|', 'copyFormat'],
				'|',
				['removeFormat'],
				'|',
				['outdent', 'indent'],
				'|',
				['align', 'hr', 'list_numbered', 'list_bulleted', 'lineHeight'],
				'|',
				['table', 'link', 'image'],
				'|',
				['fullScreen', 'codeView'],
				'|',
				['preview'],
				'|',
				['save'],
				// responsive
				[
					'%1024',
					[
						['newDocument', 'selectAll', 'undo', 'redo'],
						'|',
						[':문단&글꼴-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'blockquote'],
						'|',
						['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
						'|',
						['fontColor', 'backgroundColor', '|', 'copyFormat'],
						'|',
						['removeFormat'],
						'|',
						['outdent', 'indent'],
						'|',
						['align', 'hr', 'list_numbered', 'list_bulleted', 'lineHeight'],
						'|',
						['-right', 'save'],
						'|',
						['-right', ':기타-default.more_vertical', 'fullScreen', 'codeView', 'preview'],
						'|',
						['-right', ':테이블&미디어-default.more_plus', 'table', 'link', 'image'],
					],
				],
				[
					'%1020',
					[
						['newDocument', 'selectAll', 'undo', 'redo'],
						'|',
						[':문단&글꼴-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'blockquote'],
						'|',
						['bold', 'underline', 'italic', 'strike'],
						'|',
						[':글자 스타일-default.more_text', 'subscript', 'superscript', '|', 'fontColor', 'backgroundColor', '|', 'copyFormat'],
						'|',
						['removeFormat'],
						'|',
						['outdent', 'indent'],
						'|',
						['align', 'hr', 'list_numbered', 'list_bulleted', 'lineHeight'],
						'|',
						['-right', 'save'],
						'|',
						['-right', ':기타-default.more_vertical', 'fullScreen', 'codeView', 'preview'],
						'|',
						['-right', ':테이블&미디어-default.more_plus', 'table', 'link', 'image'],
					],
				],
				[
					'%840',
					[
						['newDocument', 'selectAll', 'undo', 'redo'],
						'|',
						[':문단&글꼴-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'blockquote'],
						'|',
						[':글자 스타일-default.more_text', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', '|', 'fontColor', 'backgroundColor', '|', 'copyFormat'],
						'|',
						['removeFormat'],
						'|',
						['outdent', 'indent'],
						'|',
						['align', 'hr', 'list_numbered', 'list_bulleted', 'lineHeight'],
						'|',
						[':테이블&미디어-default.more_plus', 'table', 'link', 'image'],
						'|',
						['-right', 'save'],
						'|',
						['-right', ':기타-default.more_vertical', 'fullScreen', 'codeView', 'preview'],
					],
				],
				[
					'%700',
					[
						['newDocument', 'selectAll', 'undo', 'redo'],
						'|',
						[':문단&글꼴-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'blockquote'],
						'|',
						[':글자 스타일-default.more_text', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', '|', 'fontColor', 'backgroundColor', '|', 'copyFormat'],
						'|',
						['removeFormat'],
						'|',
						['outdent', 'indent'],
						'|',
						[':리스트&라인-default.more_horizontal', 'align', 'hr', 'list_numbered', 'list_bulleted', 'lineHeight'],
						'|',
						[':테이블&미디어-default.more_plus', 'table', 'link', 'image'],
						'|',
						['-right', 'save'],
						'|',
						['-right', ':기타-default.more_vertical', 'fullScreen', 'codeView', 'preview'],
					],
				],
				[
					'%512',
					[
						['newDocument', 'selectAll', 'undo', 'redo'],
						'|',
						[':문단&글꼴-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'blockquote'],
						'|',
						[':글자 스타일-default.more_text', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', '|', 'fontColor', 'backgroundColor', '|', 'copyFormat', 'removeFormat'],
						'|',
						[':리스트&라인-default.more_horizontal', 'outdent', 'indent', 'align', 'hr', 'list_numbered', 'list_bulleted', 'lineHeight'],
						'|',
						[':테이블&미디어-default.more_plus', 'table', 'link', 'image'],
						'|',
						['-right', 'save'],
						'|',
						['-right', ':기타-default.more_vertical', 'fullScreen', 'codeView', 'preview'],
					],
				],
				[
					'%440',
					[
						['newDocument', 'selectAll', 'undo', 'redo'],
						'|',
						[':문단&글꼴-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'blockquote'],
						'|',
						[':글자 스타일-default.more_text', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', '|', 'fontColor', 'backgroundColor', '|', 'copyFormat', 'removeFormat'],
						'|',
						[':리스트&라인-default.more_horizontal', 'outdent', 'indent', 'align', 'hr', 'list_numbered', 'list_bulleted', 'lineHeight'],
						'|',
						[':테이블&미디어-default.more_plus', 'table', 'link', 'image'],
						'|',
						['save'],
						'|',
						[':기타-default.more_vertical', 'fullScreen', 'codeView', 'preview'],
					],
				],
			],
		});

		this.setState({ editor: this.editor });
	}

	componentDidUpdate(prevProps) {
		if (this.props.contents !== prevProps.contents) {
			console.log('this.props.contents', this.props.contents);
			this.state.editor.html.set(this.props.contents);
			this.state.editor.history.reset(true);
		}
	}

	componentWillUnmount() {
		if (!this.state.editor) return;
		console.log('destroy');
		this.state.editor.destroy();
		this.setState({ editor: null });
		this.editor = null;
	}

	render() {
		return (
			<div>
				<textarea ref={this.txtArea} />
				<EditorFileManager editor={this.state.editor} type='image' ref={this.imageManager} accept='.jpg, .jpeg, .png, .ico, .tif, .tiff, .gif, .bmp, .raw, .webp, .svg' multiple={true} />
				{/* <EditorFileManager editor={this.state.editor} type='fileUpload' ref={this.fileManager} multiple={false} /> */}
			</div>
		);
	}
}

export default Editor;
