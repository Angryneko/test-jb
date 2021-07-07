import styled from 'styled-components';
import React, {useEffect} from "react";

import { useDispatch, useSelector } from 'react-redux';

import { setSelectedPageId, setOpenIds, setSelectedAnchorId } from "../../domain/store/actions";
import {
    getOpenIds,
    getSelectedPageId,
    getSelectedAnchorId,
    getAllPagesIds
} from "../../domain/store/selectors";

import { scrollToElement } from "../../../../common/helpers/scrollToElement";

import { menuConfig } from '../../../../menu-config.js';

import { LinkPage } from "./LinkPage.jsx";
import { LinkAnchor } from "./LinkAnchor.jsx";

const Wrapper = styled.ul`
   height: 100%;
   max-height: 100%;
   overflow: auto;
   width: 280px;
   border-right: 1px solid #d8d8d9;
   padding: 24px 0;
   box-sizing: border-box;
`

export const TableOfContents = () => {
    console.log('TABLE___________________')
    const dispatch = useDispatch();
    const allPagesIds = useSelector(getAllPagesIds);

    const selectedPageId = useSelector(getSelectedPageId);
    const selectedAnchorId = useSelector(getSelectedAnchorId);
    const openIds = useSelector(getOpenIds);

    function addOpenPage (data) {
        console.log('add')
        dispatch(setOpenIds( [...openIds, data.id]))
    }

    function removeOpenPage(data) {
        console.log('remove')
        dispatch(setOpenIds(openIds.filter(item => item !== data.id)))
    }

    function togglePage(data) {
        if (data.url) {
            scrollToElement({name: 'toc', id: data.id});
            dispatch(setSelectedPageId(data.id));
        }
        if (openIds.includes(data.id)) {
            if(data.id === selectedPageId) {
                removeOpenPage(data);
            }
        } else {
            addOpenPage(data);
        }
    }

    function toggleAnchor(data) {
        dispatch(setSelectedAnchorId(data.id));
    }


    function anchorsLevel() {
        if(selectedPageId) {
            return menuConfig.entities.pages[selectedPageId].level;
        }
        return 0;
    }

    useEffect( () => {
        scrollToElement({name: 'toc-scroll', id: selectedAnchorId || selectedPageId, smooth: false})
    }, [ ])

    return (
    <Wrapper>
      { allPagesIds.length && allPagesIds.map((page) => (
          (page.type === 'page') ?
          <LinkPage key={page.id}
            page={menuConfig.entities.pages[page.id]}
            isActive={openIds.includes(page.id)}
            isSelectedPage={selectedPageId === page.id}
            togglePage={togglePage}/> :
          <LinkAnchor key={page.id}
            anchor={menuConfig.entities.anchors[page.id]}
            level={anchorsLevel()}
            toggleAnchor={toggleAnchor}/>
      ))
      }
    </Wrapper>)
}