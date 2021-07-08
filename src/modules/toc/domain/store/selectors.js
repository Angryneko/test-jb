export const getWasInit = (state) => {
		return state.tocData.wasInit
}

export const getAllPagesIds = (state) => {
	return state.tocData.allPagesIds
}

export const getSelectedPageId = (state) => {
	return state.tocData.selectedPageId;
};

export const getSelectedAnchorId = (state) => {
	return state.tocData.selectedAnchorId;
}

export const getIsLoading = (state) => {
	return state.tocData.isLoading;
}

export const getOpenIds = (state) => {
	return state.tocData.openIds;
}

export const getTreeOpenIds = (state) => {
	return state.tocData.treeOpenIds
}