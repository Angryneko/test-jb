export const scrollToElement = function ({name , id, smooth = true}) {
	const element = document.querySelector(`[data-${name}="${id}"]`);
	if (element) {
		element.scrollIntoView({
			behavior: smooth? 'smooth': 'auto'
		});
	}
	else {
		document.getElementById('content').scrollTop = 0
	}
}