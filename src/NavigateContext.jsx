import React, { createContext } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * @description navigate 함수를 저장하고 제공하기 위한 컨텍스트
 */
const NavigateContext = createContext();

/**
 * @description  useNavigate 훅을 사용하여 navigate 함수를 가져오고, 이를 NavigateContext.Provider로 감싸서 자식 컴포넌트에게 제공
 */
export const NavigateProvider = ({ children }) => {
	const navigate = useNavigate();
	return <NavigateContext.Provider value={navigate}>{children}</NavigateContext.Provider>;
};

/**
 * @description React Router v6에서 navigate 함수를 클래스 기반 컴포넌트에서 사용할 수 있도록 하는
 * - Higher-Order Component(HOC)
 * React에서 컴포넌트를 재사용하는 패턴 중 하나.
 * 컴포넌트를 입력으로 받아서 새로운 컴포넌트를 반환하는 함수.
 */
export function withNavigate(WrappedComponent) {
	return function WithNavigate(props) {
		const navigate = useNavigate();
		return <WrappedComponent {...props} navigate={navigate} />;
	};
}
