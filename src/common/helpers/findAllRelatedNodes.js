import { menuConfig } from "../../menu-config";

export const findAllRelatedNodes = (page) => {
	let arrayParentIds = [];
	let parentId = page?.parentId;
	while (parentId) {
		const parent = menuConfig.entities.pages[parentId];
		arrayParentIds.push(parent.id);
		parentId = parent?.parentId;
	}
	return arrayParentIds.reverse()
}