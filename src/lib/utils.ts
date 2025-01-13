export const texturePaths = [
	'/textures/1.png',
	'/textures/2.png',
	'/textures/3.png',
	'/textures/4.png',
	'/textures/5.png',
	'/textures/6.png'
]

export const getRandomArrayValue = <T>(array: T[]): T => {
	const randomIndex = Math.floor(Math.random() * array.length)

	return array[randomIndex] as T
}
