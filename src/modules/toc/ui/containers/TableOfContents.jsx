import styled from 'styled-components';
import React, {useEffect} from "react";

import { useDispatch, useSelector } from 'react-redux';

import { setSelectedPageId, setOpenIds, setSelectedAnchorId, setTreeOpenIds } from "../../domain/store/actions";
import {
    getOpenIds,
    getSelectedPageId,
    getSelectedAnchorId,
    getAllPagesIds,
    getTreeOpenIds
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
    const dispatch = useDispatch();

    const allPagesIds = useSelector(getAllPagesIds);
    const selectedPageId = useSelector(getSelectedPageId);
    const selectedAnchorId = useSelector(getSelectedAnchorId);
    const openIds = useSelector(getOpenIds);
    const treeOpenIds = useSelector(getTreeOpenIds);

    function findAllRelatedNodes(page) {
        let arrayParentIds = [];
        let parentId = page?.parentId;
        while (parentId) {
            const parent = menuConfig.entities.pages[parentId];
            arrayParentIds.push(parent.id);
            parentId = parent?.parentId;
        }
        return arrayParentIds.reverse()
    }

    function addOpenPage (page) {
        dispatch(setOpenIds( [...openIds, page.id]));
    }

    function addItemToTreeOpenIds (page) {
        const copyTree = JSON.parse(JSON.stringify(treeOpenIds))
        if(!page.parentId) {
            copyTree[page.id] = {}
        }
        else {
            const arrayParentIds = findAllRelatedNodes(page)
            let linkInTree = copyTree
            arrayParentIds.forEach(element => {
                linkInTree = linkInTree[element]
            })
            linkInTree[page.id] = {}
        }
        dispatch(setTreeOpenIds(copyTree))
    }

    function removeItemsFromTreeOpenIdsAndOpenIds (page) {
        const copyTree = JSON.parse(JSON.stringify(treeOpenIds))
        let linkInTree = copyTree
        const arrayParentIds = findAllRelatedNodes(page)

        arrayParentIds.forEach(element => {
            if (element in linkInTree && element !== page.id) {
                linkInTree = linkInTree[element]
            }
        })

        linkInTree = {
            [page.id]: linkInTree[page.id]
        }

        let idsForDelete = []

        JSON.stringify(linkInTree,(key, value) => {
            if(key) {
                idsForDelete.push(key)
            }
            return value
        })

        if(page.id in copyTree) {
            delete copyTree[page.id]
        }
        else {
            linkInTree = {}
        }

        let copyOpenIds = [...openIds]

        copyOpenIds = copyOpenIds.filter(item => !idsForDelete.includes(item));

        dispatch(setTreeOpenIds(copyTree));
        dispatch(setOpenIds(copyOpenIds));

    }

    function togglePage(page) {
        if (page.url && selectedPageId !== page.id) {
            scrollToElement({name: 'toc', id: page.id});
            dispatch(setSelectedPageId(page.id));
        }
        if (openIds.includes(page.id)) {
            if(page.id === selectedPageId || !page.url) {
                removeItemsFromTreeOpenIdsAndOpenIds(page)
            }
        } else {
            addOpenPage(page);
            addItemToTreeOpenIds(page);
        }
    }

    function toggleAnchor(anchor) {
        dispatch(setSelectedAnchorId(anchor.id));
    }

    function anchorsLevel() {
        if(selectedPageId) {
            return menuConfig.entities.pages[selectedPageId].level;
        }
        return 0;
    }

    useEffect( () => {
        scrollToElement({name: 'toc-scroll', id: selectedAnchorId || selectedPageId, smooth: false});
    }, [])

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