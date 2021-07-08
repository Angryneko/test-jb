import styled from 'styled-components';
import React, {useEffect} from "react";
import { menuConfig } from '../../../menu-config.js';
import { useSelector } from 'react-redux';
import { getSelectedPageId, getSelectedAnchorId } from "../../toc/domain/store/selectors";

import { FishText } from "./FishText";
import { scrollToElement } from "../../../common/helpers/scrollToElement";

const Wrapper = styled.div`
  height: 100%;
  max-height: 100%;
  overflow: auto;
  width: calc(100vw - 280px);
  padding: 100px 64px 64px;
  line-height: 1.2;
  box-sizing: border-box;
`

const Title = styled.h1``

const Anchor = styled.h2`
	color: ${props => props.selectedAnchor ? '#000': '#333'};
`

export const Content = () => {
	const selectedPageId = useSelector(getSelectedPageId);
	const selectedAnchorId = useSelector(getSelectedAnchorId);

	function isAnchors () {
		return selectedPageId && menuConfig.entities.pages[selectedPageId].anchors;
	}

	useEffect(() => {
		if(selectedAnchorId) {
			scrollToElement({name:'toc', id:selectedAnchorId})
		}
	},[selectedAnchorId])

	return (<Wrapper id="content">
		<section>
			<Title data-toc={menuConfig.entities.pages[selectedPageId].id}>
				{menuConfig.entities.pages[selectedPageId].title}
			</Title>
			<FishText/>
		</section>
		{isAnchors() ? menuConfig.entities.pages[selectedPageId].anchors.map(anchor => (
			<section key={anchor}>
				<Anchor
	        as={'h' + (menuConfig.entities.anchors[anchor].level + 2)}
	        data-toc={menuConfig.entities.anchors[anchor].id}
	        selectedAnchor={selectedAnchorId === anchor}>
					{ menuConfig.entities.anchors[anchor].title}
				</Anchor>
				<FishText/>
			</section>
		)): null}
	</Wrapper>)
}