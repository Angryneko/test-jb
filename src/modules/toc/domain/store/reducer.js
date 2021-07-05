import { SET_SELECTED_PAGE_ID } from "./types";

const initialState = {
	selectedPageId: null,
	allPagesIds: [],
	openIds: []
};

export function tocData(
		state = initialState,
		action
) {
	switch (action.type) {
		case SET_SELECTED_PAGE_ID:
			return {
				selectedPageId: action.selectedPageId
			}
		default:
			return state;
	}
}