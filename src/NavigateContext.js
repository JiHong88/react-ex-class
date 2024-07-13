import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigateContext = createContext();

export const NavigateProvider = ({ children }) => {
	const navigate = useNavigate();
	return <NavigateContext.Provider value={navigate}>{children}</NavigateContext.Provider>;
};

export const useNavigateContext = () => useContext(NavigateContext);

export function withNavigate(WrappedComponent) {
	return function WithNavigate(props) {
		const navigate = useNavigate();
		return <WrappedComponent {...props} navigate={navigate} />;
	};
}
