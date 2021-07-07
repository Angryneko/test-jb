import React, { useEffect } from 'react';
import styled from 'styled-components';

import { setMenuConfig } from './menu-config.js'
import { getConfig } from "./modules/toc/data-access/api";
import { setIsLoading } from "./modules/toc/domain/store/actions";
import { useDispatch } from 'react-redux';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const AppContainer= ({ children }) => {
	const dispatch = useDispatch();

	useEffect( () => {
		async function setConfig () {
			const data = await getConfig()
			setMenuConfig(data)
		}

		setConfig().then(()=> dispatch(setIsLoading(false)))
	}, [])

	return <Wrapper>{children}</Wrapper>;
};
