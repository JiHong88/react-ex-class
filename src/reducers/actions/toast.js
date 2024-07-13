const GET = 'toast/GET';
const SET = 'toast/SET';

export const getToast = () => ({
	type: GET
});

export const setToast = (item) => ({
	type: SET,
	payload: item
});

const initialState = {
	toasts: { show: false, type: 'default' }
};

function toast(state = initialState, action) {
	switch (action.type) {
		case SET:
			return { toasts: action.payload };
		case GET:
			return { toasts: state.toasts };
		default:
			return state;
	}
}

export default toast;
