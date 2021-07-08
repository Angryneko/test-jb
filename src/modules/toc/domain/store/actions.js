import {
	SET_WAS_INIT,
	SET_SELECTED_PAGE_ID,
	SET_IS_LOADING,
	SET_OPEN_IDS,
	SET_SELECTED_ANCHOR_ID,
	SET_ALL_PAGES_IDS, SET_TREE_OPEN_IDS
} from "./types";

export const setWasInit = (wasInit) => ({
	type: SET_WAS_INIT,
	wasInit
})

export const setAllPagesIds = (allPagesIds) => ({
	type: SET_ALL_PAGES_IDS,
	allPagesIds
})

export const setSelectedPageId = (selectedPageId) => ({
	type: SET_SELECTED_PAGE_ID,
	selectedPageId
});

export const setSelectedAnchorId = (selectedAnchorId) => ({
	type: SET_SELECTED_ANCHOR_ID,
	selectedAnchorId
})

export const setIsLoading = (isLoading) => ({
	type: SET_IS_LOADING,
	isLoading
})

export const setOpenIds = (openIds) => ({
	type: SET_OPEN_IDS,
	openIds
})

export const setTreeOpenIds = (treeOpenIds) => ({
	type: SET_TREE_OPEN_IDS,
	treeOpenIds
})