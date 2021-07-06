import styled from 'styled-components';
import React from "react";
import { menuConfig } from '../../../menu-config.js';
import { useSelector } from 'react-redux';
import {getSelectedPageId} from "../../toc/domain/store/selectors";

const Wrapper = styled.div`
  height: 100%;
  max-height: 100%;
  overflow: auto;
  width: calc(100vw - 280px);
  padding: 100px 64px 20px;
  line-height: 1.2;
  box-sizing: border-box;
`

const Title = styled.h1`
	font-size: 40px;
	font-weight: 800;
	line-height: 1.2;
	margin: 0 0 40px;
`
const Anchor = styled.h2`
	font-weight: 500;
	font-size: 24px;
	line-height: 1.2;
	margin: 40px 0 20px;
`

export const Content = () => {
	const selectedPageId = useSelector(getSelectedPageId)

	function isAnchors () {
		return selectedPageId && menuConfig.entities.pages[selectedPageId].anchors
	}

	return (<Wrapper>
		<Title>{(menuConfig?.entities?.pages)? selectedPageId ? menuConfig.entities.pages[selectedPageId].title : 'Select page' : 'Loading...'}</Title>
		{isAnchors() ? menuConfig.entities.pages[selectedPageId].anchors.map(anchor=>(
			<Anchor key={anchor}># {menuConfig.entities.anchors[anchor].title}</Anchor>
		)): null}
	</Wrapper>)
}