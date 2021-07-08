import styled from 'styled-components';
import React, {useEffect} from "react";
import {useParams, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import {Content} from "../modules/content/ui/Content.jsx";
import {TableOfContents} from "../modules/toc/ui/containers/TableOfContents.jsx";
import {TocPreloader} from "../modules/toc/ui/preloader/TocPreloader.jsx";
import {Header} from "../modules/header/ui/Header.jsx";

import {getIsLoading, getWasInit, getOpenIds, getAllPagesIds} from "../modules/toc/domain/store/selectors";
import {
  setOpenIds,
  setSelectedPageId,
  setSelectedAnchorId,
  setWasInit,
  setAllPagesIds,
  setTreeOpenIds
} from "../modules/toc/domain/store/actions";
import {getSelectedPageId} from "../modules/toc/domain/store/selectors";

import {menuConfig} from "../menu-config";

const Wrapper = styled.div``

const FlexWrapper = styled.div`
  display: flex;
  height: calc(100vh - 70px);
`

const ContentLoading = styled.div`
	 padding: 100px 64px 20px;
	 font-size: 40px;
	 font-weight: 700;
`

export const Main = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const selectedPageId = useSelector(getSelectedPageId);
  const openIds = useSelector(getOpenIds);
  const wasInit = useSelector(getWasInit)
  const allPagesIds = useSelector(getAllPagesIds)

  const {urlPage} = useParams();
  let history = useHistory();

  function showBlocks() {
    return allPagesIds.length && wasInit
  }

  useEffect(() => {

    function getSelectedPage() {
      if (urlPage === undefined) {
        history.replace(menuConfig.entities.pages[menuConfig.topLevelIds[0]].url)
      }
      let selectedPage = Object.values(menuConfig.entities.pages).find(page => page.url === urlPage);

      if (!selectedPage) { //redirect to first page
        history.replace(menuConfig.entities.pages[menuConfig.topLevelIds[0]].url)
        selectedPage = Object.values(menuConfig.entities.pages).find(page => page.id === menuConfig.topLevelIds[0])
      }
      return selectedPage
    }

    function getTreeOpenIdsAndOpenIds(selectedPage) {
      let arrayParentIds = [selectedPage.id];
      let parentId = selectedPage?.parentId;
      let tree = {}
      tree[selectedPage.id] = {}

      while (parentId) {
        const parent = menuConfig.entities.pages[parentId];
        arrayParentIds.push(parent.id);
        tree = {
          [parentId]: tree
        };
        parentId = parent?.parentId;
      }
      return {openIds: arrayParentIds, tree}
    }

    function getSelectedAnchor() {
      const hash = window.location.hash;
      if (hash) {
        return Object.values(menuConfig.entities.anchors).find(anchor => anchor.anchor === hash);
      }
      return null;
    }

    if (!isLoading) {
      const selectedPage = getSelectedPage()
      const {openIds, tree} = getTreeOpenIdsAndOpenIds(selectedPage);
      const selectedAnchor = getSelectedAnchor();
      dispatch(setSelectedPageId(selectedPage.id));
      dispatch(setOpenIds(openIds));
      dispatch(setTreeOpenIds(tree));
      if (selectedAnchor) {
        dispatch(setSelectedAnchorId(selectedAnchor.id));
      }
      dispatch(setWasInit(true))
    }
  }, [isLoading])

  useEffect(() => {
    function generateListAnchors(element, level) {
      let list = [];
      if (selectedPageId === element.id && element.anchors) {
        element.anchors.forEach(anchor => {
          list.push({level, type: 'anchor', id: anchor});
        })
      }
      return list;
    }

    const generateListOfDisplayedItems = (elementsToRender, level = 0) => {
      let output = [];
      elementsToRender.forEach(element => {
        output.push({level, type: 'page', id: element.id});
        output = output.concat(generateListAnchors(element, level));

        if (openIds.includes(element.id) && element.pages) {
          output = output.concat(
              generateListOfDisplayedItems(
                  element.pages.map(id => menuConfig.entities.pages[id]),
                  level + 1
              )
          )
        }
      })
      return output;
    }

    if (wasInit) {
      if (openIds.length) {
        dispatch(setAllPagesIds(generateListOfDisplayedItems(
            menuConfig.topLevelIds.map(id => menuConfig.entities.pages[id])
        )))
      } else {
        dispatch(setAllPagesIds([...menuConfig.topLevelIds.map(item => {
          return {type: 'page', id: item, level: 0}
        })]))

      }
    }

  }, [openIds, selectedPageId, wasInit])

  return (
    <Wrapper>
      <Header/>
        <FlexWrapper>
          {showBlocks() ? <TableOfContents/> : <TocPreloader/>}
          {showBlocks() ? <Content/> : <ContentLoading>Loading</ContentLoading>}
        </FlexWrapper>
    </Wrapper>
  );
}
