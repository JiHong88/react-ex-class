import Axios from 'axios';
import { openLoading, closeLoading } from '../utils/loading';

const baseURL = 'http://localhost:3000';
const instance = Axios.create({
	baseURL: baseURL,
	timeout: 360000
});

instance.interceptors.request.use(async (config) => {
	openLoading();
	return config;
});

instance.interceptors.response.use(
	function (response) {
		closeLoading();
		return response;
	},
	function (error) {
		closeLoading();
		return Promise.reject(error);
	}
);

export default instance;
