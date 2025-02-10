<script lang="ts">
	import { T } from '@threlte/core'
	import Block from '$lib/components/Block.svelte'
	import Preview from '$lib/components/Preview.svelte'
	import { useTexture } from '@threlte/extras'
	import { texturePaths, getRandomArrayValue, overlapsBlockPosition } from '$lib/utils'
	import type { xyzCoordinates, xyCoordinates } from '$lib/types'
	import { PerspectiveCamera, Raycaster, Vector2, Vector3, type Mesh } from 'three'

	const textures = useTexture(texturePaths)
	let previewPosition = $state<xyzCoordinates>([0, 0.5, 0])
	let blockPositions = $state<xyzCoordinates[]>([])
	let pointer = $state<xyCoordinates>([0, 0])
	let camera = $state<PerspectiveCamera>()
	let raycaster = $state<Raycaster>()
	let collidableObjects = $state<Mesh[]>([])

	const updatePointer = (event: PointerEvent) => {
		pointer = [
			(event.clientX / window.innerWidth) * 2 - 1,
			-(event.clientY / window.innerHeight) * 2 + 1
		]
	}

	const getIntersect = (event: PointerEvent) => {
		if (!camera || !raycaster) return undefined

		updatePointer(event)
		raycaster.setFromCamera(new Vector2(...pointer), camera)
		const [intersect] = raycaster.intersectObjects(collidableObjects, false)

		return intersect
	}

	const calculateNewPosition = (event: PointerEvent) => {
		const intersect = getIntersect(event)
		if (!intersect) return undefined

		const newPosition = new Vector3()
			.copy(intersect.point)
			.divideScalar(1)
			.round()
			.multiplyScalar(1)
			.addScalar(0.5)
			.min(new Vector3(5.5, 5.5, 5.5))

		return newPosition
	}

	const onpointermove = (event: PointerEvent) => {
		const newPreviewPosition = calculateNewPosition(event)
		if (!newPreviewPosition) return

		if (overlapsBlockPosition(newPreviewPosition, blockPositions)) return

		previewPosition = newPreviewPosition.toArray()
	}

	const ondblclick = () => {
		if (overlapsBlockPosition(new Vector3(...previewPosition), blockPositions)) return

		blockPositions.push(previewPosition)
	}
</script>

<svelte:window {onpointermove} {ondblclick} />

<T.PerspectiveCamera
	bind:ref={camera}
	makeDefault
	fov={45}
	position={[8, 12, 16]}
	oncreate={(ref) => {
		ref.lookAt(0, 0, 0)
	}}
/>
<T.Raycaster bind:ref={raycaster} />

<!-- Grid -->
<T.GridHelper args={[12, 12]} />
<T.Mesh
	rotation.x={-Math.PI / 2}
	oncreate={(ref) => {
		collidableObjects.push(ref)
	}}
>
	<T.PlaneGeometry args={[12, 12]} />
	<T.MeshBasicMaterial visible={false} />
</T.Mesh>

<Preview position={previewPosition} />

<!-- Blocks -->
{#await textures then matcaps}
	{#each blockPositions as position}
		<Block
			{position}
			matcap={getRandomArrayValue(matcaps)}
			oncreate={(ref: Mesh) => {
				collidableObjects.push(ref)
			}}
		/>
	{/each}
{/await}
