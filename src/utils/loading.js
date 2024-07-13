const progress = document.querySelector('.app-progress');
let loadingIndex = 0;
let closeTimer;
let forceCloseTimer;

export const openLoading = () => {
	loadingIndex++;
	progress.style.display = 'block';

	// 최대 2.5초
	clearTimeout(forceCloseTimer);
	forceCloseTimer = setTimeout(() => {
		progress.style.display = 'none';
		loadingIndex = 0;
	}, 2500);
};

export const closeLoading = () => {
	loadingIndex--;
	clearTimeout(closeTimer);
	closeTimer = setTimeout(() => {
		if (loadingIndex <= 0) {
			clearTimeout(forceCloseTimer);
			progress.style.display = 'none';
			loadingIndex = 0;
		}
	}, 0);
};
