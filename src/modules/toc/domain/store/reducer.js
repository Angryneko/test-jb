import {
	SET_SELECTED_PAGE_ID,
	SET_IS_LOADING,
	SET_OPEN_IDS,
	SET_SELECTED_ANCHOR_ID,
	SET_WAS_INIT,
	SET_ALL_PAGES_IDS,
	SET_TREE_OPEN_IDS
} from "./types";

const initialState = {
	wasInit: false,
	selectedPageId: null,
	selectedAnchorId: null,
	isLoading: true,
	allPagesIds: [],
	openIds: [],
	treeOpenIds: {}
};

export function tocData(
		state = initialState,
		action
) {
	switch (action.type) {
		case SET_WAS_INIT:
			return {
				...state,
				wasInit: action.wasInit
			}
		case SET_ALL_PAGES_IDS:
			return {
				...state,
				allPagesIds: action.allPagesIds
			}
		case SET_SELECTED_PAGE_ID:
			return {
				...state,
				selectedPageId: action.selectedPageId
			}
		case SET_IS_LOADING:
			return {
				...state,
				isLoading: action.isLoading
			}
		case SET_OPEN_IDS:
			return {
				...state,
				openIds: action.openIds
			}
		case SET_TREE_OPEN_IDS:
			return {
				...state,
				treeOpenIds: action.treeOpenIds
			}
		case SET_SELECTED_ANCHOR_ID:
			return {
				...state,
				selectedAnchorId: action.selectedAnchorId
			}

		default:
			return state;
	}
}