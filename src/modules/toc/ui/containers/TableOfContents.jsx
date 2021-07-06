import styled from 'styled-components';
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux';

import { setSelectedPageId } from "../../domain/store/actions";
import { getSelectedPageId } from "../../domain/store/selectors";

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
    const [openIds, setOpenIds] = useState([])
    const [allPagesIds, setAllPagesIds] = useState([])

    const selectedPageId = useSelector(getSelectedPageId)

    const dispatch = useDispatch();

    function addOpenPage (data) {
        console.log('add')
        setOpenIds( openIds => [...openIds, data.id])
    }

    function removeOpenPage(data) {
        console.log('remove')
        setOpenIds(openIds.filter(item => item !== data.id))
    }

    function togglePage(data) {
        dispatch(setSelectedPageId(data.id))
        if(openIds.includes(data.id)) {
            if(data.id === selectedPageId) {
                removeOpenPage(data)
            }
        } else {
            addOpenPage(data)
        }
    }

    function anchorsLevel() {
        if(selectedPageId) {
            return menuConfig.entities.pages[selectedPageId].level
        }
        return 0
    }

    useEffect(() => {
        console.log('openIds:', openIds)
        const renderByKeyPath = (openTreeElements, elementsToRender, level = 0) => {
            let output = [];
            elementsToRender.forEach(element => {
                output.push({level, type: 'page', id: element.id});
                if (selectedPageId === element.id && element.anchors) {
                    element.anchors.forEach(anchor => {
                        output.push({level, type: 'anchor', id:anchor});
                    })
                }
                if (openTreeElements.includes(element.id) && element.pages) {
                    output = output.concat(
                        renderByKeyPath(
                            openTreeElements,
                            element.pages.map(id => menuConfig.entities.pages[id]),
                            level + 1
                        )
                    )
                }
            })
            return output;
        }

        if(openIds.length) {
            setAllPagesIds(renderByKeyPath(
                openIds,
                menuConfig.topLevelIds.map(id => menuConfig.entities.pages[id])
            ))
        }
        else {
            setAllPagesIds([...menuConfig.topLevelIds.map(item => {
                return {type: 'page', id: item}
            })])
        }
    }, [ openIds, selectedPageId ])

    return (
    <Wrapper>
      { allPagesIds.length && allPagesIds.map((page) => (
          (page.type === 'page') ?
          <LinkPage key={page.id}
            data={menuConfig.entities.pages[page.id]}
            isActive={openIds.includes(page.id)}
            isSelectedPage={selectedPageId === page.id}
            togglePage={togglePage}/> :
          <LinkAnchor key={page.id}
            data={menuConfig.entities.anchors[page.id]}
            level={anchorsLevel()}/>
      ))
      }
    </Wrapper>)
}