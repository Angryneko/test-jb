import { Main } from '../../../../pages/Main.jsx'

export const routes = [
	{
		path: '/:urlPage',
		component: Main,
		guards: []
	},
	{
		path: '/',
		component: Main,
		guards: []
	}
];
