import {
	SET_SELECTED_PAGE_ID,
	SET_IS_LOADING,
	SET_OPEN_IDS,
	SET_SELECTED_ANCHOR_ID,
	SET_WAS_INIT,
	SET_ALL_PAGES_IDS
} from "./types";
import {menuConfig} from "../../../../menu-config";

const initialState = {
	wasInit: false,
	selectedPageId: null,
	selectedAnchorId: null,
	isLoading: true,
	allPagesIds: [],
	openIds: []
};

function generateListAnchors(state, element, level) {
	let list = [];
	if (state.selectedPageId === element.id && element.anchors) {
		element.anchors.forEach(anchor => {
			list.push({level, type: 'anchor', id:anchor});
		})
	}
	return list;
}

const generateListOfDisplayedItems = (state, openTreeElements, elementsToRender, level = 0) => {
	let output = [];
	elementsToRender.forEach(element => {
		output.push({level, type: 'page', id: element.id});
		output = output.concat(generateListAnchors(state, element, level));

		if (openTreeElements.includes(element.id) && element.pages) {
			output = output.concat(
					generateListOfDisplayedItems(
							state,
							openTreeElements,
							element.pages.map(id => menuConfig.entities.pages[id]),
							level + 1
					)
			)
		}
	})
	return output;
}

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
		case SET_SELECTED_ANCHOR_ID:
			return {
				...state,
				selectedAnchorId: action.selectedAnchorId
			}

		default:
			return state;
	}
}