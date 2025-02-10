import { Vector3 } from 'three'
import type { xyzCoordinates } from '$lib/types'

export const texturePaths = [
	'/textures/1.png',
	'/textures/2.png',
	'/textures/3.png',
	'/textures/4.png',
	'/textures/5.png',
	'/textures/6.png',
	'/textures/7.png',
	'/textures/8.png'
]

export const getRandomArrayValue = <T>(array: T[]): T => {
	const randomIndex = Math.floor(Math.random() * array.length)

	return array[randomIndex] as T
}

export const overlapsBlockPosition = (position: Vector3, blockPositions: xyzCoordinates[]) => {
	return blockPositions.some((blockPosition) => {
		return new Vector3(...blockPosition).equals(position)
	})
}
