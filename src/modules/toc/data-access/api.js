import { dataset } from '../../../dataset'

export function getConfig() {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(dataset)
		}, 3000)
	})
}
