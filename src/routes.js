import { lazy } from 'react';

// Layouts
import LayoutMain from './layouts/LayoutMain';

export const DefaultLayout = LayoutMain;
export const defaultRoute = '/';
export const routes = [
	{
		path: '/',
		component: lazy(() => import('./views/Main'))
	},
	// sample
	{
		path: '/sample/edit',
		component: lazy(() => import('./views/sample/EditItem')),
		layout: LayoutMain
	},
	{
		path: '/sample/list',
		component: lazy(() => import('./views/sample/ItemList')),
		layout: LayoutMain
	},
	{
		path: '/sample/update',
		component: lazy(() => import('./views/sample/UpdateItem')),
		layout: LayoutMain
	},
	{
		path: '/sample/delete',
		component: lazy(() => import('./views/sample/DeleteItem')),
		layout: LayoutMain
	}
];
