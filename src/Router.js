import React, { Component, Suspense } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { NavigateProvider, withNavigate } from './NavigateContext';
import NotFound from './views/notFound';

// Routes
import { DefaultLayout, defaultRoute, routes } from './routes';

let pathname = '';
class Router extends Component {
	constructor(props) {
		super(props);

		// Set default layout
		this.routes = routes.map((route) => {
			route.layout = route.layout || DefaultLayout;
			route.exact = typeof route.exact === 'undefined' ? true : route.exact;
			return route;
		});

		this.state = {
			loading: true
		};

		// Set app loading class
		document.documentElement.classList.add('app-loading');
	}

	async componentDidMount() {
		const splashScreen = document.querySelector('.app-splash-screen');
		const removeLoadingClass = () => {
			document.documentElement.classList.remove('app-loading');
		};

		this.setState({ loading: false });

		// Remove splash screen
		if (splashScreen) {
			splashScreen.style.opacity = 0;
			setTimeout(() => {
				splashScreen?.parentNode?.removeChild(splashScreen);
				removeLoadingClass();
			}, 150);
		} else {
			removeLoadingClass();
		}
	}

	async componentDidUpdate() {
		if (pathname !== window.location.pathname) {
			await this.onChangeRoute(window.location.pathname);
		}
	}

	async onChangeRoute(path) {
		console.log(`router change : "${path}"`);
		pathname = path;
	}

	setTitle(title) {
		document.title = title;
	}

	scrollTop(to, duration, element = document.scrollingElement || document.documentElement) {
		if (element.scrollTop === to) return;
		const start = element.scrollTop;
		const change = to - start;
		const startDate = +new Date();

		if (!duration) {
			element.scrollTop = to;
			return;
		}

		const easeInOutQuad = (t, b, c, d) => {
			t /= d / 2;
			if (t < 1) return (c / 2) * t * t + b;
			t--;
			return (-c / 2) * (t * (t - 2) - 1) + b;
		};

		const animateScroll = () => {
			const currentDate = +new Date();
			const currentTime = currentDate - startDate;
			element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
			if (currentTime < duration) {
				requestAnimationFrame(animateScroll);
			} else {
				element.scrollTop = to;
			}
		};

		animateScroll();
	}

	render() {
		return (
			<BrowserRouter basename={process.env.REACT_APP_BASENAME}>
				<NavigateProvider>
					<Suspense fallback={<div>{/** HTML 로딩 - splashScreen 로 대체 */}</div>}>
						<Routes>
							{this.routes.map((route) => {
								const ComponentWithNavigate = withNavigate(route.component);
								return (
									<Route
										path={route.path}
										element={
											<route.layout title={route.title}>
												<ComponentWithNavigate setTitle={this.setTitle} scrollTop={this.scrollTop} />
											</route.layout>
										}
										key={route.path}
									/>
								);
							})}
							<Route path='/' element={<Navigate to={defaultRoute} />} />
							<Route path='*' element={<NotFound />} />
						</Routes>
					</Suspense>
				</NavigateProvider>
			</BrowserRouter>
		);
	}
}

export default Router;
