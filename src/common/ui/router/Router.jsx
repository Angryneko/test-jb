import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { routes } from './config/routes';

export const Router = () => {
	return (
			<BrowserRouter>
				<Switch>
					{routes.map((route) => (
							<Route
									key={route.path}
									path={route.path}
									render={() => <route.component />}
							/>
					))}
					<Route path="/not-found">
						404 Not Found
					</Route>
				</Switch>
			</BrowserRouter>
	);
};
