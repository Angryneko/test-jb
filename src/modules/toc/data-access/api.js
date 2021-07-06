export async function getConfig() {
	const response = await fetch('http://0.0.0.0:8080/dataset.json')
	if (response.ok) {
		return await response.json();
	}
	console.error('Error:' + response.status)
}
